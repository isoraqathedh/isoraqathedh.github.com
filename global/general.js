function show(x) {
	var element = document.getElementById("spoiler" + x);
	element.setAttribute("class", "spoileropen"); //For Most Browsers
	element.setAttribute("className", "spoileropen"); //For IE; harmless to other browsers.
}
function hide(x) {
	var element = document.getElementById("spoiler" + x);
	element.setAttribute("class", "");
	element.setAttribute("className", ""); 
}
function slct(x) {
	document.getElementById(x).focus();
    document.getElementById(x).select();
}
function fall(direc, ind) {
	if (direc) {
		document.getElementById("fallback" + ind).style.display="";
		document.getElementById("general" + ind).style.display="none";
	}
	else {
		document.getElementById("fallback" + ind).style.display="none";
		document.getElementById("general" + ind).style.display="";
	}
}
function high(x) {document.getElementById("high" + x).setAttribute("class", "high");}
function hoff(x) {document.getElementById("high" + x).setAttribute("class", "");}
function getThis(x) {return document.getElementById(x);}
function getThisInner(x) {return document.getElementById(x).innerHTML;}