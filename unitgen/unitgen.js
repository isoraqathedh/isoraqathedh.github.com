/* Unit generator
   Generates a coherent system of units similar to the SI.
   Is extensible by the user by modification of this JavaScript code.
   cc-by-sa-3.0 Isoraqathedh Zorethan Fuzokhalye */

var randoms = {
    // functions that generate functions that generate random numbers with given bounds.
    // This is some seriously high-level function creation,
    // so alter or add at your own risk.
    // The two provided should be enough for most purposes.
    // TODO: maybe add normal distribution
    // TODO: amount of substance has some extra stipulations you might add.
    uniform: function(from, to) {
        return function() {
            return (Math.random() * (to - from) + from);};},
    logarithmic: function(from, to, base) {
        return function() {
            return Math.pow(base, (randoms.uniform(from, to))());}}}

var fundamentals = {
    // The seven fundamental dimensions in the SI.
    // The generator can also take any other set of fundamental units
    // just by changing this object's properties.
    // The user is responsible for making sure the list of fundamentals
    // can describe everything in scope.
    // Each dimension requires three things:
    // 1. a name for the unit.
    // 2. a symbol for the unit.
    // 3. a generating function. This function will dictate how the values will be generated.
    // Remember that generatingFunction can accept any function that generates random numbers,
    // not just functions created by the randoms object.
    // that means if something is not to your satisfaction you can write your own.
    Mass: {
        name: "kilogram",
        symbol: "kg",
        generatingFunction: randoms.logarithmic(-3, 1, 10)},
    Length: {
        name: "metre",
        symbol: "m",
        generatingFunction: randoms.logarithmic(-3, 1, 10)},
    Time: {
        name: "second",
        symbol: "s",
        generatingFunction: randoms.logarithmic(-3, 2.1, 10)},
    "Amount of Substance": {
        name: "mole",
        symbol: "mol",
        generatingFunction: randoms.logarithmic(20-23, 25-23, 10)},
    "Luminance Intensity": {
        name: "candela",
        symbol: "cd",
        generatingFunction: randoms.logarithmic(-1, 3, 10)},
    Temperature: {
        name: "kelvin",
        symbol: "K",
        generatingFunction: randoms.uniform(0.5, 3)},
    Current: {
        name: "ampere",
        symbol: "A",
        generatingFunction: randoms.logarithmic(-2, 4)}};

var derived = {
    // A list of derived units.
    // Derived units are described by a list of other units with an exponent.
    // Each key:value pair represents a dimension
    // and the exponent that the dimension is to be raised to.
    // The complete dimension of the quantity
    // is then calculated by multiplying each dimension key-value pair.
    // Dimensions can be appended or removed from this list
    // simply by editing this object's properties;
    // they are calculated automatically each time the entire procedure runs.
    // Dimension key-value pairs can be any fundamental unit
    // or any other derived unit as long as it is defined somewhere.
    // In the interests of maintenance
    // it is suggested that you do not place a derived unit in the definition of another unit
    // before where the derived unit is actually defined,
    // but you are allowed to do that.
    Area: {Length: 2},
    Volume: {Length: 3},
    Speed: {Length: 1, Time: -1},
    Acceleration: {Speed: 1, Time: -1},
    Force: {Mass: 1, Acceleration: 1},
    Momentum: {Mass: 1, Speed: 1},
    Pressure: {Force: 1, Area: -1},
    Energy: {Force: 1, Length: 1},
    Power: {Energy: 1, Time: -1},
    Charge: {Current: 1, Time: 1},
    Voltage: {Energy: 1, Charge: -1},
    Resistance: {Voltage: 1, Current: -1},
    Frequency: {Time: -1},
    Intensity: {Power: 1, Area: -1},
    Density: {Mass: 1, Volume: -1}};

/* Modification beyond this point not recommended */

function Fundamentals(params) {
    // constructor function for various objects,
    // including dimensions and systems.
    for (dimension in fundamentals) {
        this[dimension] = (params[dimension] === undefined) ? 0 : params[dimension];}}

function convertToBaseUnits(quantity, opt_dimensionsSoFar) {
    // Function to convert derived units to a combination of the seven basic units.
    // Takes a quantity (as a string), then converts it to a Fundamentals object.
    // The value to each key is the exponent to which the key is to be raised to
    // so that the combination, when multiplied appropriately, yields the quantity in the parameter.
    // Throws an error if it cannot find the quantity in either the derived or fundamental lists.
    // opt_dimensionsSoFar is an optional value that should not be used by the user;
    // it is used for recursion.
    // ---
    // handle default value
    /// console.log(opt_dimensionsSoFar);
    dimensionsSoFar = (opt_dimensionsSoFar === undefined) ? new Fundamentals({}) : opt_dimensionsSoFar
    /// console.log("Enter with ", dimensionsSoFar);
    // now the rest
    if (Object.keys(derived).indexOf(quantity) !== -1) {
        // only deal with stuff that we know about
        for (dimension in derived[quantity]) {
            // Recursively search for quantities.
            // For each item,
            // add its dimensions to the accumulator named dimensionsSoFar.
            // if its dimensions are not fundamental, descend.
            /// console.log("Adding", dimension);
            if (Object.keys(fundamentals).indexOf(dimension) !== -1) { // base case
                dimensionsSoFar[dimension] += derived[quantity][dimension]}
            else { // Recursive case
                dimensionsSoFar = convertToBaseUnits(dimension, dimensionsSoFar);}}
            /// console.log("After adding ", dimensionsSoFar);}
        return dimensionsSoFar;}
    else {
        throw "Dimension not found in the dimension lists";}}

