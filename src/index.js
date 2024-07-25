import "./css/reset.css";
import "./css/style.css";

import taskDialogHTML from "./components/html/task-modal.html";
import projectDialogHTML from "./components/html/project-modal.html";
import editProjectDialogHTML from "./components/html/edit-project-modal.html";
import editTaskDialogHTML from "./components/html/edit-task-modal.html";
import removeProjectConfirmationHTML from "./components/html/comfirm-remove.html";

import {
  saveEditedProject,
  saveProject,
} from "./components/js/project-creation";
import { saveEditedTask, saveTask } from "./components/js/task-creation";
import { LocalStorage } from "./components/js/local-storage-logic";
import { loadProject, loadTask } from "./components/js/load-storage";

export {
  projectDIV,
  projectDialog,
  projectForm,
  taskDialog,
  taskForm,
  editProjectForm,
  editProjectDialog,
  editTaskDialog,
  editTaskForm,
  projectList,
};

document.getElementById("taskDialogHTML").innerHTML = taskDialogHTML;
document.getElementById("projectDialogHTML").innerHTML = projectDialogHTML;
document.getElementById("editProjectDialogHTML").innerHTML =
  editProjectDialogHTML;
document.getElementById("editTaskDialogHTML").innerHTML = editTaskDialogHTML;
document.getElementById("removeProjectConfirmationHTML").innerHTML =
  removeProjectConfirmationHTML;

const projectDIV = document.querySelector(".project");
let projectList = [];

//Create Project
const createProjectBtn = document.querySelector(".create-project");
const projectDialog = document.querySelector(".project-dialog");
const projectForm = document.getElementById("project-form");

createProjectBtn.addEventListener("click", function () {
  projectDialog.showModal();
  projectForm.reset();
});

projectForm.addEventListener("submit", function () {
  saveProject();
});

//Edit Project
const editProjectDialog = document.querySelector(".edit-project-dialog");
const editProjectForm = document.getElementById("project-edit");

editProjectForm.addEventListener("submit", function () {
  saveEditedProject();
});

function showFirstProject() {
  if (projectList.length > 0) {
    if (document.querySelector(".li-selected") != null) {
      const activeProject = document.querySelector(".li-selected");
      activeProject.classList.remove("li-selected");
    }
    const projectTop = projectList[0];
    projectList.forEach((project) => {
      const allProjectContainer = document.querySelector(`.Project-${project}`);
      if (allProjectContainer == null) {
        return;
      }
      allProjectContainer.style.display = "none";
      const activeContainer = document.querySelector(`.Project-${projectTop}`);
      if (activeContainer == null) {
        return;
      }
      activeContainer.style.display = "block";
      const list = document.querySelector(`.List-${projectTop}`);
      list.classList.add("li-selected");
    });
    //update projectDOM
    projectList.forEach((project) => {
      const allProjectContainer = document.querySelector(`.Project-${project}`);
      if (allProjectContainer == null) {
        return;
      }
      allProjectContainer.style.display = "none";
      const activeContainer = document.querySelector(`.Project-${projectTop}`);
      if (activeContainer == null) {
        return;
      }
      activeContainer.style.display = "block";
      if (document.querySelector(".li-selected") != null) {
        const activeProject = document.querySelector(".li-selected");
        activeProject.classList.remove("li-selected");
      }
      const list = document.querySelector(`.List-${projectTop}`);
      list.classList.add("li-selected");
    });
  }
}

//Delete Project
const yesDelete = document.querySelector("#yesDelete");
yesDelete.addEventListener("click", () => {
  const projectID = localStorage.getItem("selectedProject");
  const wrapper = document.querySelector(`.Project-${projectID}`);
  wrapper.remove();
  const navLi = document.querySelector(`.List-${projectID}`);
  navLi.remove();
  localStorage.removeItem(projectID);
  //update
  const savedProject = LocalStorage.retrieveItem("savedProject");
  delete savedProject[projectID];
  LocalStorage.saveItem("savedProject", savedProject);
  //update project list
  projectList = projectList.filter(
    (projectToRemove) => projectToRemove !== Number(projectID)
  );
  //show first project
  showFirstProject();
  const confirmationDialog = document.querySelector(
    "#delete-project-confirmation"
  );
  confirmationDialog.close();
});

const cancelDelete = document.querySelector("#cancelDelete");
cancelDelete.addEventListener("click", () => {
  const confirmationDialog = document.querySelector(
    "#delete-project-confirmation"
  );
  confirmationDialog.close();
});

//Create Task
const taskDialog = document.querySelector(".task-dialog");
const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", function () {
  saveTask();
});

//Edit Task
const editTaskDialog = document.querySelector(".edit-task-dialog");
const editTaskForm = document.getElementById("edit-task-form");

editTaskForm.addEventListener("submit", function () {
  saveEditedTask();
});

//default project
function defaultPage() {
  //project 1
  projectForm.elements["project-title"].value = "Home Renovation";
  projectForm.elements["project-description"].value =
    "Renovation for upcoming winter.";
  saveProject();
  //task 1
  taskForm.elements["task-title"].value =
    "Research contractors for kitchen remodel";
  taskForm.elements["task-description"].value =
    "Find and compare at least 3 reputable contractors who specialize in kitchen renovations. Check reviews, licenses, and portfolios.";
  taskForm.elements["task-due"].value = "2024-08-05";
  taskForm.elements["task-priority"].value = "Low";
  saveTask();
  //task 2
  taskForm.elements["task-title"].value = "Get quotes for new flooring";
  taskForm.elements["task-description"].value =
    "Contact local flooring companies and request quotes for hardwood or tile flooring for the living room and hallway (approximately 500 sq ft).";
  taskForm.elements["task-due"].value = "2024-05-15";
  taskForm.elements["task-priority"].value = "Medium";
  saveTask();

  //project 2
  projectForm.elements["project-title"].value = "Plan Summer Vacation";
  projectForm.elements["project-description"].value = "Japan here we go!!";
  saveProject();
  //task3
  taskForm.elements["task-title"].value = "Book flights and accommodation";
  taskForm.elements["task-description"].value =
    "Once the destination is chosen, search for and book airline tickets, hotel reservations, or rental accommodations (e.g., Airbnb, vacation home) for the desired travel dates and number of travelers.";
  taskForm.elements["task-due"].value = "2024-06-05";
  taskForm.elements["task-priority"].value = "High";
  saveTask();
  //task4
  taskForm.elements["task-title"].value =
    "Research local attractions and activities";
  taskForm.elements["task-description"].value =
    " Explore and compile a list of top-rated tourist attractions, cultural sites, outdoor activities, and dining options in the vacation destination to create an itinerary.";
  taskForm.elements["task-due"].value = "2024-07-05";
  taskForm.elements["task-priority"].value = "Medium";
  saveTask();
  //task 5
  taskForm.elements["task-title"].value = "Create a tentative itinerary";
  taskForm.elements["task-description"].value =
    "Based on the research, plan out a daily schedule with a balanced mix of activities, sightseeing, and relaxation time, ensuring you can cover all the desired attractions and experiences during the vacation.";
  taskForm.elements["task-due"].value = "2024-07-05";
  taskForm.elements["task-priority"].value = "Low";
  saveTask();
}

window.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("savedProject") == null) {
    localStorage.setItem("savedProject", "{}");
    defaultPage();
    showFirstProject();
  } else {
    loadProject();
    loadTask();
    showFirstProject();
  }
});
