const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");

let method;
let holdForm = false;
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");


//OPRET ET HOLD
function createHold() {
    setMethod("post");
    setTitle("Opret hold");
    setFormDestination("http://localhost:8080/api/hold", "post");

    createInput("Hold navn","name", "text");
    createInput("Underoverskrift", "underOverskrift", "text");
    createInput("Brødtekst",  "tekst", "text")
    createInput("Pris",  "pris", "text")
    createInput("Antal kursister",  "antalKursister", "text")

    setupSubmitButton();

    openModal();
}

//REDIGER ET HOLD
function editHold(hold) {
    setMethod("put");
    setTitle("Rediger hold");
    setFormDestination("http://localhost:8080/api/hold/" + hold.holdId, "put");

    createInput("Hold navn", "name", "text");
    createInput("Underoverskrift", "underOverskrift", "text");
    createInput("Tekst", "tekst", "text");
    createInput("Pris", "pris", "text");
    createInput("Antal kursister", "antalKursister", "text");

    displayHold(hold);

    createDeleteButton("http://localhost:8080/api/hold/" + hold.holdId);
    setupSubmitButton();

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
    const holdene = await fetchEntities("http://localhost:8080/api/hold" + hold.holdId);
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

function setFormDestination(action, method) {
    form.setAttribute("action", action);
    form.setAttribute("method", method);
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


function setupSubmitButton() {
    submitBtn.addEventListener("click", async () => {
        await createFormEventListener();
        await location.reload();
    });
}

function createFormEventListener() {
    form.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const formEvent = event.currentTarget;
    const url = formEvent.action;

    try {
        const formData = new FormData(formEvent);

        await postFormDataAsJson(url, formData);
    } catch (err) {

    }
}

async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    let formDataJsonString;

    if (holdForm) {
        const holdId  = document.getElementById("hold").value;


        const hold = {};
        hold.holdId = holdId;
        hold.name = "";
        hold.underOverskrift = "";
        hold.tekst = "";
        hold.pris = "";
        hold.antalKursister = "";


        formDataJsonString = JSON.stringify(hold);

        holdForm = false;
    } else {
        formDataJsonString = JSON.stringify(plainFormData);
    }

    const fetchOptions = {
        method: this.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: formDataJsonString
    };

    const response = await fetch(url, fetchOptions);

    if (!response) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}


function openModal() {
    overlay.style.display = "block";
}

function closeModal() {
    overlay.style.display = "none";
    clearModal();
}

function clearModal() {
    modalTitle.textContent = "";
    deleteButton.remove();

    form.reset();

    while (modalInputField.hasChildNodes()) {
        modalInputField.removeChild(modalInputField.firstChild);
    }
}


