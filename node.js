var TicTacToe = require('tictactoejs');
var game = new TicTacToe.TicTacToe();

for(var i = 9; i > 0; i--){
	game.randomMove()
}

console.log(game.ascii())
