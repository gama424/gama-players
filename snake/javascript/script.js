

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); //contexto 2d


class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

}


let speed = 7;

//definindo tamanho da snake
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
//definindo tamanho da snake

const snakeParts = [];
let tailLength = 2;

//maça
let appleX = 5;
let appleY = 5;
//maça


let xVelocity=0;
let yVelocity=0;


let score = 0;


//musicas do jogo
const gulpSound = new Audio('/snake/assets/music/gulp.mp3')
const gameOverSound = new Audio('/snake/assets/music/GameOver.mp3')



//configurando e criando funçoes para o jogo funcionar
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();
  

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2 ){
        speed = 11;
    }
    if(score > 5){
        speed = 15
    }



    setTimeout(drawGame, 1000/ speed) //tempo do jogo que se ajusta e o torna mais rapido

}

//funçao para o game over caso a snake esbarre nas paredes
function isGameOver(){
    let gameOver = false;
   

    if(yVelocity === 0 && xVelocity === 0)
    return false;


    //paredes
    if(headX < 0 ){
        gameOver = true;
    }

    else if(headX === tileCount){
        gameOver = true;
    }

    else if(headY < 0){
        gameOver = true;
    }

    else if(headY === tileCount){
        gameOver = true;
    }


    for(let i = 0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    if(part.x == headX && part.y === headY){
        gameOver = true;
        break;
        }
        
    }

//estilizando o texto GAME OVER
    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';


            if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');

        ctx.fillStyle = gradient;

        ctx.fillText('game over', canvas.width / 4.7, canvas.height / 2)
        gameOverSound.play(); //som do game over
    
	

 }
   
    }


    return gameOver;
}



//estilizando o score
function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '16px Verdana';
    ctx.fillText('score ' + score, canvas.width-75, 14);
}



function clearScreen(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//estilizando a snake

function drawSnake(){
   
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }


    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'blue'
    ctx.fillRect(headX * tileCount, headY* tileCount, tileSize, tileSize)

}

    
//checando a colisao com a maça
function checkAppleCollision(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++; //aumenta o tamanho da skane
        score++; //aumenta o score
        gulpSound.play(); //som da maça


    }
}





//evento para guiar a snake
document.body.addEventListener('keydown', keyDown);

function keyDown(event){


         //cima
        if(event.keyCode == 38){
            if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
        } 

        //baixo
        if(event.keyCode == 40){
            if(yVelocity == -1)
            return;
            yVelocity = 1;
            xVelocity = 0;
        } 

        //esquerda
        if(event.keyCode == 37){
            if(xVelocity == 1)
            return;
            yVelocity = 0;
            xVelocity = -1;
        } 
       
         //direita
         if(event.keyCode == 39){
            if(xVelocity == -1)
            return;
            yVelocity = 0;
            xVelocity = 1;
        } 
}







//mudando a posiçao da maça
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;


}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX* tileCount, appleY * tileCount, tileSize, tileSize)

}




drawGame();


//reinicar o jogo
document.addEventListener("keydown", event => {
    const { key } = event
    if (key.toLowerCase() === "shift") {
      location.reload()
    }
  })


