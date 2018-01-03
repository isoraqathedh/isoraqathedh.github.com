var objvocab = {
    "FIRST": [
        "The <POS> inflects with respect to <thing>.",
        ["The <POS> inflects with respect to <thing> and <thing>.", 0.4],
        ["The <POS> inflects with respect to <thing> or <thing>, but not both.",
         0.2],
        ["The <POS> inflects with respect to <thing>, <thing> and <thing>.",
         0.3],
        "There is a very <fine-coarse> division of the semantic space " +
            "of <stuff> in this language.",
        "The language's <POS> inflection system "+
            "is understood as using <stuff> as an analogy."],
    "stuff": [
        "snow", "wood", "hills", "water", "galactic filaments",
        "quantum-mechanical behaviour",
        "transfinite ordinal numbers"
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
