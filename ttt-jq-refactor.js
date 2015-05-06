// wait for the DOM to finish loading
window.addEventListener("load",function () {
  //boxes = document.querySelectorAll("#board .box");
  $boxes = $("#board .box");
  
  //add event listeners for each box on the board
  //  for (i=0;i<$boxes.length;i++) {
  //  	//each click calls doMove function, O always goes first
  // 	$boxes[i].addEventListener("click",doMove);
  // }

  //$boxes.bind("click",doMove);
  $boxes.click(doMove);

  //add event listener for reset button
  reset = document.querySelector(".reset");
  reset.addEventListener("click", resetBoard);

//  moveText = document.querySelector("h2");
//  moveText.innerText = "O, it's your turn. Place your move.";

  $turnText = $("h2").text("Game begins! O, it's your turn.");

});

var moves = [];
var lastMove = 0;

function doMove() {
	//lets make sure we know the box number thats being clicked
	boxNum = getIndex($boxes,this);

	if (notTaken(boxNum)) {
		lastMove % 2 === 0 ? o(boxNum) : x(boxNum) ;
		lastMove = lastMove + 1;
		//console.log(this);
		console.log("just placed move number "+lastMove+" in box " + boxNum);
	} else {
		console.log("can't move there, already taken");
	}
}

// function doMove() {
// 	boxNum = getIndex($boxes,this);
	
// }

// function resetBoard(){
// 	for (i=0;i<$boxes.length;i++) {
//   		$boxes[i].innerText = "";
//   		$boxes[i].style.backgroundColor = "";
//   		moves = [];
//   	}
//   	console.log("game board was just reset!  let the scheming begin!")
// }

function resetBoard() {
	$boxes.text("").css("background-color","");
	$boxes.removeClass("omove xmove");
	console.log("game board was just reset!  let the scheming begin!")
	moves = [];
}

function getIndex (arr, object) {
	for (i=0;i<arr.length;i++) {
		//console.log(typeof(object));
		if (arr[i] === object) {
			return i;
		}
	}
}

function x(index) {
	$boxes.eq(index).addClass("xmove");
	$boxes.eq(index).text("x");
	$turnText.text("O, You know what you've got to do.");

	moves[index] = 'X';
	var winningSet = haveWinner();
	if (winningSet) {finishGame("X",winningSet);}
}

function o(index) {
	$boxes.eq(index).addClass("omove");
	$boxes.eq(index).text("O");
	$turnText.text("X, Give them blood and vinegar!");

	moves[index] = 'O';
	var winningSet = haveWinner();
	if (winningSet) {finishGame("O",winningSet);}
}

function finishGame(player, set) {
	//lets color the winning set
	for (i=0;i<3;i++) {
		$boxes.eq(set[i]).css("backgroundColor","rgb(237, 144, 21)");
	}

	//winning message
	moveText = document.querySelector("h2");
  	moveText.innerText = player + " just laid the smackdown!!";
  	console.log(player + " just wiped the floor with their opponent.");
  	$boxes.off("click",doMove);
}

function haveWinner() {
	//three horizontal
	if (threeInRow(0,1,2)) {return '012';}
	if (threeInRow(3,4,5)) {return '345';}
	if (threeInRow(6,7,8)) {return '678';}

	//three vertical
	if (threeInRow(0,3,6)) {return '036';}
	if (threeInRow(1,4,7)) {return '147';}
	if (threeInRow(2,5,8)) {return '258';}

	//two diagonal
	if (threeInRow(0,4,8)) {return '048';}
	if (threeInRow(2,4,6)) {return '246';}

	return false;
}

function threeInRow(one, two, three) {

	if (moves[one] === moves[two] && moves[two] === moves[three] && moves[one] !== undefined ) {
		return true;
	} else {
		return false;
	}
}

function notTaken (num) {
	if ($boxes.eq(num).hasClass('omove') || $boxes.eq(num).hasClass('xmove')) {
		return false;
	} else {
		return true;
	}
}