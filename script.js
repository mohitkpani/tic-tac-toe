let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn-text");
let turnO = true;
let moveCount = 0;
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];
const resetGame = () => {
    turnO = true;
    moveCount = 0;
    enableBoxes();
   messageContainer.classList.add("hide");
    turnText.innerText = "Player O's Turn";

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
            turnText.innerText = "Player X's Turn";
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
            turnText.innerText = "Player O's Turn";

        }

        box.disabled = true;
        moveCount++;

        let winnerFound = checkWinner();
        if (winnerFound === false && moveCount === 9) {
            showDraw();

        }

    });

});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }

};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o");
        box.classList.remove("x");
        box.classList.remove("winner");

    }

};

const showWinner = (winner, pattern) => {
    msg.innerText = `🎉 Player ${winner} Wins!`;
    messageContainer.classList.remove("hide");
    turnText.innerText = `Player ${winner} Wins!`;
    disableBoxes();
    pattern.forEach((index) => {
        boxes[index].classList.add("winner");

    });

};


const showDraw = () => {
    msg.innerText = "🤝 It's a Draw!";
    messageContainer.classList.remove("hide");
    turnText.innerText = "Game Draw!";
    disableBoxes();

};


const checkWinner = () => {

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (
            pos1Val !== "" &&
            pos2Val !== "" &&
            pos3Val !== ""
        ) {
            if (
                pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner:", pos1Val);
                showWinner(pos1Val, pattern);
                return true;
            }
        }
    }

    return false;

};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
