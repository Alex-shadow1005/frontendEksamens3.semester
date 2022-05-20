const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");

let method;
let omOsForm = false;
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");

function createOmOs() {
    setMethod("post");
    setTitle("Opret Om Os");
    setFormDestination("http://localhost:8080/api/omos", "post");

    createInput("Overskrift","overskrift", "text");
    createInput("Underoverskrift", "underOverskrift", "text");
    createInput("Tekst", "tekst", "text");

    setupSubmitButton();

    openModal();
}

//REDIGER EN OM OS
function editOmOs(omOs) {
    setMethod("put");
    setTitle("Rediger Om Os");
    setFormDestination("http://localhost:8080/api/omos/" + omOs.omOsId, "put");

    createInput("Overskrift","overskrift", "text");
    createInput("Underoverskrift", "underOverskrift", "text");
    createInput("Tekst", "tekst", "text");
    displayOmOs(omOs);

    createDeleteButton("http://localhost:8080/api/omos/" + omOs.omOsId);
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
const omOsContainer = document.getElementById("hold-container");

loadOmOs();
async function loadOmOs() {
    const omOsne = await fetchEntities("http://localhost:8080/api/omos");

    for (let i = 0; i < omOsne.length; i++) {
        let omOs = omOsne[i];
        const omOsContainerElement = document.createElement("a");

        const omOsContainerElementId = document.createElement("div");
        const omOsContainerElementTitle = document.createElement("div");

        omOsContainerElementId.textContent = omOs.omOsId;
        omOsContainerElementTitle.textContent = omOs.overskrift;

        omOsContainerElement.classList.add("hold-container-element");
        omOsContainerElementId.classList.add("hold-container-element-id");
        omOsContainerElementTitle.classList.add("hold-container-element-title");

        //mulighed for at klikke og redigere holdet
        omOsContainerElement.addEventListener("click", () => editOmOs(omOs));

        omOsContainerElement.appendChild(omOsContainerElementId);
        omOsContainerElement.appendChild(omOsContainerElementTitle);

        omOsContainer.appendChild(omOsContainerElement);
    }
}

//VIS HOLD
async function displayOmOs(omOs) {
    const omOsne = await fetchEntities("http://localhost:8080/api/omos/" + omOs.omOsId);
    const header = document.createElement("p");
    header.textContent = "Om Os:";
    header.style.fontWeight = "bold";
    form.appendChild(header);
    omOsne.forEach(s => {
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

    if (omOsForm) {
        const omOsId  = document.getElementById("omos").value;

        const omOs = {};
        omOs.omOsId = omOsId;
        omOs.overskrift = "";
        omOs.underOverskrift = "";
        omOs.tekst = "";


        formDataJsonString = JSON.stringify(omOs);

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


