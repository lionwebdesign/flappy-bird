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

var gap = [85, 90, 95, 100, 105, 110, 115, 120, 125, 135 , 140, 145, 150];
var distancia_entre_obstaculos; //= gap[Math.floor(Math.random() * gap.length)];
var constant;
var bX = 10;
var bY = 150;
var gravity = 1.1;
var score = 0;
var intervalo_tubos = 125;
var poder_de_vuelo_vertical = 25;
var poder_de_vuelo_hotizontal = 10;

function game_over() {
    crash.play();
    alert("¡Game Over!");
    var jugar_de_nuevo = confirm("¿Quieres judar de nuevo?");
    if (jugar_de_nuevo == true) {
        location.reload();
    } else {
        window.location.href = "#"
    } 
}

// Control de parametros del juego, gravedad intervalo de tuberias y constante de separación ente tubos
function core() {
    // 0 a 5
    if (score <= 5) {
        //gap = 85;
        gravity = 1.1;
        intervalo_tubos = 150
    } 
    
    // 6 a 9
    else if (score >= 6 && score < 10) {
        //gap = 90;
        gravity = 1.3;
        intervalo_tubos = 175;
    } 
    
    // 10 a 14
    else if (score >= 10 && score < 15) {
        //gap = 95;
        gravity = 1.5;
        intervalo_tubos = 200;
    } 
    
    else if (score == 15) {
        //gap = 100;
        gravity = 1.7;
        intervalo_tubos = 175;
    } 

    // 16 a 19
    else if (score >= 16 && score < 20) {
        //gap = 100;
        gravity = 1.7;
        intervalo_tubos = 225;
    } 
    
    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 20) {
        //gap = 105;
        gravity = 1.7;
        intervalo_tubos = 200;
    } 
    
    // 21 a 24
    else if (score >= 21 && score < 25) {
        //gap = 105;
        gravity = 1.7;
        intervalo_tubos = 250;
    } 
    
    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 25) {
        //gap = 110;
        gravity = 1.9;
        intervalo_tubos = 225;
    } 
    
    // 26 a 29
    else if (score >= 26 && score < 30) {
        //gap = 110;
        gravity = 1.9;
        intervalo_tubos = 275;
    } 

    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 30){
        //gap = 115;
        gravity = 1.9;
        intervalo_tubos = 250;
    }

    // 31 a 34
    else if (score >= 31 && score < 35) {
        //gap = 115;
        gravity = 1.9;
        intervalo_tubos = 300;
    }

    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 35) {
        gap = 120;
        gravity = 2.1;
        intervalo_tubos = 275;
    }

    // 36 a 39
    else if (score >= 36 && score < 40) {
        //gap = 120;
        gravity = 2.1;
        intervalo_tubos = 325;
    }

    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 40) {
        //gap = 115;
        gravity = 2.1;
        intervalo_tubos = 300;
    }   
    
    // 41 a 44 
    else if (score >= 41 && score < 45) {
        //gap = 110;
        gravity = 2.1;
        intervalo_tubos = 350;
    }

    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 45) {
        //gap = 105;
        gravity = 2.1;
        intervalo_tubos = 325;
    }

    // 46 a 49
    else if (score >= 46 && score < 50) {
        //gap = 100;
        gravity = 2.1;
        intervalo_tubos = 375;
    }

    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 50) {
        //gap = 95;
        gravity = 2.1;
        intervalo_tubos = 350;
    }

    // 51 a 54
    else if (score >= 51 && score < 55) {
        //gap = 90;
        gravity = 2.1;
        intervalo_tubos = 400;
    }

    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 55) {
        //gap = 85;
        gravity = 2.2;
        intervalo_tubos = 375;
    }

    // 56 a 59
    else if (score >= 56 && score < 60) {
        //gap = 90;
        gravity = 2.3;
        intervalo_tubos = 425;
    }

    // Reducción de espacio entre tubos para poder renderizar el siguiente nivel
    else if (score == 60) {
        //gap = 95;
        gravity = 2.5;
        intervalo_tubos = 400;
    }

    // 61 en adelante
    else if (score >= 61) {
        //gap = 100;
        gravity = 2.5;
        intervalo_tubos = 450;
    }
}

// funcion de vuelo pc

window.addEventListener("keydown", vuelo_pc);

function vuelo_pc(event){
    if (event.keyCode == 38) {
        bY -= poder_de_vuelo_vertical;
    } else if (event.keyCode == 40) {
        bY += poder_de_vuelo_vertical;
    } else if (event.keyCode == 37) {
        bX -= poder_de_vuelo_hotizontal;
    } else if (event.keyCode == 39) {
        bX += poder_de_vuelo_hotizontal;
    }
    fly.play();
}

// Funcion de vuelo celular

window.addEventListener("click", vuelo_celular);

function vuelo_celular(){
    bY -= poder_de_vuelo_vertical;
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
        
        distancia_entre_obstaculos = gap[Math.floor(Math.random() * gap.length)];
        constant = pipeNorth.height+distancia_entre_obstaculos;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;

        // incremeto de puntaje
        if(pipe[i].x == bX - bird.width){
            score++;
            scor.play();
        }

        core();   

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
























