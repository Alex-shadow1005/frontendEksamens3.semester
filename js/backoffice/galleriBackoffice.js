const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");

let method;
let galleriForm = false;
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");

function createGalleri() {
    setMethod("post");
    setTitle("Upload billede");
    setFormDestination("http://localhost:8080/api/galleri/upload/image", "post");

    createInput("Navn","name", "text");
    createInput("Type", "type", "text");
    createFileUpload("Billede","image", "file");

    setupSubmitButton();

    openModal();
}

//REDIGER ET BI
function deleteGalleri(galleri) {
    setMethod("delete");
    setTitle("Slet hold");
    setFormDestination("http://localhost:8080/api/galleri/delete/" + galleri.galleriId, "delete");

    createInput("Hold navn", "name", "text");
    createInput("Underoverskrift", "underOverskrift", "text");
    createInput("Tekst", "tekst", "text");
    createInput("Pris", "pris", "text");
    createInput("Antal kursister", "antalKursister", "text");
    createFileUpload("Billede",  "holdImage", "file");

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
const galleriContainer = document.getElementById("hold-container");

loadGalleri();
async function loadGalleri() {
    const galleribilleder = await fetchEntities("http://localhost:8080/api/galleri");

    for (let i = 0; i < galleribilleder.length; i++) {
        let galleri = galleribilleder[i];
        const galleriContainerElement = document.createElement("a");

        const galleriContainerElementId = document.createElement("div");
        const galleriContainerElementTitle = document.createElement("div");

        galleriContainerElementId.textContent = galleri.galleriId;
        galleriContainerElementTitle.textContent = galleri.name;

        galleriContainerElement.classList.add("hold-container-element");
        galleriContainerElementId.classList.add("hold-container-element-id");
        galleriContainerElementTitle.classList.add("hold-container-element-title");

        //mulighed for at klikke og redigere holdet
        galleriContainerElement.addEventListener("click", () => deleteGalleri(galleri));

        galleriContainerElement.appendChild(galleriContainerElementId);
        galleriContainerElement.appendChild(galleriContainerElementTitle);

        galleriContainer.appendChild(galleriContainerElement);
    }
}


async function createFileUpload(inputName, idName, type, value) {
    const title = document.createElement("p");
    const text = document.createTextNode(inputName);
    title.appendChild(text);

    const input = document.createElement("input");
    input.id = idName;
    input.name = idName;
    input.type = type;


    if (value !== undefined) {
        input.value = value;
    }
    input.classList.add("js-input");


    form.appendChild(title);
    form.appendChild(input);
}

//VIS HOLD
async function displayGalleri(galleri) {
    const galleribilleder = await fetchEntities("http://localhost:8080/api/galleri/" + galleri.galleriId);
    const header = document.createElement("p");
    header.textContent = "Galleri:";
    header.style.fontWeight = "bold";
    form.appendChild(header);
    galleribilleder.forEach(s => {
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

    if (galleriForm) {
        const galleriId  = document.getElementById("galleri").value;
        const image = document.getElementById("input");

        const galleri = {};
        galleri.galleriId = galleriId;
        galleri.name = "";
        galleri.type = "";
        galleri.image = image;


        formDataJsonString = JSON.stringify(galleri);

        galleriForm = false;
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


