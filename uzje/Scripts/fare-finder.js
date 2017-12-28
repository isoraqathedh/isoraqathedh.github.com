// Station fare calculator and determiner.

// utility function
function pad (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;}

function makeElementAndAttach(targetElement, elementType, text, id, cls) {
    var newElement = document.createElement(elementType);
    id  && newElement.setAttribute("id", id);
    cls && newElement.setAttribute("class", cls);
    newElement.appendChild(document.createTextNode(text || ""));
    targetElement.appendChild(newElement);}

var stations = {
    stationList: stationData,
    createDropdownEntry: function(station) {
        var dropdownEntry = document.createElement("option");
        makeElementAndAttach(
            document.getElementById("station-select"),
            "option", station.GMF_LAT, station.id + "_dropdown");},
    createTableRow: function(station) {
        var rowElement = document.createElement("tr")
        rowElement.setAttribute("id", "ROW_" + station.id);
        // Name columns
        var nameColumns = ["displayCode", "GMF_LAT", "MQY_LAT"]
        for (i in nameColumns) {
            makeElementAndAttach(rowElement, "td", station[nameColumns[i]]);}
        // Fare columns
        var fareColumns = ["cardStd", "cardCon", "cardEld",
                           "cashStd", "cashCon"];
        for (i in fareColumns) {
            makeElementAndAttach(
                rowElement,
                "td",
                farefinder.formatCurrency(),
                station.id + "_" + fareColumns[i],
                "fare");}
        document.getElementById("destination-list").appendChild(rowElement)},
    findStation: function(id) {
        for (i in stations.stationList) {
            if (stations.stationList[i].id === id) {
                return stations.stationList[i];}}
        throw ("Station not found: " + id);},
    setLanguage: function(script) {
        if (! script.match(/^((GMF_(CYR|LAT))|(MQY_(LAT|KMS|HGL)))$/)) {
            throw "Script not found.";}
        var gmfP = script.match(/^GMF/);
        var thing;
        for (i in stations.stationList) {
            thing = document.getElementById("ROW_" + stations.stationList[i].id)
                .childNodes[gmfP ? 1 : 2];
            thing.childNodes[0].nodeValue = (stations.stationList[i])[script];
            thing.setAttribute("class", script);}}};

// main function
var farefinder = {
    // currency units in millipence
    harbourPenalty: 8000,
    stationPenaltyShort: 2500,
    stationPenaltyMedium: 4500,
    stationPenalty: 7000,
    airport: 84000,
    border: 34500,
    quantum: 50,

    cardDiscount: 0.95,
    elderlyFixed: 2000,
    childDiscount: 0.45,

    formatCurrency: function(millipence) {
        var rmd, shillings, pence, centipence;
        if (millipence > 0) {
            rmd = millipence - ((millipence % farefinder.quantum < 1)
                                ? 0
                                : (millipence % farefinder.quantum) - farefinder.quantum);
            shillings  = Math.floor(rmd / 12000);
            pence      = Math.floor((rmd % 12000) / 1000);
            centipence = Math.floor((rmd % 1000) / 10);}
        else if (millipence === undefined) {
            shillings = "-";
            pence = "--";
            centipence = "--";}
        return (shillings + "′ " + pad(pence, 2)
                + "·" + pad(centipence, 2) + "″");},

    distance: function(from, to) {
        // tbd
        return 0;},
    crossHarbourP: function(from, to) {
        var fromStation = stations.findStation(from);
        var toStation = stations.findStation(to);
        return ((fromStation.region === "Boan"
                 && toStation.region !== "Boan")
                || (fromStation.region !== "Boan"
                    && toStation.region === "Boan"));},

    writeFares: function(stationId, mainFare) {
        // The main paper fare is just `mainFare'.
        document.getElementById(stationId + "_cashStd").childNodes[0].nodeValue
            = farefinder.formatCurrency(mainFare);
        // The card fare is `mainFare' × `cardDiscount'.
        document.getElementById(stationId + "_cardStd").childNodes[0].nodeValue
            = farefinder.formatCurrency(mainFare * farefinder.cardDiscount);
        // The consessionary paper fare is `mainFare' × `childDiscount'.
        document.getElementById(stationId + "_cashCon").childNodes[0].nodeValue
            = farefinder.formatCurrency(mainFare * farefinder.childDiscount);

        // The consessionary card fare is
        // `mainFare' × `childDiscount' × `cardDiscount'.
        document.getElementById(stationId + "_cardCon").childNodes[0].nodeValue
            = farefinder.formatCurrency(mainFare * farefinder.childDiscount
                                        * farefinder.cardDiscount);

        // The elderly fare is `elderlyFixed',
        // except to the airport and the border station
        // where it is always the consessionary card fare.

        if (stationId !== "SVP_06" && stationId !== "LMD_17") {
            document.getElementById(stationId + "_cardEld")
                .childNodes[0].nodeValue
                = farefinder.formatCurrency(farefinder.elderlyFixed);}
        else {
            document.getElementById(stationId + "_cardEld")
                .childNodes[0].nodeValue
                = farefinder.formatCurrency(mainFare * farefinder.childDiscount
                                            * farefinder.cardDiscount);}},
    init: function() {
        for (i in stations.stationList) {
            stations.createDropdownEntry(stations.stationList[i]);
            stations.createTableRow(stations.stationList[i]);}
        var languageList = ["GMF_LAT", "GMF_CYR",
                            "MQY_LAT", "MQY_HGL", "MQY_KMS"]
        var functions = languageList.map(function (thing) {
            return (function () {
                stations.setLanguage(thing);});})
        for (i in languageList) {
            document.getElementById("SET_" + languageList[i]).onclick
                = functions[i];}}};
