const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
let currentPlayer = "O";
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("disabled", "X", "O");
        box.style.pointerEvents = "auto";
    });
    message.innerText = "";
    currentPlayer = "O";
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            return boxes[a].innerText;
        }
    }
    return null;
};

const makeMove = (index, player) => {
    boxes[index].innerText = player;
    boxes[index].classList.add(player);
    boxes[index].style.pointerEvents = "none";
};

const computerMove = () => {
    // Simple strategy: choose the first empty box
    const emptyBoxes = Array.from(boxes).filter(box => !box.innerText);
    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    const boxIndex = Array.from(boxes).indexOf(emptyBoxes[randomIndex]);
    makeMove(boxIndex, "X");
};

const handleMove = (box, index) => {
    if (!box.innerText) {
        makeMove(index, currentPlayer);
        const winner = checkWinner();
        if (winner) {
            message.innerText = `Congratulations! ${winner} wins!`;
            boxes.forEach(box => box.style.pointerEvents = "none");
        } else if (Array.from(boxes).every(box => box.innerText)) {
            message.innerText = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === "O" ? "X" : "O";
            if (currentPlayer === "X") {
                setTimeout(() => {
                    computerMove();
                    const winner = checkWinner();
                    if (winner) {
                        message.innerText = `Congratulations! ${winner} wins!`;
                        boxes.forEach(box => box.style.pointerEvents = "none");
                    } else if (Array.from(boxes).every(box => box.innerText)) {
                        message.innerText = "It's a draw!";
                    }
                    currentPlayer = "O";
                }, 500); // Delay to make it more natural
            }
        }
    }
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleMove(box, index));
});

resetBtn.addEventListener("click", resetGame);



