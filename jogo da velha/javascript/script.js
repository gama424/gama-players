const xClass = 'x';
const oClass = 'o';
let xTurn;


const cells = document.querySelectorAll('.cell');
const board = document.querySelector('#board');

const gameEndMessage = document.querySelector('[data-game-end-message]');

const gameEndElement = document.querySelector('#gameEndElement');

const restartButton = document.querySelector('#restartButton');

//variaveis definidas


//variavel para definir posiçoes do jogo para vencer

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
                //horizontal
                //diagonal
                //vertical

                
                startGame();

//funçoes
function startGame(){
    xTurn = true; //começa com o X
    board.classList.add('x');

    cells.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        board.classList.replace('o', 'x');

        cell.addEventListener('click', handleClick, {once: true});

    })

    restartButton.addEventListener('click', startGame);

    gameEndElement.classList.remove('show');


    document.querySelector('main').classList.remove('end');

}


function handleClick(e){
    let cell = e.target;
    let turnClass = xTurn ? xClass : oClass  //if else diferenciado ?  :  //para marcar o X ou O

    placeMark(cell, turnClass);

    if(checkWin(turnClass)){
        endGame(false);
    } else if(checkDraw()){
        endGame(true);
    }
    
    swapTurn();
    setBoardHover();//mudar o hover conforme X ou O
   

}

function placeMark(cell, turnClass){
    cell.classList.add(turnClass);
    //marca o local 
}

function swapTurn(){
    xTurn = !xTurn;
    //funçao para trocar de X para O

}

function setBoardHover(){
    xTurn ? board.classList.replace('o' , 'x') : board.classList.replace('x' , 'o');
    //if else para alterar o hover
}





//definir vencedor
function checkWin(turnClass){
    return lines.some(line => { //verificar todas as linhas de cada vez 
        return line.every(index => { //verificar as posiçoes da linha
            return cells[index].classList.contains(turnClass);
        })
    })
}

//empate
function checkDraw(){
    return [...cells].every(cell =>{
        return cell.classList.contains(xClass || cell.classList.contains(oClass));
    })
}


//fim de jogo
function endGame(draw){
    if(draw){
        gameEndMessage.innerText = 'Empate';
    } else {
        gameEndMessage.innerText = `${xTurn ? "Jogador Xiz" : "Jogador Zero"} venceu!`
    }

    gameEndElement.classList.add('show')
    document.querySelector('main').classList.add('end')
}