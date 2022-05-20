const overlay = document.querySelector("#overlay");

document.querySelector(".close").addEventListener("click", closeModal);

let modalTitle = document.querySelector(".modal-title");
let modalInputField = document.querySelector(".modal-input-field");

let form = document.querySelector(".modal-input-field");

let method;
let tipsogtricksForm = false;
const submitBtn = document.getElementById("submit");
const deleteButton = document.createElement("button");

function createTipsogtricks() {
    setMethod("post");
    setTitle("Opret Tips og Tricks");
    setFormDestination("http://localhost:8080/api/tipsogtricks", "post");

    createInput("Navn","tipsogtricksName", "text");
    createInput("Link", "link", "text");

    setupSubmitButton();

    openModal();
}

//REDIGER ET TIP
function editTipsogtricks(tipsogtricks) {
    setMethod("put");
    setTitle("Rediger Tips og Tricks");
    setFormDestination("http://localhost:8080/api/tipsogtricks/" + tipsogtricks.tipsogtricksId, "put");

    createInput("Navn","tipsogtricksName", "text");
    createInput("Link", "link", "text");

    displayTipsogtricks(tipsogtricks);

    createDeleteButton("http://localhost:8080/api/tipsogtricks/" + tipsogtricks.tipsogtricksId);
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
const tipsogtricksContainer = document.getElementById("hold-container");

loadTipsogtricks();
async function loadTipsogtricks() {
    const tipsogtricks = await fetchEntities("http://localhost:8080/api/tipsogtricks");

    for (let i = 0; i < tipsogtricks.length; i++) {
        let tip = tipsogtricks[i];
        const tipsogtricksContainerElement = document.createElement("a");

        const tipsogtricksContainerElementId = document.createElement("div");
        const tipsogtricksContainerElementTitle = document.createElement("div");

        tipsogtricksContainerElementId.textContent = tip.tipsogtricksId;
        tipsogtricksContainerElementTitle.textContent = tip.tipsogtricksName;

        tipsogtricksContainerElement.classList.add("hold-container-element");
        tipsogtricksContainerElementId.classList.add("hold-container-element-id");
        tipsogtricksContainerElementTitle.classList.add("hold-container-element-title");

        //mulighed for at klikke og redigere holdet
        tipsogtricksContainerElement.addEventListener("click", () => editTipsogtricks(tip));

        tipsogtricksContainerElement.appendChild(tipsogtricksContainerElementId);
        tipsogtricksContainerElement.appendChild(tipsogtricksContainerElementTitle);

        tipsogtricksContainer.appendChild(tipsogtricksContainerElement);
    }
}

//VIS HOLD
async function displayTipsogtricks(tip) {
    const tipsogtricks = await fetchEntities("http://localhost:8080/api/tipsogtricks/" + tip.tipsogtricksId);
    const header = document.createElement("p");
    header.textContent = "Tips og Tricks:";
    header.style.fontWeight = "bold";
    form.appendChild(header);
    tipsogtricks.forEach(s => {
        const div = document.createElement("div");
        div.textContent = s.tipsogtricksName;
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

    if (tipsogtricksForm) {
        const tipsogtricksId  = document.getElementById("tipsogtricks").value;

        const tip = {};
        tip.holdId = tipsogtricksId;
        tip.tipsogtricksName = "";
        tip.link = "";


        formDataJsonString = JSON.stringify(tip);

        tipsogtricksForm = false;
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


