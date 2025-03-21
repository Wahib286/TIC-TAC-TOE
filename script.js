const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const audio = new Audio("./assets/bhag.mp3");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player- ${currentPlayer}`;

}
initGame(); 
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else {
        currentPlayer ="X"
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer ="";
    winningPosition.forEach((position)=>{
        if (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "" 
            && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) {

            // check the wiinner
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            //play audio
            audio.play();

            //after win stop mouse events 
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            //add green background on winning box
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //win message and new game buttonn 
    if(answer !== ""){
        gameInfo.innerText = `Winner Player- ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //game tie 
    let fillCount = 0;
    for(let i=0; i < 9 ; i++){
        if(gameGrid[i]!== ""){
            fillCount++;
        }
    }

    if(fillCount === 9){
        gameInfo.innerText = `Game Tied !`;
        newGameBtn.classList.add("active");
    }
}
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();

        checkGameOver();
    }
}

newGameBtn.addEventListener("click",()=>{
    initGame();
})

boxes.forEach((box,index) => {
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});
