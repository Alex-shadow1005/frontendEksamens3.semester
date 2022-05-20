const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");

let method;
let nyhedForm = false;
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");

function createNyhed() {
    setMethod("post");
    setTitle("Opret Nyhed");
    setFormDestination("http://localhost:8080/api/nyhed", "post");

    createInput("Overskrift","overskrift", "text");
    createInput("Introduktion", "introduktion", "text");
    createInput("Resterendetekst",  "resterendeTekst", "text")


    setupSubmitButton();

    openModal();
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

async function createDropdownInput(url, inputName, idName) {
    const title = document.createElement("p");
    const text = document.createTextNode(inputName);
    title.appendChild(text);

    const entities = await fetchEntities(url);
    const select = document.createElement("select");
    select.id = idName;
    select.name = idName;

    for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        select.add(new Option(entity.name, entity.id));
    }

    form.appendChild(title);
    form.appendChild(select);
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

    if (nyhedForm) {
        const nyhedId  = document.getElementById("nyhed").value;


        const nyhed = {};
        nyhed.id = nyhedId;
        nyhed.name = "";
        nyhed.overskrift = "";
        nyhed.introduktion = "";
        nyhed.resterendeTekst = "";


        formDataJsonString = JSON.stringify(nyhed);

        omOsForm = false;
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