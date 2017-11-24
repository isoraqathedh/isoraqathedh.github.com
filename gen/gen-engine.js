// @source: http://springhole.net/writing_roleplaying_randomators/gen-engine.js
//
// @licstart  The following is the entire license notice for the
// JavaScript code in this page.
//
// Copyright (C) 2016 Isoraķatheð Zorethan

//     The JavaScript code in this page is free software: you can
//     redistribute it and/or modify it under the terms of the GNU
//     General Public License (GNU GPL) as published by the Free Software
//     Foundation, either version 3 of the License, or (at your option)
//     any later version.  The code is distributed WITHOUT ANY WARRANTY;
//     without even the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

//     As additional permission under GNU GPL version 3 section 7, you
//     may distribute non-source (e.g., minimized or compacted) forms of
//     that code without the copy of the GNU GPL normally required by
//     section 4, provided you include this license notice and a URL
//     through which recipients can access the Corresponding Source.

// @licend  The above is the entire license notice
// for the JavaScript code in this page.

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
    effectiveLength: function(thing) {
        if (thing instanceof Array && parseFloat(thing[1])) {
                return thing[1];}
            else {return 1;}}
    randomEntry: function(array) {
        // Returns a random element in an array.

        // First, we need the length of the array:
        var effectiveLength = array.map(
            plotGenerator.effectiveLength
        ).reduce(function(oldLength, accumulator) {
                return oldLength + accumulator})

        // Then assign somethign to it 
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

function GenPlot() {
    document.getElementById("out").innerHTML =
        plotGenerator.expandAllVariables("<FIRST>");
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

function transformArrayToObject(oldArrayFormat) {
    var objVersion = {};
    for (var i in oldArrayFormat) {
        objVersion[oldArrayFormat[i][0]] = oldArrayFormat[i][1];}
    return objVersion;}
