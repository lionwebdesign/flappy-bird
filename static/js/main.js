var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Cargar imagenes

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "media/images/bird.png";
bg.src = "media/images/bg.png";
fg.src = "media/images/fg.png";
pipeNorth.src = "media/images/pipeNorth.png";
pipeSouth.src = "media/images/pipeSouth.png";

// Archivos de audio

var fly = new Audio();
var scor = new Audio();
var crash = new Audio();

fly.src = "media/sounds/fly.mp3";
scor.src = "media/sounds/score.mp3";
crash.src = "media/sounds/Cartoon-Boing.mp3"


//Variables generales

var gap = 85;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.1;
var score = 0;
var intervalo_tubos = 125;
var poder_de_vuelo = 25;

function game_over() {
    crash.play();
    alert("¡Game Over!");
    var jugar_de_nuevo = confirm("¿Quieres judar de nuevo?");
    if (jugar_de_nuevo == true) {
        location.reload();
    } else {
        window.location.href = "https://google.com"
    } 
}

// funcion de vuelo

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= poder_de_vuelo;
    fly.play();
}

// Cordenadas de las tuberias

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

//Renderizar imagenes

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if (pipe[i].x == intervalo_tubos) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detección de colisión
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){

            return game_over();
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























