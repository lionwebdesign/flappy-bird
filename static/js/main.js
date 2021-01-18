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


//

var gap = 85;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.1;
var score = 0;

function game_over() {
    alert("¡Game Over!");
    var jugar_de_nuevo = confirm("¿Quieres judar de nuevo?");
    if (jugar_de_nuevo == true) {
        location.reload();
    } else {
        window.location.href = "https://google.com"
    } 
}

function posicion_tubos(min, max) {
    return Math.random() * (max - min) + min;
}
  
var tubos = posicion_tubos(125, 350);

// Archivos de audio

var fly = new Audio();
var scor = new Audio();

fly.src = "media/sounds/fly.mp3";
scor.src = "media/sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
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
        
        if (pipe[i].x == tubos) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
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
























