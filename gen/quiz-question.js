// Common function. Should be separated out to a separate file for reuse
// (quiz-question-engine.js)
function findChecked(question) {
    // Finds which choices have been selected and which ones have not.
    // Always returns an array of values that have been selected,
    // even for the case of radio buttons (which can only have one selection).
    // Is undefined in the case of an error.
    switch (question[0].type) {
        // We select what we should do based on the first element;
        // this assumes that each question will only have one type of input.
    case "radio":
        for (var i = 0; i < question.length; i++) {
            if (question[i].checked) {
                return [question[i].value];}}
    case "checkbox":
        var checkedBoxes = [];
        for (var i = 0; i < question.length; i++) {
            if (question[i].checked) {
                checkedBoxes.push(question[i].value);}}
        return checkedBoxes;
    default:
        console.error("Incompatible input type found (want radio or checkbox)");
        return undefined;}}

// Repeat EITHER compact OR expanded for each question in the function process.
// The difference is that of mere formatting.
// The difference between radio and checkboxes is dealt with in `findChecked',
// so they all look the same.

// Compact:
for (choice in findChecked(f.one)) {
    switch (choice) {
    case "1": glyph++; break;
    case "2": item++; break;
    case "3": incantation++; break;
    case "4": potion++; break;
    case "5": glyph++; break;
    case "6": aether++; break;}}

// Expanded:
for (choice in findChecked(f.one)) {
    switch (choice) {
    case "1":
        glyph++;
        break;
    case "2":
        item++;
        break;
    case "3":
        incantation++;
        break;
    case "4":
        potion++;
        break;
    case "5":
        glyph++;
        break;
    case "6":
        aether++;
        break;}}
