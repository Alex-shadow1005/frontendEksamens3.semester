const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");
let modalForm = document.getElementById("modalForm");

let method;
let holdForm = false;
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");

function createHold() {
    clearModal();
    setMethod("post");
    setTitle("Opret hold");
    setFormDestination("http://localhost:8080/api/hold/upload/image", "post");

    createInput("Hold navn","name", "text");
    createInput("Underoverskrift", "underOverskrift", "text");
    createInput("Brødtekst",  "tekst", "text");
    createInput("Pris",  "pris", "text");
    createInput("Antal kursister",  "antalKursister", "number");
    createFileUpload("Billede",  "holdImage", "file");

    setupSubmitButton();

    openModal();

}

//REDIGER ET HOLD
function editHold(hold) {
    clearModal();
    console.table(hold.name);
    setMethod("put");
    setTitle("Rediger hold");
    setFormDestination("http://localhost:8080/api/hold/" + hold.holdId, "post");

    createEditInput("Hold navn", "name", "text", hold.name);
    createEditInput("Underoverskrift", "underOverskrift", "text", hold.underOverskrift);
    createEditInput("Tekst", "tekst", "text", hold.tekst);
    createEditInput("Pris", "pris", "text", hold.pris);
    createEditInput("Antal kursister", "antalKursister", "number", hold.antalKursister);
    createFileUpload("Billede",  "holdImage", "file");



    setupEditSubmitButton();

    openModal();
}

//SLET HOLD
function deleteEntity(url) {
    const fetchOptions = {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        },
    };
    return fetch(url, fetchOptions);
}

//SLET ET HOLD KNAP
function createDeleteButton(url) {
    const modalFooter = document.querySelector(".modal-footer")

    deleteButton.id = "delete";
    deleteButton.className = "btn btn-danger remove";
    deleteButton.textContent = "Slet";

    modalFooter.appendChild(deleteButton);

    deleteButton.addEventListener("click", async () => {
        await deleteEntity(url);
        await location.reload();
    });
}

function fetchEntities(url) {
    return fetch(url).then(response => response.json());
}


//LOAD HOLD
const holdContainer = document.getElementById("hold-container");
loadHold();
async function loadHold() {
    const holdene = await fetchEntities("http://localhost:8080/api/hold");

    for (let i = 0; i < holdene.length; i++) {
        let hold = holdene[i];
        const holdContainerElement = document.createElement("a");

        const holdContainerElementId = document.createElement("div");
        const holdContainerElementTitle = document.createElement("div");

        holdContainerElementId.textContent = hold.holdId;
        holdContainerElementTitle.textContent = hold.name;
        
        holdContainerElement.classList.add("hold-container-element");
        holdContainerElementId.classList.add("hold-container-element-id");
        holdContainerElementTitle.classList.add("hold-container-element-title");

        //mulighed for at klikke og redigere holdet
        holdContainerElement.addEventListener("click", () => editHold(hold));

        holdContainerElement.appendChild(holdContainerElementId);
        holdContainerElement.appendChild(holdContainerElementTitle);

        holdContainer.appendChild(holdContainerElement);
    }
}

//VIS HOLD
async function displayHold(hold) {
    const holdene = await fetchEntities("http://localhost:8080/api/hold/");
    const header = document.createElement("p");
    header.textContent = "Hold:";
    header.style.fontWeight = "bold";
    form.appendChild(header);
    holdene.forEach(s => {
        const div = document.createElement("div");
        div.textContent = s.name;
        form.appendChild(div);
    });
}

//Modal build functions

function setTitle(title) {
    modalTitle.textContent = title;
}
function setMethod(method) {
    this.method = method;
}

function afterSubmit(){
    window.location.href="../../html/backoffice/holdBackoffice.html";
}

function setFormDestination(action, method) {
    form.setAttribute("action", action);
    form.setAttribute("method", method);
    form.setAttribute("target", "dummyframe");


}

function createEditInput(inputName, idName, type, value, hold) {
    const title = document.createElement("p");
    const text = document.createTextNode(inputName);
    title.appendChild(text);

    const input = document.createElement("input");
    input.id = idName;
    input.name = idName;
    if (value !== undefined) {
        input.value = value;
    } else {
        input.value = hold.idName;
    }
    input.classList.add("js-input");


    form.appendChild(title);
    form.appendChild(input);
}

function createInput(inputName, idName, type, value) {
    const title = document.createElement("p");
    const text = document.createTextNode(inputName);
    title.appendChild(text);

    const input = document.createElement("input");
    input.id = idName;
    input.name = idName;
    if (value !== undefined) {
        input.value = value;
    }
    input.classList.add("js-input");


    form.appendChild(title);
    form.appendChild(input);
}

async function createFileUpload(inputName, idName, type, value) {
    const title = document.createElement("p");
    const text = document.createTextNode(inputName);
    title.appendChild(text);

    const input = document.createElement("input");
    input.id = idName;
    input.name = idName;
    input.type = type;
    input.accept = "image/png, image/jpeg";


    if (value !== undefined) {
        input.value = value;
    }
    input.classList.add("js-input");


    form.appendChild(title);
    form.appendChild(input);
}

function setupEditSubmitButton() {
    submitBtn.addEventListener("click", async () => {
       closeModal();
    });
}

function setupSubmitButton() {
    submitBtn.addEventListener("click", async () => {
       closeModal();
    });
}


function openModal() {
    overlay.style.display = "block";
}

function closeModal() {
    overlay.style.display = "none";
    ///clearModal();
}

function clearModal() {
    modalTitle.textContent = "";
    deleteButton.remove();

    form.reset();

    while (modalInputField.hasChildNodes()) {
        modalInputField.removeChild(modalInputField.firstChild);
    }
}


