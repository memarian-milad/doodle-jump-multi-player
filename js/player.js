class Player {
	// The player setting section
	startPlayerPos_x = 200;
	startPlayerPos_y = -300;
	constructor(canvas, id) {
		this.canvas = canvas;
		this.id = (!id) ? this.generateId() : id;
		this.color = this.getRandomColor();
		this.characterImage = this.getRandomCharacterImage();
		this.x = this.startPlayerPos_x;
		this.y = this.startPlayerPos_y;
		this.vy = 0;
	}
	generateId() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}

	getRandomCharacterImage() {
		const characterCode = Math.floor(Math.random() * (5 - 1) + 1);
		if(character)
		{
			return "img/characters/character-" + character + ".png";
		}
		return "img/characters/character-" + characterCode + ".png";
	}

	moveLeft() {
		// Move left logic...
		this.x = Math.max(this.x - 3, 0);
	}

	moveRight(canvasWidth) {
		// Move right logic...
		this.x = Math.min(this.x + 3, canvasWidth - 3);
	}

	jump() {
		// Jump logic...
		// Adjust vy to give the player a jump effect
		this.vy = -5; // Example value, adjust as needed
	}


	updatePosition() {
		// Update position based on velocity...
		this.y += this.vy;
	}
}
