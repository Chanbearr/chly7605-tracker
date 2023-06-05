const form = document.getElementById("songTracker"); // Variable to store reference to songTracker form
const tasklist = document.getElementById("songList");
const modal = document.getElementById("moodModal");
const submitButton = document.querySelector(".submit-modal");

var taskList = []; //Array to store list of tasks

function loadTasks() { // Define function to save songs from localStorage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        taskList = JSON.parse(savedTasks);
        taskList.forEach((task) => displayTask(task));
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask(name, artist, genre, emoji) {
    let task = {
        name,
        artist,
        genre,
        emoji,
        id: Date.now()
    };
taskList.push(task);
displayTask(task);
showModal();
saveTasks();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    showModal();
});

submitButton.addEventListener("click", function () { //Allows modal to be submitted
    const emoji = getSelectedEmoji();
    addTask(
        form.elements.taskName.value,
        form.elements.taskArtist.value,
        form.elements.taskGenre.value,
        emoji
    );
   modal.style.display = "none"; //Hides modal
    });

function displayTask(task) { //Displays each task after form is submitted
    let item = document.createElement("li");
    item.setAttribute("data-id", task.id);
 
    let container = document.createElement("div");
    container.classList.add("task-container");
    
    let songInfo = document.createElement("div");
    songInfo.innerHTML = `
    <p><strong>${task.name}</strong><br>${task.artist}</p>
    <span class="genre">${task.genre}</span> 
    <span class="emoji">${task.emoji}</span>
    `;

    container.appendChild(songInfo);
    item.appendChild(container);
    tasklist.appendChild(item);

    form.reset();

let delButton = document.createElement("button"); //creating a button for users to delete the items added on the right hand side of the page whenever they would like to.
let delButtonText = document.createTextNode("X");
delButton.appendChild(delButtonText);
container.appendChild(delButton);
delButton.classList.add("delete-button"); 
delButton.addEventListener("click", function (event) {
    taskList.forEach(function (taskArrayElement, taskArrayIndex) {
        if (taskArrayElement.id == item.getAttribute('data-id')){
            taskList.splice(taskArrayIndex, 1)
        }
    })

    console.log(taskList)
    item.remove();
    saveTasks();
});
}

tasklist.style.listStyleType = "none";

let title = document.createElement("h3");
title.textContent = "Song List";
tasklist.prepend(title);
title.style.textAlign = "center";
title.style.margin = "10px 0";
title.style.color = "white";

let line = document.createElement("hr");
line.style.width = "100%";
line.style.border = "none";
line.style.borderTop = "1px solid white";
line.style.margin = "10px 0";
tasklist.prepend(line);

function handleMobileView() { //Allow tasklist element to move depending on the window width
    if(window.innerWidth <= 768) {
        document.body.appendChild(tasklist);
    } else {
        document.getElementById("rightSection").appendChild(tasklist);
    }
}

handleMobileView();
loadTasks();
window.addEventListener("resize", function() {
    handleMobileView()
});

function showModal() {
    modal.style.display = "block";
}

function getSelectedEmoji() {
    const options = document.querySelectorAll('input[name="emoji"]');
    for (const option of options) {
        if (option.checked) {
            return option.parentNode.querySelector(".emoji").textContent;

        }
    }
    return "";
}
