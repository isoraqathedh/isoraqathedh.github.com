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

function err(msg, url, line) {
    location.href = "error.html";}

function resultPage(scoreArray, pageNames) {
    // Find the page that corresponds to the largest score.
    // If multiple pages have the same score, then choose the leftmost one.
    var runningTotal = -Number.MAX_VALUE;
    var runningTotalIndex = 0;
    for (var i in scoreArray) {
        if (scoreArray[i] > runningTotal) {
            runningTotal = scoreArray[i];
            runningTotalIndex = i;}}
    return pageNames[runningTotalIndex];}

