class Obstacle {
	obstacles;
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.countObstacles = 15;
		this.obstacles = [];
		this.scrollOffset = 0;
		this.obstacleFallSpeed = 2;
		this.obstacleMaxFallSpeed = 4;
	}
}
