// import axios from "axios";
const response = await fetch("task-list.json");
const json = await response.json();
const taskContainer = document.querySelector(".task-container");
let counter = 0;
async function printJSON() {
  json.tasks.map((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.className = "text-with-cb";

    let taskCheckbox = document.createElement("div");
    taskCheckbox.setAttribute("id", task.id); //store id's from json in the id attribute of the checkbox (need this to update the completed value in json)
    taskCheckbox.classList.add("round-checkbox");
    taskCheckbox.addEventListener("click", () => {
      //create line through when checked
      taskCheckbox.toggleAttribute("checked");
      taskText.toggleAttribute("line-through");
      let taskID = taskCheckbox.getAttribute("id");
      // const taskContainerWrapper = document.querySelector(
      //   ".task-container-wrapper"
      // );
      // const taskFooter = document.querySelector(".task-footer");
      // taskContainerWrapper.removeChild(taskFooter);
      // ItemsLeft(--counter);
      if (taskCheckbox.hasAttribute("checked")) {
        DeleteItemsLeft(--counter);
      } else {
        DeleteItemsLeft(++counter);
      }
    });

    let taskText = document.createElement("h2");
    taskText.innerText = task.title;
    if (task.completed == true) {
      //check if task is completed on load, if it is make it checked
      taskText.toggleAttribute("line-through");
      taskCheckbox.toggleAttribute("checked");
      --counter;
    }

    taskDiv.appendChild(taskCheckbox);
    taskDiv.appendChild(taskText);

    taskContainer.append(taskDiv);
    counter++;
  });
  ItemsLeft(counter);
  // json.tasks.forEach(() => {
  //   // console.log(json.tasks[i].title);

  //   let taskDiv = document.createElement("div");
  //   taskDiv.className = "text-with-cb";

  //   let taskCheckbox = document.createElement("div");
  //   taskCheckbox.setAttribute("id", json.tasks[i].id); //store id's from json in the id attribute of the checkbox (need this to update the completed value in json)
  //   taskCheckbox.classList.add("round-checkbox");
  //   taskCheckbox.addEventListener("click", () => {
  //     //create line through when checked
  //     taskCheckbox.toggleAttribute("checked");
  //     taskText.toggleAttribute("line-through");
  //     let taskID = taskCheckbox.getAttribute("id");
  //     // json.tasks[taskID].completed = !json.tasks[taskID].completed;
  //     // fs.writeFile("./task-list.json", JSON.stringify(json));
  //   });

  //   let taskText = document.createElement("h2");
  //   taskText.innerText = json.tasks[i].title;
  //   if (json.tasks[i].completed == true) {
  //     //check if task is completed on load, if it is make it checked
  //     taskText.toggleAttribute("line-through");
  //     taskCheckbox.toggleAttribute("checked");
  //   }

  //   taskDiv.appendChild(taskCheckbox);
  //   taskDiv.appendChild(taskText);

  //   taskContainer.append(taskDiv);
  //   i++;
  // });
}
printJSON();

const checkbox = document.querySelector(".round-checkbox");

checkbox.addEventListener("click", () => {
  checkbox.toggleAttribute("checked");
});

//add tasks on enter press

var taskInput = document.querySelector("#create-todo");
taskInput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let i = 0;
    let taskDiv = document.createElement("div");
    taskDiv.className = "text-with-cb";

    let taskCheckbox = document.createElement("div");
    taskCheckbox.setAttribute("id", json.tasks[i].id); //store id's from json in the id attribute of the checkbox (need this to update the completed value in json)
    taskCheckbox.classList.add("round-checkbox");
    taskCheckbox.addEventListener("click", () => {
      //create line through when checked
      taskCheckbox.toggleAttribute("checked");
      taskText.toggleAttribute("line-through");
    });
    let taskText = document.createElement("h2");
    taskText.innerText = taskInput.value;
    taskDiv.appendChild(taskCheckbox);
    taskDiv.appendChild(taskText);

    const inputCheckbox = document.querySelector("#cb-create-todo");
    if (inputCheckbox.hasAttribute("checked")) {
      taskCheckbox.toggleAttribute("checked");
      taskText.toggleAttribute("line-through");
      ItemsLeft(counter);
    } else {
      ItemsLeft(++counter);
    }

    taskCheckbox.addEventListener("click", () => {
      if (taskCheckbox.hasAttribute("checked")) {
        DeleteItemsLeft(--counter);
      } else {
        DeleteItemsLeft(++counter);
      }
    });

    taskContainer.append(taskDiv);
    i++;

    const taskContainerWrapper = document.querySelector(
      ".task-container-wrapper"
    );
    const taskFooter = document.querySelector(".task-footer");
    taskContainerWrapper.removeChild(taskFooter);

    taskInput.value = "";
  }
});

function ItemsLeft(count) {
  let taskFooter = document.createElement("div");
  taskFooter.className = "task-footer";
  let taskFooterCount = document.createElement("p");
  taskFooterCount.innerText = count + "items left";
  taskFooter.appendChild(taskFooterCount);

  const taskContainerWrapper = document.querySelector(
    ".task-container-wrapper"
  );
  taskContainerWrapper.appendChild(taskFooter);
}

function DeleteItemsLeft(counter) {
  const taskContainerWrapper = document.querySelector(
    ".task-container-wrapper"
  );
  const taskFooter = document.querySelector(".task-footer");
  taskContainerWrapper.removeChild(taskFooter);
  ItemsLeft(counter);
}
