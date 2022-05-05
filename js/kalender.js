//funktion(er) der kalder på to datoer og henter dem, skal nok ikke bruges
let calendarShow =1;
function settingDate(date, day) {
    date = new Date(date);
    date.setDate(day);
    date.setHours(23);
    return date;
}

function getDatesBetween(date1, date2) {
    let range1 = new Date(date1);
    let range2 = new Date(date2);
    date1 = settingDate(date1, 31);
    date2 = settingDate(date2, 31);
    let temp;
    let dates = [];
    while (date1 <= date2) {
        if (date1.getDate() != 31) {
            temp = settingDate(date1, 0);
            if (temp >= range1 && temp <= range2) dates.push(temp); //smider datoen temp ind i dates array
            date1 = settingDate(date1, 31);
        } else {
            temp = new Date(date1);
            if (temp >= range1 && temp <= range2) dates.push(temp);
            date1.setMonth(date1.getMonth() + 1);
        }
    }
    console.table(dates);
    let content = "<div class='calendarBtns'><button id='calendarPrevBtn' onclick='callprev()' disabled>Prev</button> | <button id='calendarNextBtn' onclick='callnext()'>Next</button></div>";
    let weekDays = [
        {shortDay: "Mon", fullDay: "Monday"},
        {shortDay: "Tue", fullDay: "Tuesday"},
        {shortDay: "Wed", fullDay: "Wednesday"},
        {shortDay: "Thu", fullDay: "Thursday"},
        {shortDay: "Fri", fullDay: "Friday"},
        {shortDay: "Sat", fullDay: "Saturday"},
        {shortDay: "Sun", fullDay: "Sunday"}
    ];
    let LastDate, firstDate;
    for (let i = 0; i < dates.length; i++) {
        LastDate = dates[i];
        firstDate = new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
        content += "<div id = 'calendarTable_" + (i + 1) + "' class='calendarDiv'>";
        content +=
            "<h2>" +
            firstDate.toString().split(" ")[1] + //fra objekt til string, og splitter ved mellemrum
            "-" +
            firstDate.getFullYear() +
            "</h2>";
        content += "<table class='calendarTable'>"
        content += "<thead>"
        weekDays.map(item => {
            content += "<th>" + item.fullDay + "</th>";
        })
        content += "</thead>"
        content += "<tbody>"
        let j = 1;
        let displayNum, idMonth;
        while (j <= LastDate.getDate()) {
            content += "<tr>"
            for (let k = 0; k < 7; k++) {
                displayNum = j < 10 ? "0" + j : j;
                if (j == 1) {
                    if (firstDate.toString().split(" ")[0] == weekDays[k].shortDay) { //sammenligner index 0 (Fri, Sat..) med datoens dag på ugen (om den 1. er på samme dag som index 0
                        content += "<td onclick='openModal()'>" + displayNum + "</td>"
                        j++;
                    } else {
                        content += "<td></td>";
                    }
                } else if (j > LastDate.getDate()) {
                    content += "<td></td>";
                } else {
                    content += "<td>" + displayNum + "</td>";
                    j++;
                }
            }
            content += "</tr>"
        }
        content += "</tbody>"
        content += "</table>"
        content += "</div>";
    }
    return content;
}

//når der bliver trykket på next knappen
function callnext() {
    let alltables = document.getElementsByClassName('calendarDiv');
    document.getElementById('calendarPrevBtn').disabled = false;
    calendarShow++;
    if (calendarShow <= alltables.length) {
        for (let i = 0; i < alltables.length; i++) {
            alltables[i].style.display = "none";
        }
        document.getElementById("calendarTable_" + calendarShow).style.display = "block"; //den vælger calendarTable_2 og så næste gang calendarTable_3 osv, calendarShow er bare et tal
        if (calendarShow == alltables.length) {
            document.getElementById('calendarNextBtn').disabled = true;
        }
    }
}

function callprev() {
    let alltables = document.getElementsByClassName('calendarDiv');
    document.getElementById('calendarNextBtn').disabled = false;
    calendarShow--;
    if (calendarShow >= 1) {
        for (let i = 0; i < alltables.length; i++) {
            alltables[i].style.display = "none";
        }
        document.getElementById("calendarTable_" + calendarShow).style.display = "block"; //den vælger calendarTable_2 og så næste gang calendarTable_3 osv, calendarShow er bare et tal
        if (calendarShow == 1) {
            document.getElementById('calendarPrevBtn').disabled = true;
        }
    }
}

function openModal() {
    let content = "<div class='bg-modal'>";
    content += "<div class='modal-content'>";
}

function addNoteOnADate() {

}

let content = getDatesBetween("2022/01/01", "2023/01/01");
document.getElementById("calendar").innerHTML = content;