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

	checkCollision(player) {
		return this.obstacles.some(obstacle => {
			const playerIsAboveObstacle = player.y >= obstacle.y - 31 && player.y <= obstacle.y - 26;
			const playerIsAlignedWithObstacle = player.x <= obstacle.x + obstacle.width && player.x + 30 >= obstacle.x;
			return playerIsAboveObstacle && playerIsAlignedWithObstacle;
		});
	}

	drawObstacles() {
		// this.ctx.fillStyle = 'red';
		var img1=new Image();
		img1.src="img/obstacle.png";
		const pattern = this.ctx.createPattern(img1, 'repeat');
		this.obstacles.forEach(obstacle => {
			// this.ctx.fillStyle = pattern;
			this.ctx.drawImage(img1, obstacle.x, obstacle.y - this.scrollOffset, obstacle.width, obstacle.height);
			// this.ctx.fillRect(obstacle.x, obstacle.y - this.scrollOffset, obstacle.width, obstacle.height);
		});
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


	updateObstacles() {
		this.obstacles.forEach(obstacle => {
			obstacle.y += this.obstacleFallSpeed;
			if (this.obstacleMaxFallSpeed > this.obstacleFallSpeed) {
				this.obstacleFallSpeed += 0.1;
			}
			if (obstacle.y - 10 > this.canvas.height) {
				obstacle.y = -obstacle.height;
				obstacle.x = (Math.random() * 400 - 50);
				obstacle.x = Math.max(0, Math.min(obstacle.x, this.canvas.width - 60));
			}
		});
	}
}