function generateSystem(opt_heldValues) {
    // creates a system of fundamental values.
    // opt_heldValues (defaulting to {}, i.e. no values held) are passed through.
    // The rest are generated according to the generateFunctions
    // in the fundamentals object.
    var system = (opt_heldValues === undefined) ? {} : opt_heldValues;
    for (dimension in fundamentals) {
        if (system[dimension] === undefined) {
            system[dimension] = fundamentals[dimension].generatingFunction();}}
    return new Fundamentals(system);}

function conversionFactor(quantity, generatedSystem) {
    // converts 1 generated unit of the quantity into SI units
    // (or other fundamental units defined by fundamentals).
    var result = 1, baseUnits = convertToBaseUnits(quantity);
    for (fundamental in baseUnits) {
        result *= Math.pow(generatedSystem[fundamental], baseUnits[fundamental]);}
    return result;}
        
/* HTML handling */

var keyPlaces = {};

function createFundamentalInputField(unitName) {
    // Creates the unit input field for fundamental units.

    // Whole container
    var fieldSet = document.createElement("div");
    fieldSet.setAttribute("id", unitName + "-assembly");

    // Dimension label
    var unitLabel = document.createElement("label");
    unitLabel.setAttribute("for", unitName + "-entry");
    var unitLabelText = document.createTextNode(unitName);
    unitLabel.appendChild(unitLabelText);

    // I/O box
    var inputBox = document.createElement("input");
    inputBox.setAttribute("id", unitName + "-entry");

    // Units label
    var unitsLabel = document.createTextNode(fundamentals[unitName].symbol);

    // Checkbox for toggle I/O
    var heldCheckbox = document.createElement("input");
    heldCheckbox.setAttribute("type", "checkbox");
    heldCheckbox.setAttribute("id", unitName + "-held");
    var heldLabel = document.createElement("label");
    heldLabel.setAttribute("for", unitName + "-held");
    var heldLabelText = document.createTextNode("Set this quantity");
    heldLabel.appendChild(heldLabelText);

    // Assembly and attachment
    fieldSet.appendChild(unitLabel);
    fieldSet.appendChild(inputBox);
    fieldSet.appendChild(unitsLabel);
    fieldSet.appendChild(heldCheckbox);
    fieldSet.appendChild(heldLabel);
    keyPlaces.fundamentalUnitsPlace.appendChild(fieldSet);}

function createDerivedInputField(unitName) {
    // Creates the unit display field for derived units.
    var fieldSet = document.createElement("div");
    fieldSet.setAttribute("id", unitName + "-assembly");
    
    var unitLabel = document.createElement("label");
    unitLabel.setAttribute("for", unitName + "-entry");
    var unitLabelText = document.createTextNode(unitName);
    unitLabel.appendChild(unitLabelText);
    
    var inputBox = document.createElement("input");
    inputBox.setAttribute("id", unitName + "-entry");
    inputBox.setAttribute("disabled", "disabled");

    fieldSet.appendChild(unitLabel);
    fieldSet.appendChild(inputBox);
    keyPlaces.derivedUnitsPlace.appendChild(fieldSet);}

function getFundamentalQuantities() {
    // retrieves fundamental quantities from the main form.
    // returns a partially-formed system object.

    // Run through the list of fundamental units.
    // Then take the values on the input field, scooping up any that are held.
    var result = {}
    for (entry in fundamentals) {
        if (document.getElementById(entry + "-held").checked) {
            result[entry] = parseFloat(document.getElementById(entry + "-entry").value);}}
    return result;}

function placeFundamentalUnits(system) {
    // Places the values of the system into the appropriate text fields.
    for (fundamental in fundamentals) {
        document.getElementById(fundamental + "-entry").value = system[fundamental];}
    return system;}

function placeDerivedUnits(system) {
    // Calculates the derived values, and places it into the appropriate text fields
    for (unit in derived) {
        document.getElementById(unit + "-entry").value = conversionFactor(unit, system);}}

function makeSystem() {
    // Generates the system and places everything in the correct text fields.
    var system = generateSystem(getFundamentalQuantities());
    placeFundamentalUnits(system);
    placeDerivedUnits(system);
    return system;}

function uginit() {
    keyPlaces.fundamentalUnitsPlace = document.getElementById("fundamentalUnits");
    keyPlaces.derivedUnitsPlace = document.getElementById("derivedUnits");
    for (i in fundamentals) {
        createFundamentalInputField(i);}
    for (i in derived) {
        createDerivedInputField(i);}
    document.getElementById("generateButton").addEventListener("click", makeSystem);}
    
