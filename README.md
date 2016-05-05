# TicTacToeJS
provide a library like chess.js but for tic tac toe.. you can make your own GUI

#### installation

npm command line:
	```
	npm install tictactoejs
	```

bower command line:
	```
	bower install tictactoejs
	```


#### usage example as NPM module
```
var TicTacToe = require('tictactoejs');
var game = new TicTacToe.TicTacToe();

	game.turn(); // first move will be X
	game.move(2, 2));
	
	game.turn(); // will be O
	game.move(2, 1));
	
	console.log(game.ascii()); // check board
```

#### usage example in web / bower
```
<script type="text/javascript" src="bower_components/tictactoejs/TicTacToe.min.js"></script>
<script type="text/javascript">
var game = new TicTacToe();

	game.turn(); // first move will be X
	game.move(2, 2));
	
	game.turn(); // will be O
	game.move(2, 1));
	console.log(game.ascii()); // check board
</script>
```


#### a bit of documentation
```
	var game = new TicTacToe(boardSize);  // default 3
	
	game.turn();		// check whos turn X or O
	
	/*
	 * default move
	 * move with Cartesian coordinate system, but array still in normal style :-)
	 * 
	 * usually board game like chess using cartesian coordinate, but x in alphabet
	 * since tic tac toe have no formal notation, lets use this
	 * 
	 * Y
	 * 3   1,3 | 2,3 | 3,3
	 *     ---------------
	 * 2   1,2 | 2,2 | 3,2
	 *     ---------------
	 * 1   1,1 | 2,1 | 3,1
	 *
	 *      1     2     3	X	
	 * */
	game.move(x, y);
	
	
	game.ascii();		// print table in ascii mode
	game.ascii2();		// print table in ascii mode, just different style
	
	
	game.game_over();	// check if game is over true or false
	game.isDraw();		// check if game is draw true or false
	
	/*
	 * if game draw,  return 'draw'
	 * if game X win, return 'X'
	 * if game O win, return 'O'
	 * if game still in progress, return 'in progress'
	 */
	game.status();
	
	game.legalMoves(); // return an array of objects that x,y still available
	
	
	/*
	 * AI moves, just random :-p
	 * */
	game.randomMove();
```





#### inspiration
actually i made this project because i need to make a 3D game for my finalterm in ITB (GPU subject)
and i made tic tac toe game with three.js,
and this library inspired by chess.js (separating GUI and the game)


#### license
MIT


#### example / demo
[https://ryanhs.github.io/TicTacToeJS/](https://ryanhs.github.io/TicTacToeJS/)
