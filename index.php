<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Doodle jump</title>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div id="main">
	<div class="overlay" id="form">
		<div class="form-container">
			<div class="form-box">
				<h2 class="form-title">FORM</h2>
				<div class="form-grid">
					<label class="form-label" for="name">NAME</label>
					<input class="form-input" type="text" id="name">
				</div>
				<div class="character-grid">
					<img src="img/characters/character-1.png" class="character-img" data-code="1" style="grid-column:1" alt="">
					<img src="img/characters/character-2.png" class="character-img" data-code="2" style="grid-column:2" alt="">
					<img src="img/characters/character-3.png" class="character-img" data-code="3" style="grid-column:3" alt="">
					<img src="img/characters/character-4.png" class="character-img" data-code="4" style="grid-column:4" alt="">
					<img src="img/characters/character-5.png" class="character-img" data-code="5" style="grid-column:5" alt="">
					<input type="hidden" id="character">
				</div>
				<div class="button-container">
					<button id="submit-button" class="submit-button" type="button">SUBMIT</button>
				</div>
			</div>
		</div>
	</div>
	<canvas id="gameCanvas" class="" width="400" height="600"></canvas>
	<canvas id="scoreCanvas" width="200" height="600"></canvas>
</div>
<script src="js/main.js"></script>
<script src="js/game.js"></script>
<script src="js/player.js"></script>
<script src="js/obstacle.js"></script>
<script src="js/websocket.js"></script>
</body>
</html>
