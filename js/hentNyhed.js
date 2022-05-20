const divContainer = document.getElementById("wrapper");

async function loadNyheder() {
    const nyhedList = await fetch("http://localhost:8080/api/nyhed").then(response => response.json());
    const nyhedListLength = nyhedList.length;

    for (let i = 0; i < nyhedListLength; i++) {
        const nyhed = nyhedList[i];
        const artikel = document.createElement("div");
        if(i==0){
            artikel.setAttribute("class", "førsteArtikel")
        } else {
            artikel.setAttribute("class", "artikel");
        }


        divContainer.appendChild(artikel);

        overskrift(artikel, nyhed);
        pTekst(artikel, nyhed, i);
        addButton(artikel, i);

    }
}
function myFunction(i) {
    var dots = document.getElementById("dots"+i);
    var moreText = document.getElementById("more"+i);
    var btnText = document.getElementById("btn"+i);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Læs mere";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Læs mindre";
        moreText.style.display = "inline";
    }
}


function addButton(artikel, i){
    const btn = document.createElement("button");
    btn.setAttribute("id", "btn"+i);
    btn.style.borderRadius = "50px";
    btn.onclick(myFunction(i));
    artikel.appendChild(btn);
}
function breaktag(col){
    const br = document.createElement("br");
    col.appendChild(br);
}
function overskrift(artikel, nyhed){
    const overskrift = document.createElement("h2");
    overskrift.innerText = nyhed.overskrift;
    artikel.appendChild(overskrift);

}
function spanDots(pTekst, i){
    const dots = document.createElement("span");
    dots.setAttribute("id", "dots" + i);
    pTekst.appendChild(dots);
}
function underOverskrift(col, hold){
     const underoverskrift = document.createElement("h3");
     underoverskrift.innerText = hold.underOverskrift;
     col.appendChild(underoverskrift);

}

function pTekst(artikel, nyhed, i){
    const tekst = document.createElement("p");
    tekst.innerText = nyhed.introduktion;
    artikel.appendChild(tekst);
    spanDots(tekst, i);
    spanTekst(tekst, nyhed, i);
}
function spanTekst(pTekst, nyhed, i){
    const spanTekst = document.createElement("span");
    spanTekst.setAttribute("id", "more"+i);
    spanTekst.innerText = nyhed.tekst.resterendeTekst;
    spanTekst.style.display = 'none';
    pTekst.appendChild(tekst);
}
function pris(col, hold){
    const underoverskrift = document.createElement("h3");
    underoverskrift.innerText = hold.pris;
    col.appendChild(underoverskrift);

}

function ptekstitalic(col, hold){
    const tekst = document.createElement("p");
    tekst.innerText = hold.antalKursister;
    tekst.setAttribute("style", "font-style: italic");
    col.appendChild(tekst);
}


document.addEventListener('DOMContentLoaded', () => {
     loadNyheder();
});


