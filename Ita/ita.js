/**  Ita Game Engine
 *   ===============
 *   This is the game engine for Ita. The code is released under CC-BY-SA-3.0, with attribution
 *   "Isoraķatheð".
 */
var game = {
	"board": [
		["11", "21", "31", "41", "51", "61", "71", "81", "91", "01"],
		["12", "22", "32", "42", "52", "62", "72", "82", "92", "02"],
		["13", "23", "33", "43", "53", "63", "73", "83", "93", "03"],
		["14", "24", "34", "44", "54", "64", "74", "84", "94", "04"],
		["15", "25", "35", "45", "55", "65", "75", "85", "95", "05"],
		["16", "26", "36", "46", "56", "66", "76", "86", "96", "06"],
		["17", "27", "37", "47", "57", "67", "77", "87", "97", "07"],
		["18", "28", "38", "48", "58", "68", "78", "88", "98", "08"],
		["19", "29", "39", "49", "59", "69", "79", "89", "99", "09"],
		["10", "20", "30", "40", "50", "60", "70", "80", "90", "00"]
	],
	"boardnot": [
		["u1", "g1", "s1", "f1", "t1", "œ1", "lz1", "a1", "y1", "o1"],
		["u2", "g2", "s2", "f2", "t2", "œ2", "lz2", "a2", "y2", "o2"],
		["u3", "g3", "s3", "f3", "t3", "œ3", "lz3", "a3", "y3", "o3"],
		["u4", "g4", "s4", "f4", "t4", "œ4", "lz4", "a4", "y4", "o4"],
		["u5", "g5", "s5", "f5", "t5", "œ5", "lz5", "a5", "y5", "o5"],
		["u6", "g6", "s6", "f6", "t6", "œ6", "lz6", "a6", "y6", "o6"],
		["u7", "g7", "s7", "f7", "t7", "œ7", "lz7", "a7", "y7", "o7"],
		["u8", "g8", "s8", "f8", "t8", "œ8", "lz8", "a8", "y8", "o8"],
		["u9", "g9", "s9", "f9", "t9", "œ9", "lz9", "a9", "y9", "o9"],
		["u10", "g10", "s10", "f10", "t10", "œ10", "lz10", "a10", "y10", "o10"]
	],
	"headers": [
		["u", "g", "s", "f", "t", "œ", "lz", "a", "y", "o"],
		["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
	],
	"currentlyHighlightedCell": "unhighlighted",
	"currentlyHighlightedPiece": "unhighlightedPiece",
	"hotPiece": {},
	"playstate" : 1,
	"mode" : 0,
	"boredomCounter": 0,
	"findPieces" : function(x) {
		//console.log("fp");
		var destinationMenu = document.getElementById("potentialdestinations"), findSide = 0;
		switch (x) {
			case "white": findSide = 0; break;
			case "black": findSide = 1; break;
			default: console.error("Erroneous side selected!");
		}
		var actingPiece, createMenu, pieceCount, toMove = document.getElementById("tomove");
		for (i = 0; i < game.pieces.QAA[(findSide === 0 ? 1 : 0)].length; i++) {
			actingPiece = document.getElementById(game.pieces.QAA[(findSide === 0 ? 1 : 0)][i]);
			//console.log("Removing event listeners for " + actingPiece.getAttribute("id"));
			actingPiece.removeEventListener('click', game.legalMovesWrapper, false);
			actingPiece.removeEventListener('mouseover', game.highlightPiece, false);
			actingPiece.removeEventListener('mouseout', game.unhighlightPiece, false);
		}
		for (i = 0; i < game.pieces.QAA[findSide].length; i++) {
			if (document.getElementById(game.pieces.QAA[findSide][i])) {
				pieceCount++;
				actingPiece = document.getElementById(game.pieces.QAA[findSide][i]);
				if (actingPiece.addEventListener){actingPiece.addEventListener('click', game.legalMovesWrapper, false);}
				else if (actingPiece.attachEvent){actingPiece.attachEvent('onclick', game.legalMovesWrapper);}
				if (actingPiece.addEventListener){actingPiece.addEventListener('mouseover', game.highlightPiece, false);}
				else if (actingPiece.attachEvent){actingPiece.attachEvent('onmouseover', game.highlightPiece);}
				if (actingPiece.addEventListener){actingPiece.addEventListener('mouseout', game.unhighlightPiece, false);}
				else if (actingPiece.attachEvent){actingPiece.attachEvent('onmouseover', game.unhighlightPiece);}
			}
		}
		// Check for win conditions: stalemate and Flag kill
		if (pieceCount === 0) game.win("stalemate", ((x === "white")? "black" : "white"));
		if (pieceCount === 1) game.win("bareFlag", ((x === "white")? "black" : "white"));
		if (!(document.getElementById("w-flag-righ") || document.getElementById("w-flag-left"))) game.win("flagKill", "black");
		if (!(document.getElementById("b-flag-righ") || document.getElementById("b-flag-righ"))) game.win("flagKill", "white");
		// Obligatory return statement	
		// return toMove.innerHTML;
	},
	"legalMovesWrapper" : function() {
		//console.log("lmw");
		game.hotPiece = this;
		for (i = 0; i < game.board.length; i++) {for (j = 0; j < game.board[i].length; j++) {
			document.getElementById("gb-" + game.board[i][j]).removeAttribute("class");
		}}
		var destinationMenu = document.getElementById("potentialdestinations");
		var destinations = this.findLegalMoves();
		var createMenu;
		destinationMenu.innerHTML = "";
		if (destinations.length === 0) {
			createMenu = document.createElement("option");
			destinationMenu.appendChild(createMenu);
			createMenu.innerHTML = "This piece cannot be moved."
			createMenu.setAttribute("class", "novalidmoves");
		}
		else {
			var destX, destY;
			for (i = 0; i < destinations.length; i++) {
				destX = destinations[i][0];
				destY = destinations[i][1];
				createMenu = document.createElement("button");
				createMenu.innerHTML = game.boardnot[destY][destX];
				createMenu.setAttribute("id", "moveto-" + game.board[destY][destX]);
				destinationMenu.appendChild(createMenu);
				if (destinations[i][2]) createMenu.className += " flagdiag";
				if (destinations[i][3]) createMenu.className += " flagcapt";
				if (createMenu.addEventListener){createMenu.addEventListener('click', game.moveIt, false);}
				else if (createMenu.attachEvent){createMenu.attachEvent('onclick', game.moveIt);}
				if (createMenu.addEventListener){createMenu.addEventListener('mouseover', game.highlightCell, false);}
				else if (createMenu.attachEvent){createMenu.attachEvent('onmouseover', game.highlightCell);}
				if (createMenu.addEventListener){createMenu.addEventListener('mouseout', game.unhighlightCell, false);}
				else if (createMenu.attachEvent){createMenu.attachEvent('onmouseout', game.unhighlightCell);}
			}
		}
	},
	"highlightCell": function () {
		//console.log("hc");
		// Clear out the class of the previous user
		document.getElementById(game.currentlyHighlightedCell).removeAttribute("class");
		document.getElementById("gb-" + this.getAttribute("id").replace(/moveto-/, "")).setAttribute("class", "highlighted");
		game.currentlyHighlightedCell = "gb-" + this.getAttribute("id").replace(/moveto-/, "");
		console.log(game.currentlyHighlightedCell);
	},
	"unhighlightCell": function() {
		//console.log("uhc");
		document.getElementById(game.currentlyHighlightedCell).removeAttribute("class");
		document.getElementById("unhighlighted").setAttribute("class", "highlighted");
		game.currentlyHighlightedCell = "unhighlighted";
	},
	"highlightPiece": function() {
		//console.log("hp")
		// Clear out the class of the previous user
		document.getElementById(game.currentlyHighlightedPiece).setAttribute("class", "chesspiece");
		document.getElementById(this.setAttribute("class", "chesspiece highlighted"));
		game.currentlyHighlightedPiece = this.getAttribute("id");
	},
	"unhighlightPiece": function() {	
		//console.log("uhp")
		document.getElementById(game.currentlyHighlightedPiece).setAttribute("class", "chesspiece");
		document.getElementById("unhighlightedPiece").setAttribute("class", "highlighted");
		game.currentlyHighlightedPiece = "unhighlightedPiece";
	},
	"moveIt": function() {
		document.getElementById("potentialdestinations").innerHTML = "";
		var firer = this.getAttribute("id");
		var x = +firer.charAt(7) - 1, y = +firer.charAt(8) - 1;
		var classfit = this.getAttribute("class");
		if (classfit === null) classfit = "randomstring";
		var selectedPiece = game.hotPiece;
		var enemy = (selectedPiece.side === 1)?2:1;
		var targetSpace = document.getElementById("gb-" + game.board[y][x]), capt = "";
		var newPiece = document.createElement("div"), isEnemy = (game.detect.seeContents(x, y) === enemy);
		if (isEnemy) { // Capture clause
			var captured = document.getElementById("gb-" + game.board[y][x]).getElementsByTagName("div")[0];
			captured.setState("Captured");
			captured.parentNode.removeChild(captured);
			if (classfit.match(/flagcapt/)) newPiece.flagHasCaptured = true; // Flag Capture Clause
			capt = "x";
			game.boredom.ltCheck();
		}
		else game.boredom.getBored((selectedPiece.side === 1)?"black":"white");
		if (!(isEnemy && selectedPiece.type === "L")) { // Actually moving the piece, so Leapers are excluded
			console.log(selectedPiece);
			newPiece.innerHTML = selectedPiece.type;
			newPiece.setAttribute("class", "chesspiece");
			newPiece.newpiece(x, y, "Safe", selectedPiece.type, selectedPiece.side);
			targetSpace.appendChild(newPiece);
			var finalId = selectedPiece.getAttribute("id");
			selectedPiece.parentNode.removeChild(selectedPiece);
			newPiece.setAttribute("id", finalId);
			if (classfit.match(/flagdiag/)) newPiece.flagHasDiagonal = true; // Flag Diagonal Clause
			document.getElementById("gamelog").innerHTML += " " + newPiece.type + capt + game.boardnot[newPiece.ypos][newPiece.xpos];
		}
		else document.getElementById("gamelog").innerHTML += " L!" + game.boardnot[y][x];
		// Check for win conditions: Flag migration
		var winKey = "";
		if (newPiece.type === "F" && newPiece.ypos === ((newPiece.side === 1)?9:0)) {
			winKey = "flagOpposite";
			var sideletter = (newPiece.side === 1)?"w-":"b-";
			var otherId = (finalId === sideletter + "flag-left")?sideletter + "flag-right":sideletter + "flag-left";
			if (document.getElementById(otherId)) {
				winKey += "Double";
				if (document.getElementById(otherId).ypos === ((newPiece.side === 1)?8:1)) winKey += "Ninth";
			}
			game.win(winKey, (newPiece.side === 1)?"white":"black");
		}
		// Switch turns
		game.unhighlightCell();
		game.time.swapTimers();
	},
	"win": function (reason, side) {
		game.time.stopCountFinal();
		var loser = (side === "white" || side === "White")? "black" : "white";
		var winnerSide = function(x) {return document.getElementById("score" + side).innerHTML = x;}
		var loserSide = function(x) {return document.getElementById("score" + loser).innerHTML = x;}
		var winReason = function(x) {return document.getElementById("winreason").innerHTML = x;}
		var beat = function(win, lose) {
			winnerSide(win);
			loserSide(lose)
			document.getElementById("gamelog").innerHTML += " " + ((side === "white")? win + "-" + lose: lose + "-" + win);
		}
		var firstLettercap = function(input) {
			return ((input === "white" || input === "White") ? "White" : "Black");
		}
		switch(reason) {
			case "time":
				beat(4,1);
				winReason(firstLettercap(side) + " has won for time!");
			break;
			case "stalemate" :
				beat(2,3);
				winReason(firstLettercap(side) + " stalemated " + firstLettercap(loser) + ",\
					therefore" + firstLettercap(loser) + " wins!");
			break;
			case "flagOpposite":
				beat(5,2);
				winReason(firstLettercap(side) + " got its flag to the last row!");
			break;
			case "flagOppositeDouble":
				beat(5,1);
				winReason(firstLettercap(side) + " got its flag to the last row, and both Flags\
					are still on the board!");
			break;
			case "flagOppositeDoubleNinth":
				beat(5,0);
				winReason(firstLettercap(side) + " got its Flag to the last row, and the other Flag\
					is on the ninth row!");
			break;
			case "flagKill":
				beat(4,1);
				winReason(firstLettercap(side) + " captured all its enemy's Flags!");
			break;
			case "bareFlag":
				beat(3,1);
				winReason(firstLettercap(side) + " captured all its enemy's pieces save a Flag!");
			break;
			case "bored":
				beat(2,4);
				winReason(firstLettercap(side) + "failed to end the 18th consecutive non-capturing\
					turn with a capture when there are less than 15 pieces on the board!");
			break;
			default:
				console.error("game.win: Erroneous win reason given!");
		}
	},
	"time": {
		"white"    : 0,
		"black"    : 0,
		"byMode"   : [[59999,59999], [3159,3370], [1263,1371], [442,520], [210,253]],
		"addTime"  : [[10000,0], [6,211], [6,126], [9,42], [10000,0]],
		"t"        : 0,
		"timerIsOn": false,
		"setTimer" : function() {
			var timesel = document.getElementById("time");
			game.mode = parseInt(timesel[timesel.selectedIndex].value);
			game.time.white = game.time.byMode[game.mode][0];
			game.time.black = game.time.byMode[game.mode][1];
			document.getElementById("black").innerHTML = Math.floor(game.time.black/60)+":"+game.time.black%60;
			document.getElementById("white").innerHTML = Math.floor(game.time.white/60)+":"+game.time.white%60;
			document.getElementById("startgame").disabled="";
		},
		"timedCountWhite": function() {
			document.getElementById('white').innerHTML = Math.floor(game.time.white/60)+":"+game.time.white%60;
			game.time.white = game.time.white - 1;
			if (game.time.white <= -1) game.win("time", "black");
			game.time.t = setTimeout("game.time.timedCountWhite()",1000);
		},
		"timedCountBlack": function() {
			document.getElementById('black').innerHTML = Math.floor(game.time.black/60)+":"+game.time.black%60;
			game.time.black = game.time.black - 1;
			if (game.time.black <= -1) game.win("time", "white");
			game.time.t = setTimeout("game.time.timedCountBlack()",1000);
		},
		"swapTimers": function() {
			var turnnum = parseInt(document.getElementById("turnnumber").innerHTML);
			if (game.playstate === 1) {
				game.time.stopCount();
				game.playstate = 2;
				if (game.mode !== 0) game.time.timedCountBlack();
				game.findPieces("black");
			}
			else {
				game.time.stopCount();
				if (game.mode !== 0) game.time.timedCountWhite();
				game.playstate = 1;
				document.getElementById("turnnumber").innerHTML = turnnum+1;
				if (turnnum%game.time.addTime[game.mode][0] === 0 && turnnum !== 0) {
					game.time.black = game.time.black + game.time.addTime[game.mode][1];
					game.time.white = game.time.white + game.time.addTime[game.mode][1];
				}
				game.findPieces("white");
			}
		},
		"doTimer": function() {
			if (!game.time.timerIsOn) {
				document.getElementById("gamelog").innerHTML = "Game " + Math.floor(Math.random() * 1000000) + ":";
				game.time.timerIsOn=true;
				game.playstate = 1;
				if (game.mode !== 0) {game.time.timedCountWhite();}
				game.findPieces("white");
			}
			this.disabled="disabled";
		},
		"stopCount": function () {
			clearTimeout(game.time.t);
			game.time.timerIsOn=false;
		},
		"stopCountFinal": function () {
			clearTimeout(game.time.t);
			game.time.timerIsOn=false;
			game.mode = 0;
			game.playstate = 0;
			document.getElementById("turnnumber").innerHTML = 0;
			document.getElementById("startgame").disabled="";
		}
	},
	"boredom": {
		"remPieces": 36,
		"yawnLevel": 0,
		"ltCheck"  : function() {
			game.boredom.remPieces = game.boredom.remPieces - 1;
			document.getElementById("rem").innerHTML = game.boredom.remPieces;
			if (game.boredom.remPieces <= 15) {
				game.boredom.yawnLevel = 0;
				document.getElementById("boredommeter").value = game.boredom.yawnLevel;
				document.getElementById("boredommeter").innerHTML = game.boredom.yawnLevel + "/36";
			}
		},
		"getBored": function(winnerCandidate) {if (game.boredom.remPieces <= 6) {
			game.boredom.yawnLevel += 1;
			document.getElementById("boredommeter").value = game.boredom.yawnLevel;
			document.getElementById("boredommeter").innerHTML = game.boredom.yawnLevel + "/36";
			if (yawnLevel === 36) game.win("bored", winnerCandidate);
		}}
	},
	"detect": {
		"seeContents": function(x, y) {
			var square;
			try {
				if (game.board[y][x] === undefined) throw "OutOfRange";
				else square = game.board[y][x]
			}
			catch (er) {if (er === "OutOfRange") square = "null";}
			var toDetect = document.getElementById("gb-" + square);
			if (toDetect === null) return null;
			else if (toDetect.getElementsByTagName("div").length === 0) return 0;
			else if (toDetect.getElementsByTagName("div")[0].side === 2) return 2;
			else return 1;
		},
		"singleSquareCheck": function(x, y, state, legalMoves) {
			if (game.detect.seeContents(x, y) === state) legalMoves.push([x, y]);
			return legalMoves;
		},
		"multiSquareCheck": function() {
			var args = Array.prototype.slice.call(arguments);
			for (i = 0; i < args.length; i++) {
				game.detect.singleSquareCheck(args[i][0], args[i][1], args[i][2], args[i][3]);
			}
		}
	},
	"pieces": {
		"QAA": [
			[
				"w-flag-righ", "w-flag-left", "w-rook-righ", "w-rook-left",
				"w-bish-righ", "w-bish-left", "w-leap-left", "w-leap-righ",
				"w-cava-righ", "w-cava-left", "w-squi-righ", "w-squi-left",
				"w-pawn-rone", "w-pawn-rtwo", "w-pawn-rthr",
				"w-pawn-lone", "w-pawn-ltwo", "w-pawn-lthr"
			],
			[
				"b-flag-righ", "b-flag-left", "b-rook-righ", "b-rook-left",
				"b-bish-righ", "b-bish-left", "b-leap-left", "b-leap-righ",
				"b-squi-righ", "b-squi-left", "b-cava-righ", "b-cava-left",
				"b-pawn-rone", "b-pawn-rtwo", "b-pawn-rthr",
				"b-pawn-lone", "b-pawn-ltwo", "b-pawn-lthr"
			],
		],
		"piecelist": [
			["w-flag-left", 4, 0, "Safe", "F", 1], ["w-flag-righ", 5, 0, "Safe", "F", 1],
			["w-rook-left", 3, 0, "Safe", "R", 1], ["w-rook-righ", 6, 0, "Safe", "R", 1],
			["w-bish-left", 0, 0, "Safe", "B", 1], ["w-bish-righ", 9, 0, "Safe", "B", 1],
			["w-leap-left", 2, 1, "Safe", "L", 1], ["w-leap-righ", 7, 1, "Safe", "L", 1],
			["w-squi-left", 4, 1, "Safe", "S", 1], ["w-squi-righ", 5, 1, "Safe", "S", 1],
			["w-cava-left", 2, 2, "Safe", "C", 1], ["w-cava-righ", 7, 2, "Safe", "C", 1],
			["w-pawn-lone", 0, 3, "Safe", "P", 1], ["w-pawn-ltwo", 2, 3, "Safe", "P", 1],
			["w-pawn-lthr", 3, 3, "Safe", "P", 1], ["w-pawn-rone", 9, 3, "Safe", "P", 1],
			["w-pawn-rtwo", 7, 3, "Safe", "P", 1], ["w-pawn-rthr", 6, 3, "Safe", "P", 1],
			["b-flag-left", 4, 9, "Safe", "F", 2], ["b-flag-righ", 5, 9, "Safe", "F", 2],
			["b-rook-left", 3, 9, "Safe", "R", 2], ["b-rook-righ", 6, 9, "Safe", "R", 2],
			["b-bish-left", 0, 9, "Safe", "B", 2], ["b-bish-righ", 9, 9, "Safe", "B", 2],
			["b-leap-left", 2, 8, "Safe", "L", 2], ["b-leap-righ", 7, 8, "Safe", "L", 2],
			["b-squi-left", 4, 8, "Safe", "S", 2], ["b-squi-righ", 5, 8, "Safe", "S", 2],
			["b-cava-left", 2, 7, "Safe", "C", 2], ["b-cava-righ", 7, 7, "Safe", "C", 2],
			["b-pawn-lone", 0, 6, "Safe", "P", 2], ["b-pawn-ltwo", 2, 6, "Safe", "P", 2],
			["b-pawn-lthr", 3, 6, "Safe", "P", 2], ["b-pawn-rone", 9, 6, "Safe", "P", 2],
			["b-pawn-rtwo", 7, 6, "Safe", "P", 2], ["b-pawn-rthr", 6, 6, "Safe", "P", 2]
		],
		"findMove": function(piece) {
			
		}
	}
};
function init() {
	{ // Make a couple of new properties for the <div> element.
		HTMLDivElement.prototype.xpos = 0;
		HTMLDivElement.prototype.ypos = 0;
		HTMLDivElement.prototype.state = 0;
		HTMLDivElement.prototype.type = "X";
		HTMLDivElement.prototype.side = 0;
		HTMLDivElement.prototype.newpiece = function (xpos, ypos, state, type, side) {//Object constructor!
			//Piece definitions
			this.xpos = xpos;
			this.ypos = ypos;
			this.state = state;
			this.type = type;
			this.side = side;
		};
		HTMLDivElement.prototype.flagHasCaptured = false;
		HTMLDivElement.prototype.flagHasDiagonal = false;
		HTMLDivElement.prototype.setState = function (state) {
			this.state = state;
		};
		HTMLDivElement.prototype.findLegalMoves = function() {
			console.log("flm");
			var legalMoves = []; // Make the array
			var enemy = (this.side === 1)?2:1;
			console.log(enemy); console.log(this.side);
			var currpos = [this.xpos, this.ypos];
			switch (this.type) { // Determine which one to use
				case "F": // Flag
					/** Special Flag Move Syntax
					 *  ===========
					 *  [Destination x, Destination y, diagonal, capture]
					 */
					var diff = (this.side === 1) ? 1 : -1; //Check south if black, north if white
					game.detect.singleSquareCheck(this.xpos, this.ypos + diff, 0, legalMoves); // mfW
					if (game.detect.seeContents(this.xpos, this.ypos + diff) === enemy && this.flagHasCaptured === false) {// cfW (only if not captured yet)
						legalMoves.push([this.xpos, this.ypos + diff, false, true]);
					}
					if (this.flagHasDiagonal === false) { //F (along diag. lines, and only if not diagonal yet.)
						if (this.xpos === 4) { //File T	
							// Pure diagonal moves
							if (game.detect.seeContents(5, this.ypos + 1) === 0) legalMoves.push([5, this.ypos + 1, true, false]);
							if (game.detect.seeContents(5, this.ypos - 1) === 0) legalMoves.push([5, this.ypos - 1, true, false]);
							// Diagonal and Capture moves
							if (game.detect.seeContents(5, this.ypos + 1) === enemy && this.flagHasCaptured === false) {
								legalMoves.push([5, this.ypos + 1, true, true]);
							}
							if (game.detect.seeContents(5, this.ypos - 1) === enemy && this.flagHasCaptured === false) {
								legalMoves.push([5, this.ypos - 1, true, true]);
							}
						}
						else if (this.xpos === 5) { //File Œ
							// Pure diagonal moves
							if (game.detect.seeContents(4, this.ypos + 1) === 0) legalMoves.push([4, this.ypos + 1, true, false]);
							if (game.detect.seeContents(4, this.ypos - 1) === 0) legalMoves.push([4, this.ypos - 1, true, false]);
							// Diagonal and Capture moves
							if (game.detect.seeContents(4, this.ypos + 1) === enemy && this.flagHasCaptured === false) {
								legalMoves.push([4, this.ypos + 1, true, true]);
							}
							if (game.detect.seeContents(4, this.ypos - 1) === enemy && this.flagHasCaptured === false) {
								legalMoves.push([4, this.ypos - 1, true, true]);
							}
						}
						// Else it has no legal moves. A Flag outside of files T and Œ is stranded.
					}
				break;
				case "R": // Rook
					var distance = 0, pointer = [1, 0, 1, 0];
					var nudge = [[currpos[1],1], [currpos[0],1], [currpos[1],-1], [currpos[0],-1]];
					for (i = 0; i < nudge.length; i++) {
						while (distance < 6) {
							nudge[i][0] = nudge[i][0] + nudge[i][1];
							currpos[pointer[i]] = nudge[i][0];
							if (game.detect.seeContents(currpos[0], currpos[1]) === 0) {legalMoves.push([currpos[0], currpos[1]]);}
							else if (game.detect.seeContents(currpos[0], currpos[1]) === enemy) {
								legalMoves.push([currpos[0], currpos[1]]);
								break;
							}
							else break;
							distance = distance + 1;
						}
						currpos = [this.xpos, this.ypos];
						distance = 0;
					}
				break;
				case "B": // Bishop
					var distance = 0, nudgec1 = [1, -1, 1, -1], nudgec0 = [1, 1, -1, -1];
					for (i = 0; i < nudgec1.length; i++) {
						while (distance < 7) {
							currpos[1] = currpos[1] + nudgec1[i];
							currpos[0] = currpos[0] + nudgec0[i];
							if (game.detect.seeContents(currpos[0], currpos[1]) === 0) {
								legalMoves.push([currpos[0], currpos[1]]);
							}
							else if (game.detect.seeContents(currpos[0], currpos[1]) === enemy) {
								legalMoves.push([currpos[0], currpos[1]]);
								break;
							}
							else break;
							distance = distance + 1;
						}
						currpos = [this.xpos, this.ypos];
						distance = 0;
					}
				break;
				case "P": // Pawn
					var diff = (this.side === 1) ? 1 : -1; //Check south if black, north if white
					game.detect.singleSquareCheck(this.xpos, this.ypos + 1, 0, legalMoves);
					game.detect.singleSquareCheck(this.xpos, this.ypos - 1, 0, legalMoves);
					game.detect.singleSquareCheck(this.xpos + 1, this.ypos, 0, legalMoves);
					game.detect.singleSquareCheck(this.xpos - 1, this.ypos, 0, legalMoves);
					game.detect.singleSquareCheck(this.xpos + 1, this.ypos - diff, 0, legalMoves);
					game.detect.singleSquareCheck(this.xpos - 1, this.ypos - diff, 0, legalMoves);
					game.detect.singleSquareCheck(this.xpos, this.ypos + 1, enemy, legalMoves);
					game.detect.singleSquareCheck(this.xpos, this.ypos - 1, enemy, legalMoves);
					game.detect.singleSquareCheck(this.xpos + 1, this.ypos, enemy, legalMoves);
					game.detect.singleSquareCheck(this.xpos - 1, this.ypos, enemy, legalMoves);
					game.detect.singleSquareCheck(this.xpos + 1, this.ypos - diff, enemy, legalMoves);
					game.detect.singleSquareCheck(this.xpos - 1, this.ypos - diff, enemy, legalMoves);
				break;
				case "C": // Cavalary
					if (game.detect.seeContents(this.xpos, this.ypos + 1) === 0) {
						game.detect.singleSquareCheck(this.xpos + 1, this.ypos + 2, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 1, this.ypos + 2, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 1, this.ypos + 2, enemy, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 1, this.ypos + 2, enemy, legalMoves);
						if (game.detect.seeContents(this.xpos, this.ypos + 2) === 0) {
							game.detect.singleSquareCheck(this.xpos + 1, this.ypos + 3, 0, legalMoves);
							game.detect.singleSquareCheck(this.xpos - 1, this.ypos + 3, 0, legalMoves);
							game.detect.singleSquareCheck(this.xpos + 1, this.ypos + 3, enemy, legalMoves);
						}   game.detect.singleSquareCheck(this.xpos - 1, this.ypos + 3, enemy, legalMoves);
					}
					if (game.detect.seeContents(this.xpos, this.ypos - 1) === 0) {
						game.detect.singleSquareCheck(this.xpos + 1, this.ypos - 2, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 1, this.ypos - 2, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 1, this.ypos - 2, enemy, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 1, this.ypos - 2, enemy, legalMoves);
						if (game.detect.seeContents(this.xpos, this.ypos - 2) === 0) {
							game.detect.singleSquareCheck(this.xpos + 1, this.ypos - 3, 0, legalMoves);
							game.detect.singleSquareCheck(this.xpos - 1, this.ypos - 3, 0, legalMoves);
							game.detect.singleSquareCheck(this.xpos + 1, this.ypos - 3, enemy, legalMoves);
							game.detect.singleSquareCheck(this.xpos - 1, this.ypos - 3, enemy, legalMoves);
						}
					}
					if (game.detect.seeContents(this.xpos + 1, this.ypos) === 0) {
						game.detect.singleSquareCheck(this.xpos + 2, this.ypos + 1, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 2, this.ypos - 1, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 2, this.ypos + 1, enemy, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 2, this.ypos - 1, enemy, legalMoves);
						if (game.detect.seeContents(this.xpos + 2, this.ypos) === 0) {
							game.detect.singleSquareCheck(this.xpos + 3, this.ypos + 1, 0, legalMoves);
							game.detect.singleSquareCheck(this.xpos + 3, this.ypos - 1, 0, legalMoves);
							game.detect.singleSquareCheck(this.xpos + 3, this.ypos + 1, enemy, legalMoves);
							game.detect.singleSquareCheck(this.xpos + 3, this.ypos - 1, enemy, legalMoves);
						}
					}
					if (game.detect.seeContents(this.xpos - 1, this.ypos) === 0) {
						game.detect.singleSquareCheck(this.xpos - 2, this.ypos + 1, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 2, this.ypos - 1, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 2, this.ypos + 1, enemy, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 2, this.ypos - 1, enemy, legalMoves);
						if (game.detect.seeContents(this.xpos - 2, this.ypos) === 0) {
							game.detect.singleSquareCheck(this.xpos - 3, this.ypos + 1, 0, legalMoves);
							game.detect.singleSquareCheck(this.xpos - 3, this.ypos - 1, 0, legalMoves);
							game.detect.singleSquareCheck(this.xpos - 3, this.ypos + 1, enemy, legalMoves);
							game.detect.singleSquareCheck(this.xpos - 3, this.ypos - 1, enemy, legalMoves);
						}
					}
				break;
				case "S": //Squires
					var distance = 0, pointer = [1, 0, 1, 0];
					var nudge = [[currpos[1],1], [currpos[0],1], [currpos[1],-1], [currpos[0],-1]];
					for (i = 0; i < nudge.length; i++) {
						while (distance < 2) {
							nudge[i][0] = nudge[i][0] + nudge[i][1];
							currpos[pointer[i]] = nudge[i][0];
							if (game.detect.seeContents(currpos[0], currpos[1]) === 0) {legalMoves.push([currpos[0], currpos[1]]);}
							else if (game.detect.seeContents(currpos[0], currpos[1]) === enemy) {
								legalMoves.push([currpos[0], currpos[1]]);
								break;
							}
							else break;
							distance = distance + 1;
						}
						currpos = [this.xpos, this.ypos];
						distance = 0;
					}
					var nudgec1 = [1, -1, -1, 1], nudgec0 = [1, 1, -1, -1];
					for (i = 0; i < nudgec1.length; i++) {
						while (distance < 2) {
							currpos[1] = currpos[1] + nudgec1[i];
							currpos[0] = currpos[0] + nudgec0[i];
							console.log(game.detect.seeContents(currpos[0], currpos[1]));
							if (game.detect.seeContents(currpos[0], currpos[1]) === 0) {
								console.log(game.boardnot[currpos[1]][currpos[0]] + " is a blank square");
								legalMoves.push([currpos[0], currpos[1]]);
							}
							else if (game.detect.seeContents(currpos[0], currpos[1]) === enemy) {
								legalMoves.push([currpos[0], currpos[1]]);
								break;
							}
							else break;
							distance = distance + 1;
						}
						currpos = [this.xpos, this.ypos];
						distance = 0;
					}
					// North
					if (game.detect.seeContents(this.xpos, this.ypos + 1) === 0) {
						game.detect.singleSquareCheck(this.xpos + 1, this.ypos + 2, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 1, this.ypos + 2, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 1, this.ypos + 2, enemy, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 1, this.ypos + 2, enemy, legalMoves);
					}
					// South
					if (game.detect.seeContents(this.xpos, this.ypos - 1) === 0) {
						game.detect.singleSquareCheck(this.xpos + 1, this.ypos - 2, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 1, this.ypos - 2, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 1, this.ypos - 2, enemy, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 1, this.ypos - 2, enemy, legalMoves);
					}
					// East
					if (game.detect.seeContents(this.xpos + 1, this.ypos) === 0) {
						game.detect.singleSquareCheck(this.xpos + 2, this.ypos + 1, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 2, this.ypos - 1, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 2, this.ypos + 1, enemy, legalMoves);
						game.detect.singleSquareCheck(this.xpos + 2, this.ypos - 1, enemy, legalMoves);
					}
					// West
					if (game.detect.seeContents(this.xpos - 1, this.ypos) === 0) {
						game.detect.singleSquareCheck(this.xpos - 2, this.ypos + 1, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 2, this.ypos - 1, 0, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 2, this.ypos + 1, enemy, legalMoves);
						game.detect.singleSquareCheck(this.xpos - 2, this.ypos - 1, enemy, legalMoves);
					}
				break;
				case "L": //Leapers
					var distance = 0, pointer = [1, 0, 1, 0];
					var nudge = [[currpos[1],1], [currpos[0],1], [currpos[1],-1], [currpos[0],-1]];
					for (i = 0; i < nudge.length; i++) {
						while (true) { // Move-only loop 
							nudge[i][0] = nudge[i][0] + nudge[i][1];
							currpos[pointer[i]] = nudge[i][0];
							if (game.detect.seeContents(currpos[0], currpos[1]) === 0) legalMoves.push([currpos[0], currpos[1]]);
							else if (game.detect.seeContents(currpos[0], currpos[1]) === 1 || game.detect.seeContents(currpos[0], currpos[1]) === 2) {
								for (j = 0; j < 20; j++) { // Cannon-capture loop, limit of 20 is failsafe
									nudge[i][0] = nudge[i][0] + nudge[i][1];
									currpos[pointer[i]] = nudge[i][0];
									if (game.detect.seeContents(currpos[0], currpos[1]) === enemy) {
										legalMoves.push([currpos[0], currpos[1]]);
										break;
									}
									else if (game.detect.seeContents(currpos[0], currpos[1]) === this.side) break;
									else if (game.detect.seeContents(currpos[0], currpos[1]) === 0) {}
									else break;
								}
								break;
							}
							else break;
						}
						currpos = [this.xpos, this.ypos];
						distance = 0;
					}
				break;
				default:
					console.error("Find Legal Moves: Invalid piece value given!");
			}
			return legalMoves;
		};
	}
	{ // Build the board
		var gameboard = document.getElementById("game-board"), tr, td;
		// Headers
		tr = document.createElement("tr");
		td = document.createElement("th");
		td.innerHTML = "\\";
		tr.appendChild(td);		
		for (i = 0; i < game.board[0].length; i++) {
			td = document.createElement("th");
			td.innerHTML = game.headers[0][i]
			tr.appendChild(td);
		}
		gameboard.appendChild(tr);
		// Body
		for (i = 0; i < game.board.length; i++) {
			tr = document.createElement("tr");
			td = document.createElement("th");
			td.innerHTML = game.headers[1][game.board.length - 1 - i]
			tr.appendChild(td);
			for (j = 0; j < game.board[i].length; j++) {
				td = document.createElement("td");
				td.setAttribute("id", "gb-" + game.board[game.board.length - 1 - i][j]);
				tr.appendChild(td);
			}
			gameboard.appendChild(tr);
		}
	}
	{ // Make pieces, insert them, and load the new properties into the pieces
		var insertpiece;
		for (i = 0; i < game.pieces.piecelist.length; i++) {
			td = document.getElementById("gb-" + game.board[game.pieces.piecelist[i][2]][game.pieces.piecelist[i][1]]);
			insertpiece = document.createElement("div");
			insertpiece.setAttribute("class", "chesspiece");
			insertpiece.setAttribute("id", game.pieces.piecelist[i][0]);
			insertpiece.innerHTML = game.pieces.piecelist[i][4];
			insertpiece.newpiece(game.pieces.piecelist[i][1], game.pieces.piecelist[i][2], game.pieces.piecelist[i][3], game.pieces.piecelist[i][4], game.pieces.piecelist[i][5]);
			td.appendChild(insertpiece)
		}
	}
	{ // Assign functions to buttons and such
		var time = document.getElementById("time");
		if (time.addEventListener) {time.addEventListener('click', game.time.setTimer, false);}
		else if (time.attachEvent) {time.attachEvent('onclick', game.time.setTimer);}
		var startgame = document.getElementById("startgame");
		if (startgame.addEventListener){startgame.addEventListener('click', game.time.doTimer, false);}
		else if (startgame.attachEvent){startgame.attachEvent('onclick', game.time.doTimer);}
		var endgame = document.getElementById("endgame");
		var endturn = document.getElementById("endturn");
		if (endturn.addEventListener){endturn.addEventListener('click', game.time.swapTimers, false);}
		else if (endturn.attachEvent){endturn.attachEvent('onclick', game.time.swapTimers);}
		if (endgame.addEventListener){endgame.addEventListener('click', game.time.stopCountFinal, false);}
		else if (endgame.attachEvent){endgame.attachEvent('onclick', game.time.stopCountFinal);}
		var potentialdestinations = document.getElementById("potentialdestinations");
		if (potentialdestinations.addEventListener){potentialdestinations.addEventListener('blur', game.unhighlightCell, false);}
		else if (potentialdestinations.attachEvent){potentialdestinations.attachEvent('onblur', game.unhighlightCell);}
		document.getElementById("gamelog").innerHTML = "Game " + Math.floor(Math.random() * 1000000) + ":";
		document.getElementById("rem").innerHTML = game.boredom.remPieces;
	}
}
