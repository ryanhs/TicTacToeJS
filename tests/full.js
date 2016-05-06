// tape & tap-spec
var test = require('tape');
var tapSpec = require('tap-spec');
	test.createStream()
		.pipe(tapSpec())
		.pipe(process.stdout);


var ttt = require('./../TicTacToe.js');
test('size', function (t) {
	for(var i = 3; i <= 5; i++){
		var game = new ttt.TicTacToe(i);
		t.equal(game.getSize(), i);
	}
	
	t.end();
});

test('turn', function (t) {
	var game = new ttt.TicTacToe();
	t.equal(game.turn(), 'X');
	t.end();
});

test('move (cartesian) (default)', function (t) {
	var game = new ttt.TicTacToe();
	
	t.equal(game.turn(), 'X');
	t.true(game.move(1, 1)); // X
									t.equal(game.turn(), 'O');
									t.true(game.move(2, 2)); // O
									
	t.equal(game.turn(), 'X');
	t.true(game.move(2, 1)); // X
	
									t.equal(game.turn(), 'O');
									t.true(game.move(3, 1)); // O
									
	t.equal(game.turn(), 'X');
	t.false(game.move(3, 1)); // already by O
	
	//~ console.log(game.ascii())
	t.end();
});

test('move (array)', function (t) {
	var game = new ttt.TicTacToe();
	
	t.equal(game.turn(), 'X');
	t.true(game.moveArray(2, 0)); // X
										t.equal(game.turn(), 'O');
										t.true(game.moveArray(1, 1)); // O
	t.equal(game.turn(), 'X');
	t.true(game.moveArray(2, 1)); // X
										t.equal(game.turn(), 'O');
										t.true(game.moveArray(2, 2)); // O
	t.equal(game.turn(), 'X');
	t.false(game.moveArray(2, 2)); // already by O
	
	//~ console.log(game.ascii())
	t.end();
});

test('move invalid outside board', function (t) {
	var game = new ttt.TicTacToe(3);
	t.false(game.moveArray(-1, 3));
	t.false(game.moveArray(1, 3));
	t.false(game.moveArray(4, 1));
	t.false(game.moveArray(5, 3));
	
	t.false(game.move(0, -1));
	t.false(game.move(0, 0));
	t.false(game.move(1, 0));
	t.false(game.move(4, 2));
	t.false(game.move(4, 4));
	
	//~ console.log(game.ascii())
	t.end();
});

test('status', function (t) {
	var game;
	
	game = new ttt.TicTacToe(); // unfinished game
	//	  X					  O
	game.move(1, 1);	game.move(1, 2);
	game.move(2, 1);	game.move(2, 2);
	t.equal(game.status(), 'in progress', 'unfinished game');
	
	game = new ttt.TicTacToe(); // X horizontal
	//	  X					  O
	game.move(1, 1);	game.move(1, 2);
	game.move(2, 1);	game.move(2, 2);
	game.move(3, 1);	game.move(3, 3);
	t.equal(game.status(), 'X', 'X horizontal');
	
	game = new ttt.TicTacToe(); // O horizontal
	//	  X					  O
	game.move(1, 1);	game.move(1, 2);
	game.move(2, 1);	game.move(2, 2);
	game.move(3, 3);	game.move(3, 2);
	t.equal(game.status(), 'O', 'O horizontal');
	
	game = new ttt.TicTacToe(); // X vertical
	//	  X					  O
	game.move(2, 2);	game.move(1, 2);
	game.move(2, 3);	game.move(1, 3);
	game.move(2, 1);
	t.equal(game.status(), 'X', 'X vertical');
	
	game = new ttt.TicTacToe(); // O vertical
	//	  X					  O
	game.move(2, 1);	game.move(1, 2);
	game.move(3, 2);	game.move(1, 1);
	game.move(3, 3);	game.move(1, 3);
	t.equal(game.status(), 'O', 'O vertical');
	
	game = new ttt.TicTacToe(); // draw
	//	  X					  O
	game.move(1, 1);	game.move(2, 2);
	game.move(1, 2);	game.move(1, 3);
	game.move(3, 1);	game.move(2, 1);
	game.move(2, 3);	game.move(3, 2);
	game.move(3, 3);
	t.equal(game.status(), 'draw', 'draw');
	t.true(game.isDraw(), 'is draw');
	
	game = new ttt.TicTacToe(); // diagonal \
	//	  X					  O
	game.move(1, 3);	game.move(1, 2);
	game.move(2, 2);	game.move(3, 2);
	game.move(3, 1);	game.move(2, 1);
	t.equal(game.status(), 'X', 'diagonal \\');
	
	game = new ttt.TicTacToe(3); // diagonal /
	//	  X					  O
	game.move(2, 2);	game.move(1, 2);
	game.move(1, 1);	game.move(3, 1);
	game.move(3, 3);	game.move(1, 3);
	t.equal(game.status(), 'X', 'diagonal /');
	
	
	t.true(game.gameOver(), 'gameOver()');
	t.end();
});


test('legal moves', function (t) {
	var game = new ttt.TicTacToe(3);
	
	t.equal(game.legalMoves().length, 9, '9');
	
	game.move(1, 1);
	t.equal(game.legalMoves().length, 8, '8');
	
	game.move(1, 2);
	t.equal(game.legalMoves().length, 7, '7');
	
	game.move(1, 3);
	t.equal(game.legalMoves().length, 6, '6');
	
	game.move(2, 1);
	t.equal(game.legalMoves().length, 5, '5');
	
	game.move(2, 2);
	t.equal(game.legalMoves().length, 4, '4');
	
	game.move(2, 3);
	t.equal(game.legalMoves().length, 3, '3');
	
	game.move(3, 1);
	t.equal(game.legalMoves().length, 2, '2');
	
	game.move(3, 2);
	t.equal(game.legalMoves().length, 1, '1');
	
	game.move(3, 3);
	t.equal(game.legalMoves().length, 0, '0');
	
	t.true(game.gameOver(), 'gameOver()');
	t.end();
});

test('random moves', function (t) {
	var game = new ttt.TicTacToe(),
		move;
	
	for(var i = 9; i > 0; i--){
		t.equal(game.legalMoves().length, i, i);
		move = game.randomMove();
		//~ console.log(move);
	}
	
	t.true(game.gameOver(), 'gameOver()');
	//~ console.log(game.ascii())
	t.end();
});

test('exists', function (t) {
	var game = new ttt.TicTacToe();
	
	// must be available
	t.false(game.exists(2, 2), 'check available');
	
	game.move(2, 2);
	
	// must be exists
	t.true(game.exists(2, 2), 'check if exists');
	
	//~ console.log(game.ascii())
	t.end();
});

