const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden"
const USERNAME_KEY = "username"
const savedUsername = localStorage.getItem(USERNAME_KEY)


function onLoginSubmit(info) {
    info.preventDefault(); // prevent default behavior
    loginForm.classList.add(HIDDEN_CLASSNAME); // hide the form

    const typedUsername = loginInput.value; // get value of input as typedUsername
    localStorage.setItem(USERNAME_KEY, typedUsername); // set typedUsername as username of local storage
    paintGreetings(typedUsername); // paint the greeting element
}

function paintGreetings(username){
    greeting.innerText = `Hello ${username}`; // set inner text of greeting to 'Hello username'
    greeting.classList.remove(HIDDEN_CLASSNAME); // show greeting element
}

if (savedUsername === null){
    // if saved username is null (there is no saved username in the local storage)
    loginForm.classList.remove(HIDDEN_CLASSNAME); // show the form
    loginForm.addEventListener("submit", onLoginSubmit); // add event listner onLoginSubmit to the form
} else {
    // if saved username is not null (there is saved username in the local storage)
    paintGreetings(savedUsername); // 
}