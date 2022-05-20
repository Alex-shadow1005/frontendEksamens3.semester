
const id = localStorage.getItem("show");

console.log(id);

const holdContainer = document.getElementById("specifikthold");
const url = "http://localhost:8080/api/hold/get/image/"

const getImage = async (url) => {
    return await fetch(url).then(res => res.url)
}

async function loadSpecifiktHold() {
    const specifiktHold = await fetchSpecifiktHold("http://localhost:8080/api/hold/" + id);

    //<br> tag
    function breaktag(){
        const br = document.createElement("br");
        holdContainer.appendChild(br);
    }

    //row
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    holdContainer.appendChild(row);

    //image
    const col = document.createElement("div");
    col.setAttribute("class", "col");
    row.appendChild(col);

    const col7 = document.createElement("div");
    col7.setAttribute("class", "col-7");
    col7.setAttribute("style", "text-align: center");
    row.appendChild(col7);

    const coltwo = document.createElement("div");
    coltwo.setAttribute("class", "col");
    row.appendChild(coltwo);

    getImage(url + specifiktHold.name).then(result => {
        createImg(col7, result);
    });
    function createImg(col7, val){
        const img = document.createElement("img");
        img.setAttribute("class","holdimage");
        img.setAttribute("src", val);
        img.setAttribute("alt", "image");

        col7.appendChild(img);
    }
    breaktag();

    //overskrift
    const showHoldName = document.createElement("h2");
    showHoldName.classList.add("name");
    showHoldName.style.textAlign = "center";
    showHoldName.innerText = specifiktHold.name;
    holdContainer.appendChild(showHoldName);

    breaktag();

    //underoverskrift
    const showHoldUnderOverskrift = document.createElement("h3");
    showHoldUnderOverskrift.classList.add("underOverskrift");
    showHoldUnderOverskrift.style.textAlign = "center";
    showHoldUnderOverskrift.innerText = specifiktHold.underOverskrift;
    holdContainer.appendChild(showHoldUnderOverskrift);

    breaktag();

    //tekst
    const showHoldTekst = document.createElement("p");
    showHoldTekst.classList.add("tekst");
    showHoldTekst.style.textAlign = "center";
    showHoldTekst.innerText = specifiktHold.tekst;
    holdContainer.appendChild(showHoldTekst);

    breaktag();

    //pris
    const showHoldPris = document.createElement("h3");
    showHoldPris.classList.add("pris");
    showHoldPris.style.textAlign = "center";
    showHoldPris.innerText = specifiktHold.pris;
    holdContainer.appendChild(showHoldPris);

    breaktag();

    //kursister
    const showHoldKursister = document.createElement("p");
    showHoldKursister.classList.add("kursister");
    showHoldKursister.style.textAlign = "center";
    showHoldKursister.style.fontStyle = "italic";
    showHoldKursister.innerText = specifiktHold.antalKursister + " kursister pr. hold";
    holdContainer.appendChild(showHoldKursister);

    //Gå tilbage knap

    const row2 = document.createElement("div");
    row2.setAttribute("class", "row");
    holdContainer.appendChild(row2);

    const buttoncol = document.createElement("div");
    buttoncol.setAttribute("class", "col");
    row2.appendChild(buttoncol);

    const buttoncol3 = document.createElement("div");
    buttoncol3.setAttribute("class", "col-3");
    buttoncol3.setAttribute("style", "text-align: center");
    row2.appendChild(buttoncol3);

    const buttoncoltwo = document.createElement("div");
    buttoncoltwo.setAttribute("class", "col");
    row2.appendChild(buttoncoltwo);

    const showBackButton = document.createElement("button");
    showBackButton.classList.add("backButton");
    showBackButton.setAttribute("style", "text-align: center");
    showBackButton.innerText = "Gå tilbage";
    showBackButton.addEventListener('click', () => {
        window.location.href = "holdtest.html";
    });
    buttoncol3.appendChild(showBackButton);
}

function fetchSpecifiktHold(url) {
    return fetch(url).then(response => response.json());
}

document.addEventListener('DOMContentLoaded', () => {
    loadSpecifiktHold();
});




