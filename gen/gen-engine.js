var plotGenerator = {
    // This object holds all the functions and data
    // required to process the input string.
    // it can be separated out to a second file.
    dataObj: {},
    dataArr: [],
    dataVersion: "",
    // ------
    feedData: function(list) {
        // Feeds a list written elsewhere into the object.
        // Automatically decides whether or not it is an old-style array
        // or an associative array/object.
        // updates the data variables above.
        if (list instanceof Array) { // is an array
            plotGenerator.dataArr = list;
            plotGenerator.dataVersion = "array";}
        else { // is an object
            plotGenerator.dataObj = list;
            plotGenerator.dataVersion = "object";}},
    randomEntry: function(array) {
        // Returns a random element in an array.
        return array[Math.floor(Math.random() * array.length)];},
    makeErrorOutput: function(variableName) {
        // function to insert into output string if variable is not found.
        return "[Variable " + variableName
            + " not defined – contact developer!]";},
    expandVariable: function(variableName) {
        if (plotGenerator.dataVersion === "array") { // Array version
            for (var i in plotGenerator.dataArr) {
                if (aVocab[i][0] === variableName) {
                    return plotGenerator.randomEntry(
                        plotGenerator.dataArr[i][1]);}}
            // Fallthrough case
            return plotGenerator.makeErrorOutput(variableName);}
        else { // object version
            if (plotGenerator.dataObj.hasOwnProperty(variableName)) {
                return plotGenerator.randomEntry(
                    plotGenerator.dataObj[variableName]);}
            else { // Fallthrough case
                return plotGenerator.makeErrorOutput(variableName);}}},
    expandAllVariables: function(string) {
        var matches = "";
        var variablePattern = /<([^<>]+)>/;
        // ^ Regex pattern matching variables of the form <FOO>.
        while (variablePattern.test(string)) { // some variables still found
        matches = variablePattern.exec(string);
        string = string.replace(matches[0],
                                plotGenerator.expandVariable(matches[1]));}
        return string;}};
