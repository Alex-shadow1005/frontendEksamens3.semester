const divContainer = document.getElementById("con");

async function loadHold() {
    const holdList = await fetch("http://localhost:8181/api/hold").then(response => response.json());
    const holdListLength = holdList.length;

    for (let i = 0; i < holdListLength; i++){
        const hold = holdList[i];
        const row = document.createElement("div");
        row.setAttribute("class","row");

        divContainer.appendChild(row);
        const col = document.createElement("div");
        col.setAttribute("class", "col-6");

        row.appendChild(col);


        const img = document.createElement("img");
        img.setAttribute("class","holdimage");
        img.setAttribute("src", "image/Hundetraening2_content.png");
        img.setAttribute("alt", "image");

        col.appendChild(img);

        const col1 = document.createElement("div");
        col1.setAttribute("class", "col-6");

        row.appendChild(col1);

        const overskrift = document.createElement("h2");
        overskrift.innerText = hold.name;
        col1.appendChild(overskrift);

        const underoverskrift = document.createElement("h3");
        underoverskrift.innerText = "Underoverskrift";
        col1.appendChild(underoverskrift);


        const tekst = document.createElement("p");
        tekst.innerText = hold.tekst;
        col1.appendChild(tekst);

    }

}
document.addEventListener('DOMContentLoaded', () => {

    loadHold();

});