var objvocab = {
    "FIRST": [
        "<feature:phonology>",
        "<feature:phonotactics>",
        "<feature:orthography>",
        "<feature:morphology>",
        "<feature:syntax>",
        "<feature:semantics>"],
    "feature:phonology": [
        "There is <amount> of <sound-type> in the phonology.",
        "The language utilises <unusual-sound-type> in the phonology."
    ],
    "feature:phonotactics": [
        "The language uses phonoruns based on <sound-type> and <sound-type>.",
        "A syllable is composed of a <sound-type-sg> followed by a <sound-type-sg>.",
        ["A syllable is composed of a <sound-type-sg>, <sound-type-sg> " +
            "and <sound-type-sg>, in that order.", 0.4],
        "In the coda, <sound-type> cannot appear.",
        "In the onset, <sound-type> cannot appear."
    ],
    "feature:orthography": [
        "The language's orthography uses <orthographic-feature> " +
            "to represent <sound-type>.",
        "The language has <amount> of orthographies.",
        "The language's orthography primarily uses <orthographic-feature>.",
        ["The language's orthography primarily uses <orthographic-feature> " +
            "and <orthographic-feature>.", 0.4],
        ["The language's orthography primarily uses <orthographic-feature>, " +
            "<orthographic-feature> and <orthographic-feature>.", 0.3],
        "The language's orthography does not use <orthographic-feature>.",
        "In this document, we shall use the <earth-script> script for the language.",
        ["In this document, we shall use the <earth-script> script for the language, " +
            "but with <orthographic-feature> to represent <sound-type>.",
            0.4]
    ],
    "feature:morphology": [
        "The <POS> inflects with respect to <thing>.",
        ["The <POS> inflects with respect to <thing> and <thing>.", 0.4],
        ["The <POS> inflects with respect to <thing> or <thing>, but not both.",
         0.2],
        ["The <POS> inflects with respect to <thing>, <thing> and <thing>.",
         0.3],
        "The inflection system for <POS> " +
            "is understood using <stuff> as an analogy.",
    ],
    "feature:syntax": [
        "The <POS> and the <POS> are handled in exactly the same way.",
        "The language lacks any <POS>.",
        "The language has the <POS> but lacks any <POS>."
    ],
    "feature:semantics": [
        "Names are a type of <POS>.",
        "There is a very <fine-coarse> division of the semantic space " +
            "of <stuff> in this language.",
        "There is no concept of <stuff>."
    ],
    "stuff": [
        "snow", "wood", "hills", "water", "galactic filaments",
        "quantum-mechanical behaviour",
        "transfinite ordinal numbers",
        "animals with more than three horns",
        "kings",
        "food which is to be eaten in more than a day",
        "milk",
        "danmaku",
    ],
    "amount": [
        ["a small amount", 4],
        ["a large amount", 4],
        ["an unusually small amount", 2],
        ["an unusually large amount", 2],
        ["a lack", 2],
        "a pathological amount",
        "in popular analyses a non-integer amount",
        "in popular analyses a negative amount",
        "an uncountable amount",
        "an even number",
        "a square number"],
    "sound-type": [
        "vowels", "consonants",
        "plosives", "alveolars", "unrounded vowels",
        "rounded vowels", "fricatives", "ingressive phonemes",
        "<unusual-sound-type>"],
    "unusual-sound-type": [
        "whistles", "finger-taps", "hand signals", "shrieks"],
    // TODO is there a better way? -- Uruwi
    "sound-type-sg": [
        "vowel", "consonant",
        "plosive", "alveolar", "unrounded vowel",
        "rounded vowel", "fricative", "ingressive phoneme",
        "<unusual-sound-type-sg>"],
    "unusual-sound-type-sg": [
        "whistle", "finger-tap", "hand signal", "shriek"],
    "orthographic-feature": [
        "diacritics", "capital letters", "ampersands", "backslashes",
        "digits", "upside-down letters", "sideways letters", "hexagons",
        "spaces", "greyscale dots", "logographs",
        "<unusual-orthographic-feature>"],
    "unusual-orthographic-feature": [
        "colours", "overcat diacritics", "line thickness",
        "drawings of the species that speaks it"
    ],
    "earth-script": [
        ["Latin", 2],
        "Cyrillic", "Greek", "Hangul",
        "Armenian", "Hebrew", "Arabic",
        "Cherokee", "Runic", "Ogham",
        "Old Hungarian", "hacm"
    ],
    "fine-coarse": ["fine", "coarse"],
    "thing": [
        ["<grammatical-object>", 100],
        ["<unusual-object>", 10],
        "<very-unusual-object>"],
    "grammatical-object": [
        "person", "number", "tense", "manner", "place", "prestige",
        "evidentiality", "alienableness"],
    "unusual-object": [
        "the date",
        "whether one has eaten recently",
        "the phase of the moon",
        "the makeup of the crowd around the audience",
        "the direction the speaker is facing"],
    "very-unusual-object": [
        "the position of a star or planet in the sky",
        "the amount of money one makes in a period of time",
        "how prepared one is to make this statement"],
    "POS": ["noun", "verb", "adjective", "conjunction",
            "pre/post-positions"]};
