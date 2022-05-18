document.addEventListener("DOMContentLoaded", createFormEventListener);

function createFormEventListener() {
    let form = document.getElementById("loginForm");
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
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
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

    if (response.ok) {
        sessionStorage.setItem("admin", true);
        window.location.href = "holdBackoffice.html";
    } else {
        // vis tekst der fortæller at login er fejlet
    }
}