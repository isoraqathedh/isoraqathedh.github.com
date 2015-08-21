window.onload = function() {
	var flashcards = document.getElementsByClassName("flashcard");
	for (i = 0; i < flashcards.length; i++) {
		flashcards[i].addEventListener('click', revealit, false);
		//flashcards[i].attachEvent('onclick', revealit);
	}
}
function revealit() {
	var progen = this.childNodes[3], antgen = this.childNodes[1];
	if (progen.className !== "answer revealed") {
		progen.className = "answer revealed";
		antgen.className = "question shrunk";
	}
	else {
		progen.className = "answer concealed";
		antgen.className = "question regrown";
		var t = setTimeout('removeConcealed()', 3600);
		// var u = setTimeout('removeConcealedBeta(progen, antgen)', 3600);
		// var v = setTimeout('removeConcealedGamma()', 3600);
	}
}
function removeConcealed() {
	var flashcards = document.getElementsByClassName("concealed");
	for (i = 0; i < flashcards.length; i++) {flashcards[i].className = "answer"}
	flashcards = document.getElementsByClassName("regrown");
	for (i = 0; i < flashcards.length; i++) {flashcards[i].className = "question"}
}
function removeConcealedBeta(x, y) {
	x.className = "answer";
	y.className = "question";
}
function removeConcealedGamma() {
	this.childNodes[3].className = "answer";
	this.childNodes[1].className = "question";
}