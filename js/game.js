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
	sendGameState() {
		if (this.wsManager.readyState === WebSocket.OPEN) {
			this.wsManager.sendGameState({ players: this.players, obstacles: this.obstacle.obstacles, scores: this.scores });
			return true;
		}
		return false;
	}
}
