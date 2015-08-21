function autowrite_main(){
	$(".aw").each(function(i, span){
		span = $(span);
		var text = span.text().toLowerCase().replace(/ii/g, 'ï').replace(/uu/g, 'ü').replace(/ae/g, 'æ').replace(/[‘’]/g, '\'').split(/\/\//g);
		span.empty();
		
		for (var i in text){
			if (i > 0) autowrite_mk_character(span, 1, 13); // Paragraph seperator
			var sentences = text[i].split(/\//g);
			for (var j in sentences){
				if (j > 0) autowrite_mk_character(span, 0, 13); // Sentence seperator
				var words = sentences[j].split(/\s+/g);
				for (var k in words){
					if (k > 0) $("<span class=\"autowrite_space\"></span>").appendTo(span);
					var wordSpan = $("<span class=\"autowrite_word\"></span>").appendTo(span);
					autowrite_process_word(words[k], wordSpan)
				}
			}
		}
	});
}

autowrite_CONSONANTS = "'bsjdfghrqwyn";
autowrite_VOWELS = "aeuoæïiü";

function autowrite_process_word(word, span){
	var last_cons = -1, box = null;
	
	//if (console && console.info) console.info("Process %s", word);
	
	for(i = 0; i < word.length; i++){
		var ch = word.charAt(i);
		
		if (ch == '-'){
			$("<span class=\"autowrite_space\"></span>").appendTo(span);
		} else if (last_cons < 0){
			var n = autowrite_CONSONANTS.indexOf(ch);
			if (n >= 0){
				last_cons = n;
				test_last = ch;
			} else {
				//console.warn("%s is not a consonant", ch);
			}
		} else {
			var n = autowrite_VOWELS.indexOf(ch);
			if (n >= 0){
				if (n >= 4){
					if (!box) box = $("<span class=\"autowrite_box\"></span>").appendTo(span);
				} else {
					box = null;
				}
				
				//console.log((test_last + ch + " ; " + last_cons + " ; " + n));
				autowrite_mk_character(box || span, n % 4, last_cons);
				
				last_cons = -1;
			} else {
				//console.warn("%s is not a vowel", ch);
			}
		}
	}
}

function autowrite_mk_character(span, vowelIndex, consonantIndex){
	var s = $("<span class=\"autowrite_char\"></span>").appendTo(span);	
	s.css("background-position", "-" + (consonantIndex * 16) + "px -" + (vowelIndex * 16) + "px");
}

$(autowrite_main);
