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

}
