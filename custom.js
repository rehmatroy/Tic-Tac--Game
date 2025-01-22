document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const celebrationContainer = document.getElementById("celebration-container");
    const winSound = document.getElementById("winSound");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Winning combinations
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Create board dynamically
    function createBoard() {
        board.innerHTML = "";
        gameBoard.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = index;
            cell.innerText = value;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        });
    }

    // Handle player move
    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === "" && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.innerText = currentPlayer;
            checkWinner();
            if (gameActive) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.innerText = `Player ${currentPlayer}'s Turn`;
            }
        }
    }

    // Check for winner or draw
    function checkWinner() {
        let winner = null;
        
        winPatterns.forEach(pattern => {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                winner = gameBoard[a];
            }
        });

        if (winner) {
            statusText.innerText = `🎉 Player ${winner} Wins! 🎉`;
            gameActive = false;
            celebrateWin();
        } else if (!gameBoard.includes("")) {
            statusText.innerText = "It's a Draw! 🤝";
            gameActive = false;
        }
    }

    // 🎉 Function to celebrate the win
    function celebrateWin() {
        winSound.play(); // Play celebration sound
        for (let i = 0; i < 50; i++) {
            const celebration = document.createElement("div");
            celebration.classList.add("celebration");
            celebration.innerText = getRandomEmoji();
            celebration.style.left = `${Math.random() * 100}vw`;
            celebration.style.animationDuration = `${Math.random() * 3 + 2}s`;
            celebrationContainer.appendChild(celebration);

            setTimeout(() => {
                celebration.remove();
            }, 3000);
        }
    }

    // Get random emoji for celebration
    function getRandomEmoji() {
        const emojis = ["🎉", "✨", "💥", "🎊", "🌸", "🌺"];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    // Restart game
    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusText.innerText = "Player X's Turn";
        createBoard();
        celebrationContainer.innerHTML = ""; // Remove celebrations
    }

    // Initialize the game
    createBoard();
    resetButton.addEventListener("click", resetGame);
});
