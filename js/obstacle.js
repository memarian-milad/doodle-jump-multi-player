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
		this.init ();
	}

	init ()
	{
		for (let i = 0; i < this.countObstacles; i++) {
			this.obstacles.push(this.createObstacle(i));
		}
	}
	createObstacle(index) {
		const height = 20;
		const y = 40 * index - height;
		let x;
		if (index === 0) {
			x = Math.random() * (this.canvas.width - 60);
		} else {
			const lastObstacle = this.obstacles[index - 1];
			x = lastObstacle.x + (Math.random() * 140 - 50);
			(Math.random() > 0.5) ? x = x * -1 : false;
			x = Math.max(0, Math.min(x, this.canvas.width - 60));
		}
		return {
			x: x,
			y: y,
			width: 60,
			height: height
		};
	}

	}
}
