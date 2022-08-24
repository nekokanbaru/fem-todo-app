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
      if (taskCheckbox.hasAttribute("checked")) {
        DeleteItemsLeft(--counter);
      } else {
        DeleteItemsLeft(++counter);
      }
    });

    let taskText = document.createElement("h2");
    taskText.addEventListener("click", () => {
      //create line through when checked
      taskCheckbox.toggleAttribute("checked");
      taskText.toggleAttribute("line-through");
      if (taskCheckbox.hasAttribute("checked")) {
        DeleteItemsLeft(--counter);
      } else {
        DeleteItemsLeft(++counter);
      }
    });
    taskText.innerText = task.title;
    if (task.completed == true) {
      //check if task is completed on load, if it is make it checked
      taskText.toggleAttribute("line-through");
      taskCheckbox.toggleAttribute("checked");
      --counter;
    }

    let taskClose = document.createElement("img");
    taskClose.src = "./images/icon-cross.svg";
    taskClose.className = "task-close";

    // let taskClose = document.createElement("svg");

    // let taskCloseUse = document.createElement("use");
    // taskCloseUse.setAttribute("xlink:href", "./images/icons.svg#icon-cross");
    // taskClose.appendChild(taskCloseUse);

    taskClose.addEventListener("click", () => {
      taskClose.parentElement.remove();
      if (taskCheckbox.hasAttribute("checked")) {
        DeleteItemsLeft(counter);
      } else {
        DeleteItemsLeft(--counter);
      }
    });

    let checkboxAndText = document.createElement("div"); //checkbox and text have to be in the same div so that text-with-cb can be justify content: space between
    checkboxAndText.className = "checkbox-and-text";
    checkboxAndText.appendChild(taskCheckbox);
    checkboxAndText.appendChild(taskText);
    // taskDiv.appendChild(taskCheckbox);
    // taskDiv.appendChild(taskText);
    taskDiv.appendChild(checkboxAndText);

    taskDiv.appendChild(taskClose);

    taskContainer.append(taskDiv);
    counter++;
  });
  ItemsLeft(counter);

  const selectMode = document.querySelector("#select-mode");
  const selectModee = document.querySelector("#select-modee");
  selectMode.addEventListener("click", () => {
    // selectMode.toggleAttribute("change-mode");
    if (
      selectModee.getAttribute("xlink:href") == "./images/icons.svg#icon-sun"
    ) {
      selectModee.setAttribute("xlink:href", "./images/icons.svg#icon-moon");
    } else {
      selectModee.setAttribute("xlink:href", "./images/icons.svg#icon-sun");
    }

    const body = document.querySelector("body");
    body.toggleAttribute("light-mode");

    const textWithCb = document.querySelectorAll(".text-with-cb");
    textWithCb.forEach((element) => {
      element.toggleAttribute("light-mode");
    });

    const taskContainer = document.querySelector(".task-container");
    taskContainer.toggleAttribute("light-mode");

    const taskFooter = document.querySelector(".task-footer");
    taskFooter.toggleAttribute("light-mode");

    const filterTasks = document.querySelector(".filter-tasks");
    filterTasks.toggleAttribute("light-mode");

    const dragAndDrop = document.querySelector(".drag-and-drop");
    dragAndDrop.toggleAttribute("light-mode");

    const roundCheckbox = document.querySelectorAll(".round-checkbox");
    roundCheckbox.forEach((element) => {
      element.toggleAttribute("light-mode");
    });
  });
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
    taskText.addEventListener("click", () => {
      //create line through when checked
      taskCheckbox.toggleAttribute("checked");
      taskText.toggleAttribute("line-through");
    });
    taskText.innerText = taskInput.value;

    let checkboxAndText = document.createElement("div");
    checkboxAndText.className = "checkbox-and-text";
    checkboxAndText.appendChild(taskCheckbox);
    checkboxAndText.appendChild(taskText);
    taskDiv.appendChild(checkboxAndText);

    let taskClose = document.createElement("img");
    taskClose.src = "./images/icon-cross.svg";
    taskClose.className = "task-close";
    taskDiv.appendChild(taskClose);

    taskClose.addEventListener("click", () => {
      taskClose.parentElement.remove();
      if (taskCheckbox.hasAttribute("checked")) {
        DeleteItemsLeft(counter);
      } else {
        DeleteItemsLeft(--counter);
      }
    });

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

    taskText.addEventListener("click", () => {
      if (taskCheckbox.hasAttribute("checked")) {
        DeleteItemsLeft(--counter);
      } else {
        DeleteItemsLeft(++counter);
      }
    });

    const body = document.querySelector("body");
    if (body.hasAttribute("light-mode")) {
      taskDiv.toggleAttribute("light-mode");
    }
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
  let taskFooterCount = document.createElement("p"); //text for items left
  taskFooterCount.innerText = count + " items left";

  const body = document.querySelector("body");
  if (body.hasAttribute("light-mode")) {
    taskFooter.toggleAttribute("light-mode");
  }

  taskFooter.appendChild(taskFooterCount);

  //filter on small screens

  const filterActive = document.querySelector(".filter-active");
  let filterActiveCopy = filterActive.cloneNode(true);
  const filterAll = document.querySelector(".filter-all");
  let filterAllCopy = filterAll.cloneNode(true);
  const filterCompleted = document.querySelector(".filter-completed");
  let filterCompletedCopy = filterCompleted.cloneNode(true);
  const taskFooterFilter = document.createElement("div");
  taskFooterFilter.className = "task-footer-filter";
  taskFooterFilter.appendChild(filterAllCopy);
  taskFooterFilter.appendChild(filterActiveCopy);
  taskFooterFilter.appendChild(filterCompletedCopy);
  taskFooter.appendChild(taskFooterFilter);

  function resetFilterActive() {
    if (filterAll.hasAttribute("active-filter")) {
      filterAll.toggleAttribute("active-filter");
      filterAllCopy.toggleAttribute("active-filter");
    } else if (filterActive.hasAttribute("active-filter")) {
      filterActive.toggleAttribute("active-filter");
      filterActiveCopy.toggleAttribute("active-filter");
    } else if (filterCompleted.hasAttribute("active-filter")) {
      filterCompleted.toggleAttribute("active-filter");
      filterCompletedCopy.toggleAttribute("active-filter");
    }
  }

  function makeActiveFilter(filter, filterCopy) {
    if (!filter.hasAttribute("active-filter")) {
      filter.toggleAttribute("active-filter");
      filterCopy.toggleAttribute("active-filter");
    }
  }

  //to avoid writing two same add events for the copy and for the original
  [filterActive, filterActiveCopy].forEach((element) => {
    element.addEventListener("click", () => {
      let taskCheckboxes = taskContainer.querySelectorAll(".round-checkbox");
      let tasks = taskContainer.querySelectorAll(".text-with-cb");
      for (let i = 0; i < taskCheckboxes.length; i++) {
        //first reset all hidden tasks if there are any
        if (tasks[i].hasAttribute("hidden")) {
          tasks[i].toggleAttribute("hidden");
        }
      }
      //then hide all completed tasks
      for (let i = 0; i < taskCheckboxes.length; i++) {
        if (taskCheckboxes[i].hasAttribute("checked")) {
          tasks[i].toggleAttribute("hidden");
        }
      }

      resetFilterActive();
      makeActiveFilter(filterActive, filterActiveCopy);
    });
  });

  //to avoid writing two same add events for the copy and for the original
  [filterCompleted, filterCompletedCopy].forEach((element) => {
    element.addEventListener("click", () => {
      let taskCheckboxes = taskContainer.querySelectorAll(".round-checkbox");
      let tasks = taskContainer.querySelectorAll(".text-with-cb");
      for (let i = 0; i < taskCheckboxes.length; i++) {
        //first reset all hidden tasks if there are any
        if (tasks[i].hasAttribute("hidden")) {
          tasks[i].toggleAttribute("hidden");
        }
      }
      //then hide all active tasks
      for (let i = 0; i < taskCheckboxes.length; i++) {
        if (taskCheckboxes[i].hasAttribute("checked") == false) {
          tasks[i].toggleAttribute("hidden");
        }
      }

      resetFilterActive();
      makeActiveFilter(filterCompleted, filterCompletedCopy);
    });
  });

  //to avoid writing two same add events for the copy and for the original
  [filterAll, filterAllCopy].forEach((element) => {
    element.addEventListener("click", () => {
      let taskCheckboxes = taskContainer.querySelectorAll(".round-checkbox");
      let tasks = taskContainer.querySelectorAll(".text-with-cb");
      for (let i = 0; i < taskCheckboxes.length; i++) {
        //unhide all tasks
        if (tasks[i].hasAttribute("hidden")) {
          tasks[i].toggleAttribute("hidden");
        }
      }

      resetFilterActive();
      makeActiveFilter(filterAll, filterAllCopy);
    });
  });

  //clear completed
  let ClearCompleted = document.createElement("p");
  ClearCompleted.innerText = "Clear Completed";
  ClearCompleted.className = "clear-completed";
  taskFooter.appendChild(ClearCompleted);

  const taskContainerWrapper = document.querySelector(
    ".task-container-wrapper"
  );
  taskContainerWrapper.appendChild(taskFooter);

  //clear completed items

  ClearCompleted.addEventListener("click", () => {
    let taskCheckboxes = taskContainer.querySelectorAll(".round-checkbox");
    let tasks = taskContainer.querySelectorAll(".text-with-cb");
    for (let i = 0; i < taskCheckboxes.length; i++) {
      if (taskCheckboxes[i].hasAttribute("checked")) {
        taskContainer.removeChild(tasks[i]);
      }
    }
  });
}

function DeleteItemsLeft(counter) {
  const taskContainerWrapper = document.querySelector(
    ".task-container-wrapper"
  );
  const taskFooter = document.querySelector(".task-footer");
  taskContainerWrapper.removeChild(taskFooter);
  ItemsLeft(counter);
}

new Sortable(taskContainer, {
  //drag and drop to reorder tasks
  animation: 350,
  selectedClass: "selected",
  forceFallback: true,
});
