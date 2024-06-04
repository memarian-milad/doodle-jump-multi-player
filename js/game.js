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

	sendGameState() {
		if (this.wsManager.readyState === WebSocket.OPEN) {
			this.wsManager.sendGameState({ players: this.players, obstacles: this.obstacle.obstacles, scores: this.scores });
			return true;
		}
		return false;
	}
}
