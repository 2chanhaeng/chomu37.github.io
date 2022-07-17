const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(element => {
        paintToDo(element);
    });
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

 function deleteToDo(event) {
    const li = event.target.parentElement;

    const id = parseInt(li.id);
    toDos = toDos.filter(item => item.id !== id);
    saveToDos();

    li.remove();
}

function paintToDo(newToDoObj) {
    const li = document.createElement("li");
    li.id = newToDoObj.id;

    const span = document.createElement("span");
    span.innerText = newToDoObj.text;
    li.appendChild(span);

    const button = document.createElement("button");
    button.innerText = "❌"
    button.addEventListener("click", deleteToDo)
    li.appendChild(button);

    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value
    const newToDoObj = {
        id: Date.now(),
        text: newToDo,
    }
    toDoInput.value = "";
    toDos.push(newToDoObj);
    saveToDos();
    paintToDo(newToDoObj);
}

toDoForm.addEventListener("submit", handleToDoSubmit);
