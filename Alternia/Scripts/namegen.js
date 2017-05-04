var alterniaNames = {
	"params": {
		"elements": {
			"V": [
				["a", "e", "i", "o", "u", "ae", "ee", "ij", "ou", "vu"], // orthography
				[160,  90, 160, 150, 140,   50,   70,   50,  100,   30], // weighting
				["ɑ", "ɛ", "i", "ɔ", "ʊ", "ɑː", "ɛː", "iː", "ɔː", "ʊː"]  // pronounciation
			],
			"VForW": [
				["a", "e", "i", "o", "ae", "ee", "ij", "ou"],
				[160,  90, 160, 150,  120,   95,  125,  100],
				["ɑ", "ɛ", "i", "ɔ", "ɑː", "ɛː", "iː", "ɔː"]
			],
			"VForY": [
				["a", "e", "o", "u", "ae", "ee", "ou", "vu"],
				[160,  90, 100, 140,  150,  150,  100,  110],
				["ɑ", "ɛ", "ɔ", "ʊ", "ɑː", "ɛː", "ɔː", "ʊː"]
			],
			"A": [["y", "w"], [550, 450], ["j", "w"]],
			"P": [
				["p", "t", "k", "b", "d", "g", "h", "m", "n"],
				[122, 116, 122, 111, 108, 111,  70, 120, 120],
				["p", "t", "k", "b", "d", "g", "h", "m", "n"]
			],
			"PFinal": [
				["p", "t", "k", "b", "d", "g", "m", "n"],
				[122, 116, 127, 111, 108, 116, 150, 150],
				["p", "t", "k", "b", "d", "g", "m", "n"]
			],
			"L": [
				["pp", "tt", "kk", "bb", "dd", "gg"],
				[ 185,  170,  185,  155,  140,  165],
				["pʰ", "tʰ", "kʰ", "bʷ", "dʷ", "gʷ"]
			], 
			"F": [
				["th", "f", "s", "x", "ss"],
				[ 180, 240, 260, 140,  180],
				[ "θ", "f", "s", "x",  "ʃ"]
			],
			"R": [
				["ll", "l", "r", "rr"],
				[ 180, 320, 180,  320],
				[ "ɾ", "l", "ɹ",  "r"]
			],
			"RC": [["r", "rr"], [650, 350], ["ɹ", "r"]],
			"frontGlide": [["i"], [1000], ["i̯"]],
			"backGlide": [["w"], [1000], ["u̯"]]
		},
		"probabilities": {
			"onset": [
				[ 300, 150,  25,  25,  90,  60,  90,  60,  100,  100], // unrestricted
				[ 300, 200,   0,   0, 150,   0, 150,   0,  200,    0], // two-pairs restricted
				[1000,   0,   0,   0,   0,   0,   0,   0,    0,    0]  // only ø allowed
			],
			"nucleus": [200, 600, 200],
			"coda": [500, 200, 200, 100, 100]
		},
		"spellingChanges": [
			[/^kk/, "kh"], [/^gg/, "qu"], [/^pp/, "ph"], [/^bb/, "bw"], [/^tt/, "tj"], [/^dd/, "dw"],
			[/kk$/, "c"], [/x$/, "ch"], 
			[/kk([tdkgpbrles])\1/g, "kh$1$1"], [/gg([tdkgpbrles])\1/g, "gu$1$1"],
			[/tt([tdkgpbrles])\1/g, "tj$1$1"], [/dd([tdkgpbrles])\1/g, "du$1$1"],
			[/pp([tdkgpbrles])\1/g, "ph$1$1"], [/bb([tdkgpbrles])\1/g, "bu$1$1"],
			[/rr([tdkgpbrles])\1/g, "rh$1$1"], [/ll([tdkgpbrles])\1/g, "lj$1$1"],
			[/ss([tdkgpbrles])\1/g, "sz$1$1"], 
			[/eekk/g, "eekh"], [/eegg/g, "eegu"], [/eett/g, "eetj"], [/eedd/g, "eedu"],
			[/eepp/g, "eeph"], [/eebb/g, "eebu"], [/eerr/g, "eerh"], [/eell/g, "eelj"],
			[/tsss/g, "cchs"], [/dsss/g, "djs"], [/tss([^s])/g, "cch$1"], [/dss([^s])/g, "dj$1"],
			[/tss$/, "cch"], [/dss$/, "dj"],
			[/^(p|t|k|ph|tj|kh|b|d|g|bw|dw|qu|h|m|n)ss/, "$1sc"],
			[/([tdkgpblreus])\1\1\1?/g, "$1$1"],
			[/h(rr?|ll?)/g, "$1", 0.75]
		],
	},
	"state": {
		"syllableCount": 0,
		"moraCount": 0,
		"word": "",
		"wordRaw": [],
		"pronounce": "",
		"delimiter": "-",
		"restrict": 0,
		"seed": []
	},
	"chokeSettings": {
		"onset": {
			"activated": false,
			"scope": false, // false for first only, true for all
			"requiredPhonemes": [0, 0],
			"requiredStructure": ["", ""]
		},
		"nucleus": {
			"activated": false,
			"scope": false, // false for last only, true for all
			"requiredPhonemes": [0, 0],
			"requiredStructure": ["", ""]
		},
		"coda": {
			"activated": false,
			"scope": false, // false for last only, true for all
			"requiredPhonemes": [0, 0],
			"requiredStructure": ["", ""]
		}
	},
	make: {
		syllables: function() { // main function
			var result = "", delimiter = alterniaNames.make.getDelimiter(), rowCount = [0, 0];
			if (document.getElementById("exactSyllMgmt").checked) {
				var exactCount = +document.getElementById("syllCount").value;
				rowCount = [exactCount, exactCount];
			}
			else if (document.getElementById("rangeSyllMgmt").checked) 
				rowCount = [+document.getElementById("rangeSyllCountMin").value, +document.getElementById("rangeSyllCountMax").value];
			alterniaNames.make.clear();
			alterniaNames.make.populateSettings();
			alterniaNames.make.rows(rowCount);
			var syllableGenerated = []
			for (i in document.getElementById("workingmain").getElementsByTagName("tr")) {
				syllableGenerated.push(alterniaNames.make.selectSyllables(
					document.getElementById("workingmain").getElementsByTagName("tr")[i]
				));
			}
			if (syllableGenerated.length === 5 && syllableGenerated[0].match(/^(a|e|i|o|u|ae|ee|ij|ou|vu)$/)) {
				alterniaNames.make.rows([0, 0]);
				for (i in document.getElementById("workingmain").getElementsByTagName("tr")){
					alterniaNames.make.selectSyllables(
						document.getElementById("workingmain").getElementsByTagName("tr")[i]
					);
				}
			}
			alterniaNames.state.word = alterniaNames.make.spelling(
				alterniaNames.make.delimit(alterniaNames.state.wordRaw, delimiter)
			);
			alterniaNames.make.write();
			return result;
		},
		"populateSettings": function() {
			// Set .[location].activated
			alterniaNames.chokeSettings.onset.activated = document.getElementById("switchAllitMgmt").checked;
			alterniaNames.chokeSettings.nucleus.activated = document.getElementById("switchNucleusMgmt").checked;
			alterniaNames.chokeSettings.coda.activated = document.getElementById("switchCodaMgmt").checked;
			// Then get the right scope
			alterniaNames.chokeSettings.onset.scope = document.getElementById("allAllitMgmt").checked;
			alterniaNames.chokeSettings.nucleus.scope = document.getElementById("allNucleusMgmt").checked;
			alterniaNames.chokeSettings.coda.scope = document.getElementById("allCodaMgmt").checked;
			// Then get the correct structure
			// - Onset
			if (document.getElementById("allitMgmt0").checked) {
				alterniaNames.chokeSettings.onset.requiredStructure = ["", ""];
				alterniaNames.chokeSettings.onset.requiredPhonemes = [-1, -1];
			}
			else if (document.getElementById("allitMgmtP").checked) {
				alterniaNames.chokeSettings.onset.requiredStructure[0] = "P";
				alterniaNames.chokeSettings.onset.requiredPhonemes[0] = alternia.params.elements.P[0].indexOf(
					document.getElementById("allitMgmtPSel").value // first menu
				);
				var selectedSecond = document.getElementById("allitMgmtPFRSel").value; // second menu
				var inF = alterniaNames.params.elements.F[0].indexOf(selectedSecond);
				var inR = alterniaNames.params.elements.R[0].indexOf(selectedSecond);
				if ((inF === -1) && (inR === -1)) {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = "";
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = -1;
				}
				else if ((inF !== -1) && (inR === -1))  {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = "F";
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = inF;
				}
				else if ((inF === -1) && (inR !== -1)) {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = "R";
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = inR;
				}
				else return console.error("Error: inF and inR are both not -1!");
			}
			else if (document.getElementById("allitMgmtL").checked) {
				alterniaNames.chokeSettings.onset.requiredStructure[0] = "L";
				alterniaNames.chokeSettings.onset.requiredPhonemes[0] = alterniaNames.params.elements.L[0].indexOf(
					document.getElementById("allitMgmtLSel").value // first menu
				);
				var selectedSecond = document.getElementById("allitMgmtLRSel").value; // second menu
				var inR = alterniaNames.params.elements.R[0].indexOf(selectedSecond);
				if (!(inR === -1)) {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = "R";
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = inR;
				}
				else {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = "";
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = -1;
				}
			}
			else if (document.getElementById("allitMgmtF").checked) {
				alterniaNames.chokeSettings.onset.requiredStructure[0] = "F";
				alterniaNames.chokeSettings.onset.requiredPhonemes[0] = alterniaNames.params.elements.F[0].indexOf(
					document.getElementById("allitMgmtFSel").value // first menu
				);
				var selectedSecond = document.getElementById("allitMgmtFRSel").value; // second menu
				var inR = alterniaNames.params.elements.R[0].indexOf(selectedSecond);
				if (inR !== -1) {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = "R";
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = inR;
				}
				else {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = "";
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = -1;
				}
			}
			else if (document.getElementById("allitMgmtA").checked) {
				alterniaNames.chokeSettings.onset.requiredStructure[0] = "A";
				alterniaNames.chokeSettings.onset.requiredPhonemes[0] = alterniaNames.params.elements.A[0].indexOf(
					document.getElementById("allitMgmtASel").value // first menu
				);
				var selectedSecond = document.getElementById("allitMgmtARSel").value; // second menu
				var inR = alterniaNames.params.elements.RC[0].indexOf(selectedSecond);
				if (inR !== -1) {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = "RC";
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = inR;
				}
				else {
					alterniaNames.chokeSettings.onset.requiredStructure[1] = -1;
					alterniaNames.chokeSettings.onset.requiredPhonemes[1] = -1;
				}
			}
			else return console.error("Nothing clicked!");
			// - Nucleus
			if (document.getElementById("nucleusMgmtV").checked) {
				alterniaNames.chokeSettings.nucleus.requiredStructure[0] = "V";
				alterniaNames.chokeSettings.nucleus.requiredPhonemes[0] = alterniaNames.params.elements.V[0].indexOf(
					document.getElementById("rhymeMgmtVSel").value
				);
			}
			else if (document.getElementById("nucleusMgmtyV").checked) {
				alterniaNames.chokeSettings.nucleus.requiredStructure = ["frontGlide", "V"]
				alterniaNames.chokeSettings.nucleus.requiredPhonemes = [
					0,
					alterniaNames.params.elements.V[0].indexOf(document.getElementById("rhymeMgmtyVSel").value)
				];
			}
			else if (document.getElementById("nucleusMgmtVw").checked) {
				alterniaNames.chokeSettings.nucleus.requiredStructure = ["V", "backGlide"];
				alterniaNames.chokeSettings.nucleus.requiredPhonemes = [
					alterniaNames.params.elements.V[0].indexOf(document.getElementById("rhymeMgmtVwSel").value),
					0
				];
			}
			else return console.error("Nothing clicked!");
			// - Coda
			if (document.getElementById("zeroCodaMgmt").checked){
				alterniaNames.chokeSettings.coda.requiredPhonemes = [-1, -1];
				alterniaNames.chokeSettings.coda.requiredStructure = ["", ""];
			}
			else if (document.getElementById("codaMgmtP").checked) {
				alterniaNames.chokeSettings.coda.requiredStructure[0] = "P";
				alterniaNames.chokeSettings.coda.requiredPhonemes[0] = alterniaNames.params.elements.P[0].indexOf(
					document.getElementById("codaMgmtPSel").value // first menu
				);
				var selectedSecond = document.getElementById("codaMgmtPFSel").value; // second menu
				var inF = alterniaNames.params.elements.F[0].indexOf(selectedSecond);
				if (alterniaNames.params.elements.F[0].indexOf(selectedSecond) !== -1) {
					alterniaNames.chokeSettings.coda.requiredStructure[1] = "F";
					alterniaNames.chokeSettings.coda.requiredPhonemes[1] = inF;
				}
				else {
					alterniaNames.chokeSettings.coda.requiredStructure[1] = "";
					alterniaNames.chokeSettings.coda.requiredPhonemes[1] = -1;
				}
			}
			else if (document.getElementById("codaMgmtLF").checked) {
				alterniaNames.chokeSettings.coda.requiredStructure[1] = "";
				alterniaNames.chokeSettings.coda.requiredPhonemes[1] = -1;
				var selectedSecond = document.getElementById("codaMgmtLFSel").value,
				inL = alterniaNames.params.elements.L[0].indexOf(selectedSecond),
				inF = alterniaNames.params.elements.F[0].indexOf(selectedSecond);
				if ((inF === -1) && (inL === -1)) {
					alterniaNames.chokeSettings.coda.requiredStructure[0] = "";
					alterniaNames.chokeSettings.coda.requiredPhonemes[0] = -1;
				}
				else if ((inF !== -1) && (inL === -1))  {
					alterniaNames.chokeSettings.coda.requiredStructure[0] = "F";
					alterniaNames.chokeSettings.coda.requiredPhonemes[0] = inF;
				}
				else if ((inF === -1) && (inL !== -1)) {
					alterniaNames.chokeSettings.coda.requiredStructure[0] = "L";
					alterniaNames.chokeSettings.coda.requiredPhonemes[0] = inL;
				}
				else return console.error("Error: inF and inL are both not -1!");
			}
			alterniaNames.make.writeIdealSyllable();
			return [
				[
					alterniaNames.chokeSettings.onset.requiredPhonemes,
					alterniaNames.chokeSettings.onset.requiredStructure
				],
				[
					alterniaNames.chokeSettings.nucleus.requiredPhonemes,
					alterniaNames.chokeSettings.nucleus.requiredStructure
				],
				[
					alterniaNames.chokeSettings.coda.requiredPhonemes,
					alterniaNames.chokeSettings.coda.requiredStructure
				]
			];
		},
		"writeIdealSyllable": function() {
			// activity
			if (alterniaNames.chokeSettings.onset.activated) {
				if (alterniaNames.chokeSettings.onset.scope) 
					document.getElementById("scopeIndicOnset").innerHTML = "All syllables";
				else document.getElementById("scopeIndicOnset").innerHTML = "First syllable";
			}
			else document.getElementById("scopeIndicOnset").innerHTML = "Inactive";  
			if (alterniaNames.chokeSettings.nucleus.activated) {
				if (alterniaNames.chokeSettings.nucleus.scope) 
					document.getElementById("scopeIndicNclus").innerHTML = "All syllables";
				else document.getElementById("scopeIndicNclus").innerHTML = "Last syllable";
			}
			else document.getElementById("scopeIndicNclus").innerHTML = "Inactive"; 
			if (alterniaNames.chokeSettings.coda.activated) {
				if (alterniaNames.chokeSettings.coda.scope) 
					document.getElementById("scopeIndicCodae").innerHTML = "All syllables";
				else document.getElementById("scopeIndicCodae").innerHTML = "Last syllable";
			}
			else document.getElementById("scopeIndicCodae").innerHTML = "Inactive";
			// components
			// - onset
			var ape = alterniaNames.params.elements, ac = alterniaNames.chokeSettings;
			if (ac.onset.requiredStructure[0]) setCell(
				"slotOnset1",
				ape[ac.onset.requiredStructure[0]][0][ac.onset.requiredPhonemes[0]],
				ape[ac.onset.requiredStructure[0]][2][ac.onset.requiredPhonemes[0]],
				0
			);
			else setCell("slotOnset1", "Ø", "Ø", 0);
			if (ac.onset.requiredPhonemes[1] !== -1) setCell(
				"slotOnset2",
				ape[ac.onset.requiredStructure[1]][0][ac.onset.requiredPhonemes[1]],
				ape[ac.onset.requiredStructure[1]][2][ac.onset.requiredPhonemes[1]],
				ac.onset.requiredStructure[1] === "F" ? 1 : 0
			);
			else setCell("slotOnset2", "Ø", "Ø", 0);
			// - nucleus
			if (ac.nucleus.requiredStructure[1] === "V") {
				setCell(
					"slotNclusV",
					ape.V[0][ac.nucleus.requiredPhonemes[1]],
					ape.V[2][ac.nucleus.requiredPhonemes[1]],
					ape.V[2][ac.nucleus.requiredPhonemes[1]].match(/ː/) ? 2 : 1
				);
				setCell("slotNclusY", ape.frontGlide[0][0], ape.frontGlide[2][0], 0);
				setCell("slotNclusW", "", "Ø", 0);
			}
			else {
				setCell(
					"slotNclusV",
					ape.V[0][ac.nucleus.requiredPhonemes[0]],
					ape.V[2][ac.nucleus.requiredPhonemes[0]],
					ape.V[2][ac.nucleus.requiredPhonemes[0]].match(/ː/) ? 2 : 1
				);
				if (ac.nucleus.requiredStructure[1] === "backGlide") {
					setCell("slotNclusW", ape.backGlide[0][0], ape.backGlide[2][0], 0);
					setCell("slotNclusY", "", "Ø", 0);
				}
			}
			// - coda
			if (ac.coda.requiredStructure[0]) setCell(
				"slotCodae1",
				ape[ac.coda.requiredStructure[0]][0][ac.coda.requiredPhonemes[0]],
				ape[ac.coda.requiredStructure[0]][2][ac.coda.requiredPhonemes[0]],
				0
			);
			else setCell("slotCodae1", "Ø", "Ø", 0);;
			if (ac.coda.requiredPhonemes[1] !== -1) setCell(
				"slotCodae2",
				ape[ac.coda.requiredStructure[1]][0][ac.coda.requiredPhonemes[1]],
				ape[ac.coda.requiredStructure[1]][2][ac.coda.requiredPhonemes[1]],
				ac.coda.requiredStructure[1] === "F" ? 1 : 0
			);
			else setCell("slotCodae2", "Ø", "Ø", 0);
			return true;
			function setCell(cell, orthography, pronunciation, mora) {
				document.getElementById(cell).innerHTML = orthography;
				document.getElementById(cell).setAttribute("data-pronunciation", pronunciation);
				document.getElementById(cell).setAttribute("data-moraCount", mora);
				return document.getElementById(cell);
			}
		},
		"write": function() {
			document.getElementById("output").innerHTML = alterniaNames.state.word;
			while (alterniaNames.state.seed[0]) {
				var toAnalyze = alterniaNames.state.seed.shift(), color = "", toMake = document.createElement("span");
				toMake.appendChild(document.createTextNode(toAnalyze[0]));
				toMake.setAttribute("class", "seed" + toAnalyze[1]);
				document.getElementById("seed").appendChild(toMake);
				document.getElementById("seed").appendChild(document.createTextNode(", "));
			}
			pronounceFinal = alterniaNames.make.accent(alterniaNames.state.pronounce);
			document.getElementById("seed").innerHTML = document.getElementById("seed").innerHTML.substring(0, document.getElementById("seed").innerHTML.length - 2);
			document.getElementById("pronounce").innerHTML = "/" + pronounceFinal.substring(0, pronounceFinal.length - 1) + "/";
			document.getElementById("syllableCountOut").innerHTML = alterniaNames.state.syllableCount;
			document.getElementById("moraCountOut").innerHTML = alterniaNames.state.moraCount;
			document.getElementById("characterCountOut").innerHTML = alterniaNames.state.word.length;
			alterniaNames.make.calculateWordBMI();
			alterniaNames.make.recordInHistory();
			return true; //⻏阝⻏
		},
		"recordInHistory": function() {
			var textArea = document.getElementById("history");
			textArea.appendChild(document.createTextNode(alterniaNames.state.word));
			if (document.getElementById("recordPron").checked) 
				textArea.appendChild(document.createTextNode(" " + document.getElementById("pronounce").innerHTML));
			if (
				document.getElementById("recordLtrCount").checked ||
				document.getElementById("recordSyllCount").checked ||
				document.getElementById("recordMoraCount").checked ||
				document.getElementById("recordRhymes").checked
			) {
				var appendString = "", rhymeString = "";
				textArea.appendChild(document.createTextNode(" ("));
				if (document.getElementById("recordLtrCount").checked)
					appendString += "L: " + alterniaNames.state.word.length + "; ";
				if (document.getElementById("recordSyllCount").checked) 
					appendString += "S: " + alterniaNames.state.syllableCount + "; ";
				if (document.getElementById("recordMoraCount").checked) 
					appendString += "M: " + alterniaNames.state.moraCount + "; ";
				if (document.getElementById("recordRhymes").checked) {
					if (alterniaNames.chokeSettings.onset.activated) {
						rhymeString += "Ro=";
						rhymeString += document.getElementById("slotOnset1").innerHTML;
						rhymeString += (document.getElementById("slotOnset2").innerHTML === "Ø" ? "" : document.getElementById("slotOnset2").innerHTML);
						rhymeString += document.getElementById("scopeIndicOnset").innerHTML === "All syllables" ? "!" : "";
					}
					else {rhymeString += "Ro=0";}
					rhymeString += " ";
					if (alterniaNames.chokeSettings.nucleus.activated) {
						rhymeString += "Rn=";
						rhymeString += document.getElementById("slotNclusY").innerHTML;
						rhymeString += document.getElementById("slotOnsetV").innerHTML;
						rhymeString += document.getElementById("slotOnsetW").innerHTML;
						rhymeString += document.getElementById("scopeIndicNclus").innerHTML === "All syllables" ? "!" : "";
					}
					else {rhymeString += "Rn=0";}
					rhymeString += " ";
					if (alterniaNames.chokeSettings.coda.activated) {
						rhymeString += "Rc=";
						rhymeString += document.getElementById("slotCodae1").innerHTML;
						rhymeString += (document.getElementById("slotCodae2").innerHTML === "Ø" ? "" : document.getElementById("slotCodae2").innerHTML);
						rhymeString += document.getElementById("scopeIndicCodae").innerHTML === "All syllables" ? "!" : "";
					}
					else {rhymeString += "Rc=0";}
					rhymeString += "; ";
					appendString += rhymeString;
				}
				appendString = appendString.substring(0, appendString.length - 2)
				textArea.appendChild(document.createTextNode(appendString));
				textArea.appendChild(document.createTextNode(")"));
			}
			textArea.appendChild(document.createTextNode(getHistoryDelim()));
			function getHistoryDelim() {
				if         (document.getElementById("rcdDlmNwlne").checked) return "\r\n";
				else if    (document.getElementById("rcdDlmComma").checked) return ", ";
				else if    (document.getElementById("rcdDlmSmcln").checked) return "; ";
				else if    (document.getElementById("rcdDlmXtabX").checked) return "\t";
				else if    (document.getElementById("rcdDlmRnblt").checked) return "\r\n* ";
				else return document.getElementById("rcdDlmCstIn").value;
			}
		},
		"getDelimiter": function() {
			if (document.getElementById("nohyphens").checked) return "";
			else if (document.getElementById("minushyphens").checked) return "-";
			else if (document.getElementById("dothyphens").checked) return "·";
		},
		"redraw": function() {
			var delimiter = alterniaNames.make.getDelimiter();
			alterniaNames.state.word = alterniaNames.make.spelling(alterniaNames.make.delimit(alterniaNames.state.wordRaw, delimiter));
			document.getElementById("output").innerHTML = alterniaNames.state.word;
			document.getElementById("characterCountOut").innerHTML = alterniaNames.state.word.length;
			alterniaNames.make.calculateWordBMI();
		},
		"calculateWordBMI": function() {
			if (alterniaNames.state.word.length >= 18) {
				if (alterniaNames.state.word.length >= 26) {
					if (alterniaNames.state.word.length >= 34) document.getElementById("characterCountOut").setAttribute("class", "morbidlyObese");
					else document.getElementById("characterCountOut").setAttribute("class", "overweight");
				}
				else document.getElementById("characterCountOut").setAttribute("class", "quiteBig");
			}
			if (alterniaNames.state.moraCount >= 8) {
				if (alterniaNames.state.moraCount >= 12) {
					if (alterniaNames.state.moraCount >= 16) document.getElementById("moraCountOut").setAttribute("class", "morbidlyObese");
					else document.getElementById("moraCountOut").setAttribute("class", "overweight");
				}
				else document.getElementById("moraCountOut").setAttribute("class", "quiteBig");
			}
			if (alterniaNames.state.syllableCount >= 5) {
				if (alterniaNames.state.syllableCount >= 7) {
					if (alterniaNames.state.syllableCount >= 9) document.getElementById("syllableCountOut").setAttribute("class", "morbidlyObese");
					else document.getElementById("syllableCountOut").setAttribute("class", "overweight");
				}
				else document.getElementById("syllableCountOut").setAttribute("class", "quiteBig");
			}
			return true;
		},
		"logRandom": function(callId) {
			var value = Math.random();
			alterniaNames.state.seed.push([Math.round(value*10000)/10000, callId]);
			return value;
		},
		"phoneme": function(list) {
			var finalValue = ["", ""], toAnalyze = [];
			for (i in arguments) {
				toAnalyze = actuallySelect(arguments[i]);
				finalValue[0] += toAnalyze[0];
				finalValue[1] += toAnalyze[1];
			}
			return finalValue;
			function actuallySelect(item) {
				var inArr = alterniaNames.params.elements[item], toRetrieve = Math.floor(alterniaNames.make.logRandom("phn" + item) * 1000), i = -1;
				do {
					i++;
					toRetrieve -= inArr[1][i]
				} while (toRetrieve > 0)
				return [inArr[0][i], inArr[2][i]];
			}
		},
		"row": function() {
			var thisRow = document.createElement("tr"), thisHeader = document.createElement("th");
			alterniaNames.state.syllableCount++;
			
			thisHeader.appendChild(document.createTextNode(alterniaNames.state.syllableCount));
			thisRow.appendChild(thisHeader);
			
			thisRow.appendChild(makeCell(["Ø", "Ø"], 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("P"/* */), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("P", "F"), 1));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("P", "R"), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("L"/* */), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("L", "R"), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("F"/* */), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("F", "R"), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("A"/* */), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("A", "RC"),0));
			
			var vowels = [alterniaNames.make.phoneme("frontGlide", "VForY"), alterniaNames.make.phoneme("V"), alterniaNames.make.phoneme("VForW", "backGlide")];
			for (i in vowels) 
				thisRow.appendChild(makeCell(vowels[i], (vowels[i][1].match(/ː/) ? 2 : 1)));
			
			thisRow.appendChild(makeCell(["Ø", "Ø"], 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("PFinal"/* */), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("PFinal", "F"), 1));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("L"/*      */), 0));
			thisRow.appendChild(makeCell(alterniaNames.make.phoneme("F"/*      */), 0));
			
			document.getElementById("workingmain").appendChild(thisRow);
			return 0;
			
			function makeCell(contents, moraCount) { // [ORTHOGRAPHY, PRONUNCIATION]
				var element = document.createElement("td");
				element.appendChild(document.createTextNode(contents[0]));
				element.setAttribute("data-pronunciation", contents[1]);
				element.setAttribute("data-moraCount", moraCount);
				return element;
			}
		},
		"rows": function(rowCount) {
			if (rowCount[0] === 0 && rowCount[1] === 0) {
				var i = 0;
				do {
					i++;
					alterniaNames.make.row();
				} while (alterniaNames.make.logRandom("rows") < Math.pow(0.64,i) && i < 100)
			}
			else {
				var j = 0;
				for (j = 0; j < rowCount[0]; j++) {
					alterniaNames.make.row();
				}
				if (rowCount[1] > rowCount[0]) { // equal? Use exact count. FROM bigger than TO? Use exact FROM.
					j = 0;
					do {
						j++;
						alterniaNames.make.row();
					} while (alterniaNames.make.logRandom("rows") < Math.pow(0.64,j) && j < (rowCount[1] - rowCount[0]))
				}
			}
			return i;
		},
		"selectSyllables": function(row) {
			if (typeof row !== "object" || row.getElementsByTagName("th").length > 1) return "";
			var theChosen = Math.floor(alterniaNames.make.logRandom("selSyll") * 1000);
			var i = -1, output = "", pronOut = "", moraOut = 0, restrict = alterniaNames.state.restrict;
			//console.log(row, syllableNum);
			/* onset */
			if (//false &&
				alterniaNames.chokeSettings.onset.activated &&
				(alterniaNames.chokeSettings.onset.scope || +row.getElementsByTagName("th")[0].innerHTML === 1)
			) {
				output += document.getElementById("slotOnset1").innerHTML + document.getElementById("slotOnset2").innerHTML;
				pronOut += document.getElementById("slotOnset1").getAttribute("data-pronunciation") + document.getElementById("slotOnset2").getAttribute("data-pronunciation");
				moraOut += parseInt(document.getElementById("slotOnset1").getAttribute("data-moraCount")) + parseInt(document.getElementById("slotOnset2").getAttribute("data-moraCount"));
				// wipe the entire line of onsets
				for (jk = 0; jk < 10; jk++) {
					row.getElementsByTagName("td")[jk].setAttribute("class", "failedPhoneme");
				}
			}
			else {
				if (!(document.getElementById("simpleCons").checked)) restrict = 0; // kill restrict
				do {
					i++;
					theChosen -= alterniaNames.params.probabilities.onset[restrict][i]; // get restrict
					if (alterniaNames.params.probabilities.onset[restrict][i] === 0) 
						row.getElementsByTagName("td")[i].setAttribute("class", "failedPhoneme");
				} while (theChosen > 0)
				result = row.getElementsByTagName("td")[i];
				result.setAttribute("class", "selectedPhoneme");
				output += result.innerHTML;
				pronOut += result.getAttribute("data-pronunciation");
				moraOut += +result.getAttribute("data-moraCount");
				do {
					i++;
					if (alterniaNames.params.probabilities.onset[restrict][i] === 0) 
						row.getElementsByTagName("td")[i].setAttribute("class", "failedPhoneme");
				} while (row.getElementsByTagName("td")[i]) // red out the remaining syllables
				restrict = 0;
			}
			/* nucleus */
			if ( //false &&
				alterniaNames.chokeSettings.nucleus.activated &&
				(
					alterniaNames.chokeSettings.nucleus.scope ||
					+row.getElementsByTagName("th")[0].innerHTML === document.getElementById("workingmain").getElementsByTagName("tr").length
				)
			) {
				output += document.getElementById("slotNclusY").innerHTML + document.getElementById("slotNclusV").innerHTML + document.getElementById("slotNclusW").innerHTML;
				pronOut += document.getElementById("slotNclusY").getAttribute("data-pronunciation") + document.getElementById("slotNclusV").getAttribute("data-pronunciation") + document.getElementById("slotNclusW").getAttribute("data-pronunciation");
				moraOut += parseInt(document.getElementById("slotNclusY").getAttribute("data-moraCount")) + parseInt(document.getElementById("slotNclusV").getAttribute("data-moraCount")) + parseInt(document.getElementById("slotNclusW").getAttribute("data-moraCount"));
				// wipe the entire line of nuclei
				for (jk = 10; jk < 13; jk++) {
					row.getElementsByTagName("td")[jk].setAttribute("class", "failedPhoneme");
				}
			}
			else {
				theChosen = Math.floor(alterniaNames.make.logRandom("selSyll") * 1000);
				i = -1;
				do {
					i++;
					theChosen -= alterniaNames.params.probabilities.nucleus[i];
				} while (theChosen > 0)
				result = row.getElementsByTagName("td")[10 + i];
				result.setAttribute("class", "selectedPhoneme");
				output += result.innerHTML;
				pronOut += result.getAttribute("data-pronunciation");
				moraOut += +result.getAttribute("data-moraCount");
			}
			/* coda */
			if (//false &&
				alterniaNames.chokeSettings.coda.activated &&
				(
					alterniaNames.chokeSettings.coda.scope ||
					+row.getElementsByTagName("th")[0].innerHTML === document.getElementById("workingmain").getElementsByTagName("tr").length
				)
			) {
				output += document.getElementById("slotCodae1").innerHTML + document.getElementById("slotCodae2").innerHTML;
				pronOut += document.getElementById("slotCodae1").getAttribute("data-pronunciation") + document.getElementById("slotCodae2").getAttribute("data-pronunciation");
				moraOut += parseInt(document.getElementById("slotCodae1").getAttribute("data-moraCount")) + parseInt(document.getElementById("slotCodae2").getAttribute("data-moraCount"));
				// wipe the entire line of coda
				for (jk = 13; jk < 18; jk++) {
					row.getElementsByTagName("td")[jk].setAttribute("class", "failedPhoneme");
				}
			}
			else {
				theChosen = Math.floor(alterniaNames.make.logRandom("selSyll") * 1000);
				i = -1;
				do {
					i++;
					theChosen -= alterniaNames.params.probabilities.coda[i];
				} while (theChosen > 0)
				result = row.getElementsByTagName("td")[13 + i];
				result.setAttribute("class", "selectedPhoneme");
				output += result.innerHTML;
				pronOut += result.getAttribute("data-pronunciation");
				moraOut += +result.getAttribute("data-moraCount");
			}
			/* consonant restrictors for next syllable */
			if (i === 2) restrict = 2; // two consonants in coda → no consonants in following onset
			else if (i === 1 || i === 3 || i === 4) restrict = 1; // one → one
			else restrict = 0;
			alterniaNames.state.restrict = restrict;
			/* publish */
			output = output.replace(/Ø/g, "");
			pronOut = pronOut.replace(/Ø/g, "");
			var resCell = document.createElement("th");
			resCell.innerHTML = output;
			alterniaNames.state.wordRaw.push(output);
			alterniaNames.state.pronounce += pronOut + ".";
			alterniaNames.state.moraCount += moraOut;
			row.appendChild(resCell);
			return output;
		},
		"spelling": function(inWord) {
			var outWord = inWord;
			var asd = alterniaNames.make.getDelimiter(), delimiterColliders = [
				[new RegExp("^" + asd), ""],
				[new RegExp(asd + "$"), ""],
				[new RegExp(asd + asd, "g"), asd]
			];
			if (!(document.getElementById("lotshyphens").checked)) delimiterColliders.push(
				[new RegExp("^(..?)" + asd), "$1"],
				[new RegExp(asd + "(..?)$"), "$1"],
				[new RegExp(asd + "(..?)" + asd, "g"), asd + "$1"]
			)
			for (i in delimiterColliders) 
				outWord = outWord.replace(delimiterColliders[i][0], delimiterColliders[i][1]);
			for (i in alterniaNames.params.spellingChanges) {
				if (alterniaNames.params.spellingChanges[i][0][2]) {
					if (alterniaNames.make.logRandom("spell") < alterniaNames.params.spellingChanges[i][0][2])
						outWord = outWord.replace(alterniaNames.params.spellingChanges[i][0],alterniaNames.params.spellingChanges[i][1])
				}
				else outWord = outWord.replace(alterniaNames.params.spellingChanges[i][0],alterniaNames.params.spellingChanges[i][1]);
			}
			outWord = outWord.charAt(0).toUpperCase() + outWord.slice(1);
			return outWord;
		},
		"accent": function (intake) {
			if (alterniaNames.state.syllableCount === 1) return "ˈ" + intake;
			else {var outgoing = intake.split(".");}
			if (outgoing.length === 2) outgoing[1] = "ˈ" + outgoing[1];
			else {
				var penultimate = outgoing.length - 3;
				outgoing[penultimate] = "ˈ" + outgoing[penultimate];
			}
			return outgoing.join(".");
		},
		"delimit": function(targetWord, delimiter) {
			var prelim = targetWord.join(delimiter);
			if (document.getElementById("somehyphens").checked) {
				var out = "", toAnalyze = "", cloned = targetWord.slice(0);
				while (cloned[0]) {
					toAnalyze = cloned.shift();
					if (toAnalyze.length >= 5) out = out + delimiter + toAnalyze + delimiter;
					else out = out + toAnalyze;
				}
				return out;
			}
			else return prelim;
		},
		"clear": function() {
			alterniaNames.state.syllableCount = 0;
			alterniaNames.state.moraCount = 0;
			alterniaNames.state.word = "";
			alterniaNames.state.pronounce = "";
			alterniaNames.state.wordRaw = [];
			alterniaNames.state.restrict = 0;
			alterniaNames.state.seed = [];
			document.getElementById("seed").innerHTML = "";
			document.getElementById("workingmain").innerHTML = "";
			document.getElementById("pronounce").innerHTML = "";
			document.getElementById("syllableCountOut").innerHTML = "";
			document.getElementById("moraCountOut").innerHTML = "";
			document.getElementById("characterCountOut").innerHTML = "";
			document.getElementById("syllableCountOut").removeAttribute("class");
			document.getElementById("moraCountOut").removeAttribute("class");
			document.getElementById("characterCountOut").removeAttribute("class");
		}
	},
	"misc": {
		"init": function() {
			hide(2); hide(3);
		},
		"selectHistory": function() {
			document.getElementById("history").focus();
			document.getElementById("history").select();
		},
		"clearHistory": function() {
			document.getElementById("history").innerHTML = "";
		}
	}
};