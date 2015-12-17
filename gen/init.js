function GenPlot() {
    document.getElementById("out").innerHTML = plotGenerator.expandAllVariables("<FIRST>");
    return false; // Prevents form from submitting.
}

function init() {
    plotGenerator.feedData(objvocab); // Feed data.

    // Add the generation behaviour for the button.
    if (document.addEventListener) {
        // For all major browsers, except IE 8 and earlier
        document.getElementById("generateButton").addEventListener(
            "click", GenPlot);}
    else if (document.attachEvent) {
        // For IE 8 and earlier versions
        document.getElementById("generateButton").attachEvent(
            "onclick", GenPlot);}}
