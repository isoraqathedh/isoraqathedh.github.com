function convertToYML() {
	var coordsMaker = /Coordinates: /;
	var anchors = /<a href="(Gazetteer_[AIQ]to[HPZ]\.html)?#[A-Z]">([^<]+)<\/a>/g;
	var anchors2 = /<a href="[^"]+">([^<]+)<\/a>/g;
	var whitespace = /\r\n|\t/g;
	var tabs = /\t\t\t/g;
	var allDTs = document.getElementsByTagName("dt");
	var allDDs = document.getElementsByTagName("dd");
	var name = "", biome = "", coords = [], etycode = "", etsource = "", descriptn = "", linkanchors = {}, linklist = [];
	for (i in allDTs) {
		if (typeof allDTs[i] !== "object") return 0;
		linklist = [];
		name = allDTs[i].innerHTML;
		biome = allDTs[i].className;
		coords = allDDs[i].getElementsByClassName("coordinates")[0].innerHTML.replace(coordsMaker, "").split(", ");
		etycode = allDDs[i].getElementsByClassName("etymology")[0].className.replace("etymology ", "");
		etsource = allDDs[i].getElementsByClassName("etymology")[0].innerHTML.replace(whitespace, "").replace(anchors2, "$1");
		descriptn = allDDs[i].getElementsByClassName("description")[0].innerHTML.replace(anchors, "[[$2]]").replace(tabs, "        ");
		document.getElementById("outExit").innerHTML += YMLtemplate(name, biome, coords, etycode, etsource, descriptn)
	}
}
function YMLtemplate(name, biome, coords, etycode, etsource, descriptn) {
var longt = coords[0].split("°"), latit = coords[1].split("°");
console.log(longt, latit);
var longitude = longt[1].match(/W/) ? "-" + longt[0] : longt[0];
var lattitude = latit[1].match(/S/) ? "-" + latit[0] : latit[0];
return "-   name: " + name + "\r\n\
    biome: " + biome + "\r\n\
    coordinates:\r\n\
        longitude: " + longitude + "\r\n\
        latitude:  " + lattitude + "\r\n\
    etymology:\r\n\
        -   type: " + etycode + "\r\n\
            origin: " + etsource + "\r\n\
            linklist: \r\n\
    description: >\r\n\
        " + descriptn + "\r\n";
}