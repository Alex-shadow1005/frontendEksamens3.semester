const id = localStorage.getItem("show");

console.log(id);

const holdContainer = document.getElementById("specifikthold");

async function loadSpecifiktHold() {
    const specifiktHold = await fetchSpecifiktHold("http://localhost:8080/api/hold/" + id);

    //image

    //overskrift
    const showHoldName = document.createElement("h2");
    showHoldName.classList.add("name");
    showHoldName.innerText = specifiktHold.name;
    holdContainer.appendChild(showHoldName);

    //underoverskrift
    const showHoldUnderOverskrift = document.createElement("h3");
    showHoldUnderOverskrift.classList.add("underOverskrift");
    showHoldUnderOverskrift.innerText = specifiktHold.under_overskrift;
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