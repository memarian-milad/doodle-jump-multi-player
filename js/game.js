class Game{
	constructor(canvas, scoreCanvas, obstacle, wsManager) {
		// The canvas section
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		// The game setting section
		this.scrollOffset = 0;
		this.isGameOver = false;
		this.defaultFallSpeed = 4;
		this.maxFallSpeed = 6;
		this.increaseFallSpeed = 0.02;
		this.fallSpeed = this.defaultFallSpeed;
		// The obstacle section
		this.obstacle = obstacle;
		// The web-socket section
		this.wsManager = wsManager;
		// The player section
		this.players = {};
		this.currentPlayer = new Player(this.canvas, userName);
		this.players[this.currentPlayer.id] = this.currentPlayer;
		this.currentPlayerIsOverObsacle = false;
		// The scores section
		this.scoreCanvas = scoreCanvas;
		this.scoreCtx = scoreCanvas.getContext('2d');
		this.scores = {};
		this.setupEventListeners();
	}

	reset() {
		this.players = {};
		this.currentPlayer = new Player(this.canvas, userName);
		this.players[this.currentPlayer.id] = this.currentPlayer;
		this.obstacle.obstacles = [];
		this.obstacle.init();
		this.scores = {};
		this.scrollOffset = 0;
		this.isGameOver = false;
		this.fallSpeed = this.defaultFallSpeed;
	}

	update() {
		this.updateScores();
		this.obstacle.updateObstacles();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.obstacle.drawObstacles();
		this.drawPlayers();
		this.drawScores();
	}


	drawPlayers() {
		for (let id in this.players) {
			const player = this.players[id];
			if(player.characterImage && player.characterImage != "")
			{
				var characterImage = new Image();
				characterImage.src=player.characterImage;
				this.ctx.drawImage(characterImage, player.x, player.y - this.scrollOffset, 30, 30);
			}
			else
			{
				this.ctx.fillStyle = player.color;
				this.ctx.fillRect(player.x, player.y - this.scrollOffset, 20, 20);
			}
		}
	}

	gameLoop() {
		if (!this.isGameOver) {
			this.update();
			this.draw();
			this.playerAction();
			requestAnimationFrame(() => this.gameLoop());
			this.sendGameState();
		}
	}

	playerAction() {
		if (this.currentPlayer) {
			if (this.currentPlayer.y > this.canvas.height - 20) {
				// Player hit the bottom of the canvas
				this.isGameOver = true;
				this.resetGame();
				return;
			}
			if (this.obstacle.checkCollision(this.currentPlayer)) {
				this.currentPlayerIsOverObsacle = true;
				this.currentPlayer.y += this.obstacle.obstacleFallSpeed;
			}
			else
			{
				this.currentPlayerIsOverObsacle = false;
				this.currentPlayer.applyGravity();
				this.currentPlayer.updatePosition();
				(this.maxFallSpeed > this.fallSpeed) ? this.fallSpeed += this.increaseFallSpeed : false;
			}
		}
	}

	setupEventListeners() {
		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowLeft') {
				this.currentPlayer.moveLeft();
			} else if (event.key === 'ArrowRight') {
				this.currentPlayer.moveRight(this.canvas.width);
			}
			else if (this.currentPlayerIsOverObsacle && event.code == 'Space') {
				this.currentPlayer.jump();
				this.currentPlayer.updatePosition();
			}
		});
	}

	drawScores() {
		this.scoreCtx.clearRect(0, 0, this.scoreCanvas.width, this.scoreCanvas.height);
		this.scoreCtx.fillStyle = 'black';
		this.scoreCtx.font = '16px Arial';
		let yOffset = 20;
		for (let id in this.scores) {
			const playerColor = this.players[id].color;
			this.scoreCtx.shadowColor = 'gray';
			this.scoreCtx.shadowBlur = 10;
			this.scoreCtx.shadowOffsetX = 0;
			this.scoreCtx.shadowOffsetY = 0;
			this.scoreCtx.fillStyle = playerColor;
			const scoreText = `Player ${id.substring(0, 5)}: ${this.scores[id]}`;
			this.scoreCtx.fillText(scoreText, 15, yOffset);
			yOffset += 20;
		}
	}

	updateScores() {
		for (let id in this.players) {
			if (!this.scores[id]) {
				this.scores[id] = 0;
			}
			this.scores[id] += 1;
		}
	}

	sendGameState() {
		if (this.wsManager.readyState === WebSocket.OPEN) {
			this.wsManager.sendGameState({ players: this.players, obstacles: this.obstacle.obstacles, scores: this.scores });
			return true;
		}
		return false;
	}
}
