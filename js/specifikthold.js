const id = localStorage.getItem("show");

console.log(id);

const holdContainer = document.getElementById("specifikthold");
const url = "http://localhost:8080/api/hold/get/image/"

const getImage = async (url) => {
    return await fetch(url).then(res => res.url)
}

async function loadSpecifiktHold() {
    const specifiktHold = await fetchSpecifiktHold("http://localhost:8080/api/hold/" + id);

    //image
    getImage(url + specifiktHold.name).then(result => {
        createImg(result);
    });
    function createImg(val){
        const img = document.createElement("img");
        img.setAttribute("class","holdimage");
        img.setAttribute("src", val);
        img.setAttribute("alt", "image");

        holdContainer.appendChild(img);
    }

    //overskrift
    const showHoldName = document.createElement("h2");
    showHoldName.classList.add("name");
    showHoldName.innerText = specifiktHold.name;
    holdContainer.appendChild(showHoldName);

    //underoverskrift
    const showHoldUnderOverskrift = document.createElement("h3");
    showHoldUnderOverskrift.classList.add("underOverskrift");
    showHoldUnderOverskrift.innerText = specifiktHold.underOverskrift;
    holdContainer.appendChild(showHoldUnderOverskrift);

    //tekst
    const showHoldTekst = document.createElement("p");
    showHoldTekst.classList.add("tekst");
    showHoldTekst.innerText = specifiktHold.tekst;
    holdContainer.appendChild(showHoldTekst);

    //pris
    const showHoldPris = document.createElement("h3");
    showHoldPris.classList.add("pris");
    showHoldPris.innerText = specifiktHold.pris;
    holdContainer.appendChild(showHoldPris);

    //kursister
    const showHoldKursister = document.createElement("p");
    showHoldKursister.classList.add("kursister");
    showHoldKursister.innerText = specifiktHold.antalKursister + " kursister pr. hold";
    showHoldKursister.setAttribute("style", "font-style: italic");
    holdContainer.appendChild(showHoldKursister);
}

function fetchSpecifiktHold(url) {
    return fetch(url).then(response => response.json());
}

loadSpecifiktHold();