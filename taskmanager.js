let task = []


function addTask(text, date, finish) {
    let newTask = {
        id : Date.now(),
        text: text,
        date: date,
        finish: finish,
        completed: false
    }
    task.push(newTask)
}

function renderTask() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    task.sort((a, b) => new Date(a.date) - new Date(b.date))

    task.forEach((item) => {
        let taskItem = document.createElement("li")
        const span = document.createElement("span")

        span.innerText = `${item.text} - ${item.date} - ${item.finish}`



        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            task = task.filter(t => t.id !== item.id);
            saveTask();
            renderTask();
        });

        const editButton = document.createElement("button")
        editButton.innerText = "Edit"
        editButton.addEventListener("click", () => {
            const newText = prompt("Enter new task text:", item.text)
            const newDate = prompt("Enter new task date:", item.date)
            const newFinish = prompt("Enter new task finish status:", item.finish)
            if (newText !== null) {
                item.text = newText
            }
            if (newDate !== null) {
                item.date = newDate
            }
            if (newFinish !== null) {
                item.finish = newFinish
            }
            saveTask()
            renderTask()
        });
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = item.completed
        checkbox.addEventListener("change", () => {
            item.completed = checkbox.checked
            saveTask()
            renderTask()
        })
        if (item.completed) {
            span.style.textDecoration = "line-through"

        }
        taskItem.appendChild(checkbox)
        taskItem.appendChild(span)


        taskItem.appendChild(deleteButton)
        taskItem.appendChild(editButton)
        taskList.appendChild(taskItem)
    })

}

function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(task))
}

function loadTask() {
    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
        task = JSON.parse(savedTasks)
        renderTask()
    }
}
document.getElementById("addTaskButton").addEventListener("click", () => {
    const text = document.getElementById("task-input").value
    const date = document.getElementById("time").value
    const finish = document.getElementById("time2").value
    
    if (text.trim() === "" || date.trim() === "" || finish.trim() === "") {
        alert("Please fill in all fields")
        return
    }
    else if (finish < date) {
        alert("Finish date cannot be earlier than the task date")
        return
    }
    else{
        addTask(text, date, finish)
        saveTask()
        renderTask()

    }


    document.getElementById("task-input").value = ""
    document.getElementById("time").value = ""
    document.getElementById("time2").value = ""
})
loadTask()

