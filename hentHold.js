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
        if((i+2)%2==1){
            console.log((i+2)%2==1);
            col.setAttribute("class", "col-6");
            col.setAttribute("style","text-align: right");
            row.appendChild(col);
            const overskrift = document.createElement("h2");
            overskrift.innerText = hold.name;
            col.appendChild(overskrift);
            const br = document.createElement("br");
            col.appendChild(br);

            const underoverskrift = document.createElement("h3");
            underoverskrift.innerText = hold.underOverskrift;
            col.appendChild(underoverskrift);

            const br1 = document.createElement("br");
            col.appendChild(br1);

            const tekst = document.createElement("p");
            tekst.innerText = hold.tekst;
            col.appendChild(tekst);

            const col1 = document.createElement("div");
            col1.setAttribute("class", "col-6");
            col1.setAttribute("style","text-align: right");

            row.appendChild(col1);

            const img = document.createElement("img");
            img.setAttribute("class","holdimage");
            img.setAttribute("src", "image/Hundetraening2_content.png");
            img.setAttribute("alt", "image");

            col1.appendChild(img);
            const br2 = document.createElement("br");
            col1.appendChild(br2);

        } else {
            console.log((i+2)%2==1);
            col.setAttribute("class", "col-6");

            row.appendChild(col);


            const img = document.createElement("img");
            img.setAttribute("class","holdimage");
            img.setAttribute("src", "image/Hundetraening2_content.png");
            img.setAttribute("alt", "image");

            col.appendChild(img);

            const br2 = document.createElement("br");
            col.appendChild(br2)

            const col1 = document.createElement("div");
            col1.setAttribute("class", "col-6");

            row.appendChild(col1);

            const overskrift = document.createElement("h2");
            overskrift.innerText = hold.name;
            col1.appendChild(overskrift);

            const br = document.createElement("br");
            col1.appendChild(br);

            const underoverskrift = document.createElement("h3");
            underoverskrift.innerText = hold.underOverskrift;
            col1.appendChild(underoverskrift);
            const br1 = document.createElement("br");
            col1.appendChild(br1);


            const tekst = document.createElement("p");
            tekst.innerText = hold.tekst;
            col1.appendChild(tekst);
        }

    }

}
document.addEventListener('DOMContentLoaded', () => {

    loadHold();

});