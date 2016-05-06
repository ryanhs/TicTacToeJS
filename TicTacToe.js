/*
 * @license
 * Copyright (c) 2016 ryan hs <mr.ryansilalahi@gmail.com>
 * MIT License
 * https://github.com/ryanhs/TicTacToeJS.git
 */

(function(){
	'use strict';

	var TicTacToe = function(requestSize){
		var game = {},
			size = 3,
			board = [],
			moveCount = 1,
			history = [],
			statusCache = [moveCount, 'in progress'],
			legalMovesCache = [0, []]
			;
			
			game.reset = function(requestSize){
				if(parseInt(requestSize) >= 3) size = requestSize;
				
				var tmp = [],
					i, j;
					
				board = [];
				for(i = 0; i < size; i++){
					tmp = [];
					for(j = 0; j < size; j++) tmp.push(null);
					board.push(tmp);
				}
				
				moveCount = 1;
				history = [];
			}
			
			game.getSize = function(){ return size; }
			
			game.turn = function(){ return moveCount % 2 == 0 ? 'O' : 'X'; }
			
			game.ascii = function(){
				var o = '',
					i, j;
				for(i = 0; i < size; i++){
					for(j = 0; j < size; j++){
						if(j == 0) o += ' ';
						o += board[i][j] == null ? ' ' : board[i][j];
						if(j < size - 1) o += ' | ';
					}
					if(i < size - 1) o += "\r\n" + '-'.repeat(size * 4 - 1) + "\r\n";
				}
				return o;
			}
			
			game.ascii2 = function(){
				var o = '',
					i, j;
				for(i = 0; i < size; i++){
					for(j = 0; j < size; j++){
						if(j == 0) o += (size - i) + ' ';
						o += ' ';
						o += board[i][j] == null ? '.' : board[i][j];
						o += ' ';
					}
					o += "\r\n";
				}
				
				o += "   ";
				for(j = 0; j < size; j++) o += (j + 1) + '  ';
				return o;
			}
			
			/*
			 * default move
			 * move with Cartesian coordinate system, but array still in normal style :-)
			 * 
			 * usually board game like chess using cartesian coordinate, but x in alphabet
			 * since tic tac toe have no formal notation, lets use this
			 * 
			 * 1,3 | 2,3 | 3,3
			 * ---------------
			 * 1,2 | 2,2 | 3,2
			 * ---------------
			 * 1,1 | 2,1 | 3,1
			 * */
			game.move = function(x, y){
				x--;
				y = Math.abs(y - size);
				
				if(y < 0 || y >= size || x < 0 || x >= size) return false;
				if(board[y][x] != null) return false;
				
				board[y][x] = game.turn();
				moveCount++;
				return true;
			}
			
			/*
			 * exists x, y
			 */
			game.exists = function(x, y){
				x--;
				y = Math.abs(y - size);
				
				if(y < 0 || y >= size || x < 0 || x >= size) return false;
				return board[y][x] != null;
			}
			
			/*
			 * move with Array style
			 * 0,0 | 0,1 | 0,2
			 * ---------------
			 * 1,0 | 1,1 | 1,2
			 * ---------------
			 * 2,0 | 2,1 | 2,2
			 * */
			game.moveArray = function(row, col){
				if(row < 0 || row >= size || col < 0 || col >= size) return false;
				if(board[row][col] != null) return false;
				
				board[row][col] = game.turn();
				moveCount++;
				return true;
			}
			
			/*
			 * return "X" or "O" or "draw" or "in progress"
			 * */
			function status(){
				var i, j,
					Xh, Oh, // X O horizontal
					Xv, Ov, // X O vertical
					Xd1, Od1, // diagonal \ 
					Xd2, Od2, // diagonal / 
					draw = true;
				Xh = Oh = Xv = Ov = Xd1 = Od1 = Xd2 = Od2 = 0;
				
				for(i = 0; i < size; i++){
					// horizontal&vertical reset
					Xh = Oh = Xv = Ov = 0;
											
					for(j = 0; j < size; j++){
						// draw checker
						if(board[i][j] == null) draw = false;
						
						// horizontal check
						if(board[i][j] == 'X') Xh++;
						if(board[i][j] == 'O') Oh++;
						
						// vertical check
						if(board[j][i] == 'X') Xv++;
						if(board[j][i] == 'O') Ov++;
					}
					
					// horizontal&vertical breaker
					if(Xh == size || Xv == size) return 'X';
					if(Oh == size || Ov == size) return 'O';
						
					// diagonal \  checker
					if(board[i][i] == 'X') Xd1++;
					if(board[i][i] == 'O') Od1++;
					
					// diagonal /  checker
					if(board[i][size - i - 1] == 'X') Xd2++;
					if(board[i][size - i - 1] == 'O') Od2++;
				}
				
				// diagonal breaker
				if(Xd1 == size || Xd2 == size) return 'X';
				if(Od1 == size || Od2 == size) return 'O';
				
				return draw ? 'draw' : 'in progress';
			}
			
			game.status = function(){
				if(statusCache[0] == moveCount) return statusCache[1];
				
				statusCache[0] = moveCount;
				statusCache[1] = status();
				return game.status(); // hmm
			}
			
			game.gameOver = function(){
				return game.status() != 'in progress';
			}
			
			game.isDraw = function(){
				return game.status() == 'draw';
			}
			
			
			/*
			 * some functions here is usefull for something like AI
			 * */
			 
			/*
			 * legal moves Cartesian Style
			 * */
			game.legalMoves = function(){
				if(legalMovesCache[0] == moveCount) return legalMovesCache[1];
				
				var x, y,
					moves = [];
				for(y = 0; y < size; y++){
					for(x = 0; x < size; x++){						
						//~ x--;
						//~ y = Math.abs(y - size);
						if(board[y][x] == null) moves.push({'x': x + 1, 'y': size - y});
					}
				}
				
				legalMovesCache[0] = moveCount;
				legalMovesCache[1] = moves;
				return game.legalMoves(); // hmm
			}
			
			/*
			 * AI moves, just random :-p
			 * */
			game.randomMove = function(){
				var move = game.legalMoves()[Math.floor(Math.random() * game.legalMoves().length)]
				game.move(move.x, move.y);
				return move;
			}
			
		
		game.reset(requestSize);
		return game;
	}

	if(typeof exports !== 'undefined') exports.TicTacToe = TicTacToe;
	if(typeof window !== 'undefined') window.TicTacToe = TicTacToe;
})()
