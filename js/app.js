http://tonirib.github.io/frontend-nanodegree-arcade-game/

/* Enemies our player must avoid.
*
*
*/

var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.y = y;
    this.x = x;
    this.hitbox = 70;
    this.multiplayer = Math.floor(Math.random() * 5 + 1);
};


// Update the enemy's position and check for collisions.
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // set the position of the enemy based on the dr and the speed of multiplayer
    this.x = this.x + 101 * dt * this.multiplayer;

  // Check for collisions with the player
    if (this.y == player.y && (this.x > player.x - 20 && this.x < player.x + 20)) {
      player.reset();
    }

  // if player goes off the board, reset it.
    if (this.x > 750) {
      this.reset();
    }
};


// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.reset = function() {
  this.x = -200;
  var yVals = [220, 140, 60];
  this.y = yVals[Math.floor(Math.random() * 3)]
  this.multiplayer = Math.floor((Math.random() * 5) + 1);
};


/*
*   Player Class
*/

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.lives = 5;
    this.score = 0;

    // Set the player's location
    this.x = x;
    this.y = y;

    // store the original position of player for resetting later.
    this.xo = x;
    this.yo = y;


};


Player.prototype.handleInput = function(dir) {
    if (dir == 'up') {
      this.y = this.y - 80;
    } else if (dir == 'down') {
      this.y = this.y + 80;
    } else if (dir == 'left') {
      this.x = this.x - 101;
    } else if (dir == 'right') {
      this.x = this.x + 101;
    };

    //Staying on the Canvas. Check the position of the player.
    if (this.x < 0) {
    //If player is navigating off the board L, don't move player.
      this.x = 0;
    } else if (this.x > 404) {
    //If player is navigating off the board R, don't move player.
      this.x = 404;
    } else if (this.y > 380) {
      this.y = 380;
    } else if (this.y <= 20 && this.x > 0 && this.x < 606) {
      this.score += 1;
      this.reset();
    };
};

Player.prototype.reset = function() {
    this.x = this.xo;
    this.y = this.yo;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.

// Place the player object in a variable called player
var player = new Player();



var player = new Player(303, 380);
var topRow = this.y <= -20 && this.x > 0 && this.x < 606;
var winPositions = [[101, 35], [202, 35], [303, 35], [404, 35], [505, 35]];


/*
* INSTANTIATE ALL OBJECTS
*/

// Instantiate the enemies

var allEnemies = [];
var yVals = [220, 140, 60];

for (i=0; i < 5; i++) {
  	// Set a starting x-position based on a random value
    var x = Math.floor((Math.random() * -1000) + 1);

    // Set a starting y-position based on a random selection of the 3 possible values
    var y = yVals[Math.floor(Math.random() * 3)];

    // Create the new enemy object
    var enemy = new Enemy(x, y);

    // Push the enemy into the array
    allEnemies.push(enemy);
}




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
