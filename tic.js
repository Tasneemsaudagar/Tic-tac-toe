const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const toggleModeBtn = document.getElementById('toggleModeBtn');

initializeBoard();

function initializeBoard(){
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

}

let currentPlayer = 'X';
let isGameActive = true;
let isSinglePlayerMode = false ;

board.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', resetGame);
toggleModeBtn.addEventListener('click',toggleMode);

function handleCellClick(event) {
    const cell = document.querySelector(`.cell[data-index="${event}"]`);
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (cell.textContent || !isGameActive) return;

    cell.textContent = currentPlayer;
    checkResult();

    if (isSinglePlayerMode && isGameActive && currentPlayer === 'X') {
        
        setTimeout(aiMove, 500); // AI move with a delay
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X' ;
    }
}

function checkResult() {
    const cells = document.querySelectorAll('.cell');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        const cellA = cells[a].textContent;
        const cellB = cells[b].textContent;
        const cellC = cells[c].textContent;

        if (cellA && cellA === cellB && cellA === cellC) {
            isGameActive = false;
            highlightWinnerCells(cells[a], cells[b], cells[c]);
            message.textContent = `${cellA} wins!`;
            return;
        }
    }

    const isTie = Array.from(cells).every(cell => cell.textContent);
    if (isTie) {
        isGameActive = false;
        message.textContent = "It's a tie!";
        return;
    }
}

function highlightWinnerCells(cellA, cellB, cellC) {
    cellA.style.backgroundColor = 'yellow';
    cellB.style.backgroundColor = 'yellow';
    cellC.style.backgroundColor = 'yellow';
}



function aiMove() {
    if (!isGameActive) return;
    const cells = document.querySelectorAll('.cell');
    const emptyCells = [...cells].filter(cell => !cell.textContent);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].textContent = 'O';
    checkResult();
    currentPlayer = 'X';
}

function resetGame() {
    const cells = document.querySelectorAll('.cell');
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = ''; 
        cell.style.backgroundColor = '' ;
});

}


function toggleMode() {
    isSinglePlayerMode = !isSinglePlayerMode;
    if (isSinglePlayerMode) {
        toggleModeBtn.textContent = 'Two Players';
    } else {
        toggleModeBtn.textContent = 'Single Player';
    }
    resetGame();
}
