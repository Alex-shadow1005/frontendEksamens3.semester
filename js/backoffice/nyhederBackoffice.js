const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");

let method;
let nyhederForm = false;
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");

function createNyhed() {
    setMethod("post");
    setTitle("Opret Nyheder");
    setFormDestination("http://localhost:8080/api/nyhed", "post");

    createInput("Overskrift","overskrift", "text");
    createInput("Introduktion", "introduktion", "text");
    createInput("Tekst", "resterendeTekst", "text");

    setupSubmitButton();

    openModal();
}

//REDIGER EN NYHEd
function editNyheder(nyhed) {
    setMethod("put");
    setTitle("Rediger Nyheder");
    setFormDestination("http://localhost:8080/api/nyhed/" + nyhed.nyhedId, "put");

    createInput("Overskrift","overskrift", "text");
    createInput("Introduktion", "introduktion", "text");
    createInput("Tekst", "resterendeTekst", "text");

    displayNyheder(nyhed);

    createDeleteButton("http://localhost:8080/api/nyhed/" + nyhed.nyhedId);
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
const nyhederContainer = document.getElementById("hold-container");

loadNyheder();
async function loadNyheder() {
    const nyheder = await fetchEntities("http://localhost:8080/api/nyhed");

    for (let i = 0; i < nyheder.length; i++) {
        let nyhed = nyheder[i];
        const nyhederContainerElement = document.createElement("a");

        const nyhederContainerElementId = document.createElement("div");
        const nyhederContainerElementTitle = document.createElement("div");

        nyhederContainerElementId.textContent = nyhed.nyhedId;
        nyhederContainerElementTitle.textContent = nyhed.overskrift;

        nyhederContainerElement.classList.add("hold-container-element");
        nyhederContainerElementId.classList.add("hold-container-element-id");
        nyhederContainerElementTitle.classList.add("hold-container-element-title");

        //mulighed for at klikke og redigere holdet
        nyhederContainerElement.addEventListener("click", () => editNyheder(nyhed));

        nyhederContainerElement.appendChild(nyhederContainerElementId);
        nyhederContainerElement.appendChild(nyhederContainerElementTitle);

        nyhederContainer.appendChild(nyhederContainerElement);
    }
}

//VIS HOLD
async function displayNyheder(nyhed) {
    const nyheder = await fetchEntities("http://localhost:8080/api/nyhed/" + nyhed.nyhedId);
    const header = document.createElement("p");
    header.textContent = "Nyheder:";
    header.style.fontWeight = "bold";
    form.appendChild(header);
    nyheder.forEach(s => {
        const div = document.createElement("div");
        div.textContent = s.overskrift;
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

    if (nyhederForm) {
        const nyhedId  = document.getElementById("nyheder").value;

        const nyhed = {};
        nyhed.nyhedId = nyhedId;
        nyhed.overskrift = "";
        nyhed.introduktion = "";
        nyhed.resterendeTekst = "";


        formDataJsonString = JSON.stringify(nyhed);

        nyhederForm = false;
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


