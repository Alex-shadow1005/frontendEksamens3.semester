const divContainer = document.getElementById("con");

async function loadHold() {
    const holdList = await fetch("http://localhost:8080/api/hold").then(response => response.json());
    const holdListLength = holdList.length;

    for (let i = 0; i < holdListLength; i++){
        const hold = holdList[i];
        const row = document.createElement("div");
        row.setAttribute("class","row");

        divContainer.appendChild(row);

        const col = document.createElement("div");
        if((i+2)%2==1){
            console.log((i+2)%2==1);
            col.setAttribute("class", "col-6");
            col.setAttribute("style","text-align: right");
            row.appendChild(col);
            overskrift(col, hold);

            underOverskrift(col, hold);

            ptekst(col, hold);

            const col1 = document.createElement("div");
            col1.setAttribute("class", "col-6");
            col1.setAttribute("style","text-align: right");

            row.appendChild(col1);

            createImg(col1);

        } else {
            console.log((i+2)%2==1);
            col.setAttribute("class", "col-6");

            row.appendChild(col);


            createImg(col);

            const col1 = document.createElement("div");
            col1.setAttribute("class", "col-6");

            row.appendChild(col1);
            overskrift(col1, hold);

            underOverskrift(col1, hold);

            ptekst(col1, hold);
        }

    }

}
function overskrift(col, hold){
    const overskrift = document.createElement("h2");
    overskrift.innerText = hold.name;
    col.appendChild(overskrift);
    const br = document.createElement("br");
    col.appendChild(br);
}
function underOverskrift(col, hold){
    const underoverskrift = document.createElement("h3");
    underoverskrift.innerText = hold.underOverskrift;
    col.appendChild(underoverskrift);
    const br1 = document.createElement("br");
    col.appendChild(br1);
}

function ptekst(col, hold){
    const tekst = document.createElement("p");
    tekst.innerText = hold.tekst;
    col.appendChild(tekst);
}

function createImg(col){
    const img = document.createElement("img");
    img.setAttribute("class","holdimage");
    img.setAttribute("src", "image/Hundetraening2_content.png");
    img.setAttribute("alt", "image");

    col.appendChild(img);

    const br2 = document.createElement("br");
    col.appendChild(br2)
}
document.addEventListener('DOMContentLoaded', () => {

    loadHold();

});