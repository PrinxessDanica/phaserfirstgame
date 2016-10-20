/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var player;
var platforms;
var cursors;
var greens;
var pink;
var score = 0;
var scoreText;

function preload() {

    game.load.image('sun', 'assets/sun.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('green', 'assets/green.png');
    game.load.spritesheet('panda', 'assets/panda.png', 64, 64);
    game.load.image('pink', 'assets/pink.png');

}

function create() {

    // game.add.sprite(0, 0, 'green');

    //  A simple background for our game
    game.add.sprite(0, 0, 'sun');

    // game.add.sprite(300, 350, 'green');

    platforms = game.add.group();

    // We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //scale it to fit the width of the game(the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    // This stops it from falling away when you jump on it
    ground.body.immovable = true;

    var ledge = platforms.create(215, 480, 'ground');
    ledge.body.immovable = true;
    ledge.anchor.setTo(0.5, 0.5);
    ledge.angle = 90
    ledge.scale.setTo(0.3, 1);

    var ledge = platforms.create(700, 480, 'ground');
        ledge.body.immovable = true;
    ledge.anchor.setTo(0.5, 0.5);
    ledge.angle = 90
    ledge.scale.setTo(0.3, 1);

    var ledge = platforms.create(199, 400, 'ground');
ledge.body.immovable = true;
    ledge.scale.setTo(1.30, 1);

    var ledge = platforms.create(600, 300, 'ground');
        ledge.body.immovable = true;
    ledge.scale.setTo(10, 10);
    ledge.scale.setTo(0.6, 1);

    var ledge = platforms.create(250, 200, 'ground');
ledge.body.immovable = true;
    ledge.scale.setTo(10, 10);
    ledge.scale.setTo(0.6, 1);

    var ledge = platforms.create(1, 100, 'ground');
ledge.body.immovable = true;
    ledge.scale.setTo(10, 10);
    ledge.scale.setTo(0.3, 1.3);

    var ledge = platforms.create(690, 100, 'ground');
ledge.body.immovable = true;
    ledge.scale.setTo(10, 10);
    ledge.scale.setTo(0.6, 1);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // the player and it's stettings 
    player = game.add.sprite(32, game.world.height - 150, 'panda');

    // We need to enable physics on the player
    game.physics.arcade.enable(player);

    // Player physics properties. Give the little guy a slight bounce.
    //player.body.bounce.y = 0.5;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    // Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = game.input.keyboard.createCursorKeys();

    greens = game.add.group();
    greens.enableBody = true;

    // Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 60; i++) {
        // Create a star inside the 'stars' group
        var green = greens.create(i * 70, 0, 'green');

        // Let gravity do it's thing
        green.body.gravity.y = 90;

        // This just gives each star a slighty random bounce value
        green.body.bounce.y = 0.7 + Math.random() * 0.2
    }
    // This is where you can see your score
    scoreText = game.add.text(16, 16, 'score 0', { fontSize: '32px', fill: '#000' });

}

function update() {

    // Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    // reset the players velosity (movement)
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        // Move to the left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        // Move to the right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        // Stand still
        player.animations.stop();
        player.frame = 4;
    }
    // Allow the player to jump if they are touching the ground
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -300;
    }

    game.physics.arcade.collide(greens, platforms);


    game.physics.arcade.overlap(player, greens, collectgreen, null, this)

scoreText.text = "Score: " + score;

}

function collectgreen(player, green) {

    green.kill();
// Here we'll create 12 of them evenly spaced apart
        // Create a star inside the 'stars' group
        var green = greens.create(Math.random() * 600, 0, 'green');

        // Let gravity do it's thing
        green.body.gravity.y = 90;

        // This just gives each star a slighty random bounce value
        green.body.bounce.y = 0.7 + Math.random() * 0.2
    
    // removes the star from the screen
    score++;
    
}
