function convertFormToPyscript(event) {
    event.preventDefault();
    const form = event.target;
    const parentDiv = form.parentNode;
    console.log(parentDiv);
    const code = form.querySelector("textarea").value;
    console.log(code);
    const pyscript = document.createElement("py-script");
    pyscript.innerText = code;
    parentDiv.appendChild(pyscript);
    console.log(pyscript);

    // parentDiv.removeChild(form);
    // createNewDiv()
}


function createNewDiv() {
    const div = document.createElement("div");
    const form = document.createElement("form");

    const textarea = document.createElement("textarea");
    form.appendChild(textarea);

    const button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.innerText = "Submit";

    form.appendChild(button);
    form.addEventListener("submit", convertFormToPyscript);

    div.appendChild(form);

    document.body.appendChild(div);
}

// createNewDiv();