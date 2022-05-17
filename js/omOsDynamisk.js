const divContainer = document.getElementById("con");

async function loadOmOs() {
    const omOsList = await fetch("http://localhost:8080/api/omos").then(response => response.json());
    const omOsListLength = omOsList.length;
    console.table(omOsList);

    for (let i = 0; i < omOsListLength; i++) {
        const omOs = omOsList[i];

        //laver overskriften
        const center = document.createElement('center');
        divContainer.appendChild(center);
        overskrift(center, omOs);


        //laver en row
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        divContainer.appendChild(row);


        //laver en col som er tom
        const col = document.createElement("div");
        col.setAttribute("class", "col");
        col.setAttribute("style", "text-align: right");
        row.appendChild(col);



        //laver en col-2 som indeholder underOverskriften
        const col2 = document.createElement("div");
        col2.setAttribute("class", "col-2");
        col2.setAttribute("style", "text-align: right");
        row.appendChild(col2);
        underOverskrift(col2, omOs);


        row.appendChild(col);

        broedtekst(col2, omOs);

        // col1 = document.createElement("div");
        //col1.setAttribute("class", "col-6");
        // col1.setAttribute("style","text-align: right");

        // row.appendChild(col1);
    }

}

function overskrift(center, omOs) {
    const overskrift = document.createElement("h1");
    overskrift.innerText = omOs.overskrift;
    center.appendChild(overskrift);
    const br = document.createElement("br");
    center.appendChild(br);
}

function underOverskrift(col, omOs) {
    const underoverskrift = document.createElement("h3");
    underoverskrift.innerText = omOs.underOverskrift;
    col.appendChild(underoverskrift);
    const br1 = document.createElement("br");
    col.appendChild(br1);
}

function broedtekst(col, omOs) {
    const tekst = document.createElement("p");
    tekst.innerText = omOs.tekst;
    col.appendChild(tekst);
}

document.addEventListener('DOMContentLoaded', () => {

    loadOmOs();

});
