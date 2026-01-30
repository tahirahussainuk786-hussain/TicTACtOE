
/* ===== GAME LOGIC ===== */
const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener("click", () => handleClick(index));
    board.appendChild(div);
  });
}

function handleClick(index) {
  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.textContent = "😮 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      condition.forEach(i => board.children[i].classList.add("win"));
      return true;
    }
  }
  return false;
}

function resetGame() {
  cells.fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  createBoard();
}

createBoard();

/* ===== FALLING LEAVES GENERATOR ===== */
const leaves = ["🍁","🍂","🍃"];

function createLeaf() {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");
  leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
  leaf.style.left = Math.random() * 100 + "vw";
  leaf.style.animationDuration = Math.random() * 3 + 5 + "s";
  leaf.style.fontSize = Math.random() * 15 + 20 + "px";
  document.body.appendChild(leaf);

  setTimeout(() => leaf.remove(), 8000);
}

setInterval(createLeaf, 400);
