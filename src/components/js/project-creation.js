import {
  projectForm,
  projectDIV,
  editProjectDialog,
  editProjectForm,
  projectList,
} from "../..";
import { LocalStorage } from "./local-storage-logic";
import { DOMCreation } from "./dom-creation";
import { addTaskBtn } from "./task-creation";

import editIcon from "../../img/edit-text.png";
import deleteIcon from "../../svg/delete-svgrepo-com.svg";

export class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.task = [];
    this.projectID = Date.now();
  }
}

export function saveProject(projectID) {
  const title = projectForm.elements["project-title"].value;
  const description = projectForm.elements["project-description"].value;
  const project = new Project(title, description);
  projectID = project.projectID;
  //check local storage for duplicated projectID
  if (localStorage.getItem(projectID) != null) {
    projectID = Date.now() + Math.floor(Math.random() * 9999);
  }
  localStorage.setItem("selectedProject", projectID);
  localStorage.setItem("projectList", projectID);
  //add id to project object
  LocalStorage.saveItem(projectID, project);
  projectList.push(projectID);
  //update project to local storage
  const savedProject = LocalStorage.retrieveItem("savedProject");
  savedProject[projectID] = project;
  LocalStorage.saveItem("savedProject", savedProject);
  //Project
  addProjectDOM(projectID, project);
}

export function addProjectDOM(projectID, project) {
  const wrapper = new DOMCreation("div", `Project-${projectID}`);
  wrapper.appendTo(projectDIV);
  const projectContainer = new DOMCreation("div", "project-container");
  projectContainer.appendTo(wrapper.element);
  //title, edit, delete button container
  const topContainer = new DOMCreation("div", "project-top-container");
  topContainer.appendTo(projectContainer.element);
  //Title
  const projectTitle = new DOMCreation("p", "project-title", project.title);
  projectTitle.element.setAttribute("id", `Project-Title-${projectID}`);
  projectTitle.appendTo(topContainer.element);
  //Description
  const projectDescription = new DOMCreation(
    "p",
    "project-description",
    project.description
  );
  projectDescription.element.setAttribute(
    "id",
    `Project-Description-${projectID}`
  );
  projectDescription.appendTo(projectContainer.element);
  //Add Task Button
  addTaskBtn(projectID, projectContainer.element);
  //Edit Project Button
  addEditProjectBtn(projectID, topContainer.element);
  //Add Delete Project Button
  const deleteBtn = new DOMCreation("img", "delete-project-btn");
  deleteBtn.element.src = deleteIcon;
  deleteBtn.appendTo(topContainer.element);
  deleteBtn.element.addEventListener("click", () => {
    const confirmationDialog = document.querySelector(
      "#delete-project-confirmation"
    );
    const projectToRemove = document.querySelector("#toBeRemove");
    confirmationDialog.showModal();
    const projectSelected = LocalStorage.retrieveItem(projectID);
    localStorage.setItem("selectedProject", projectID);
    projectToRemove.textContent = projectSelected.title;
  });
  //Task Section
  const taskSection = new DOMCreation("div", "task-section");
  taskSection.element.setAttribute("id", `Task-Section-${projectID}`);
  taskSection.appendTo(wrapper.element);
  //Nav
  addNavInteraction(projectID, project);
}

function addNavInteraction(projectID, project) {
  //Nav
  const nav = document.querySelector(".nav-list");
  const list = new DOMCreation("li", `List-${projectID}`, project.title);
  //switch between active project DOM
  list.element.addEventListener("click", function () {
    //remove active color if there is any active
    if (document.querySelector(".li-selected") != null) {
      const activeProject = document.querySelector(".li-selected");
      activeProject.classList.remove("li-selected");
    }
    projectList.forEach((project) => {
      const allProjectContainer = document.querySelector(`.Project-${project}`);
      if (allProjectContainer == null) {
        return;
      }
      allProjectContainer.style.display = "none";
      const activeContainer = document.querySelector(`.Project-${projectID}`);
      activeContainer.style.display = "block";
      list.element.classList.add("li-selected");
    });
  });
  //show current projectDOM
  projectList.forEach((project) => {
    const allProjectContainer = document.querySelector(`.Project-${project}`);
    if (allProjectContainer == null) {
      return;
    }
    allProjectContainer.style.display = "none";
    const activeContainer = document.querySelector(`.Project-${projectID}`);
    activeContainer.style.display = "block";
    if (document.querySelector(".li-selected") != null) {
      const activeProject = document.querySelector(".li-selected");
      activeProject.classList.remove("li-selected");
    }
    list.element.classList.add("li-selected");
  });
  list.appendTo(nav);
}

function addEditProjectBtn(projectID, projectContainer) {
  const editProjectBtn = new DOMCreation("img", "edit-project");
  editProjectBtn.element.src = editIcon;
  editProjectBtn.element.setAttribute("id", projectID);
  editProjectBtn.element.addEventListener("click", function () {
    showEditProjectModal(projectID);
  });
  editProjectBtn.appendTo(projectContainer);
}

export function showEditProjectModal(projectID) {
  editProjectDialog.showModal();
  const loadedProject = LocalStorage.retrieveItem(projectID);
  localStorage.setItem("selected", projectID);
  editProjectForm.elements["project-title"].value = loadedProject.title;
  editProjectForm.elements["project-description"].value =
    loadedProject.description;
}

export function saveEditedProject() {
  const projectID = localStorage.getItem("selected");
  const loadedProject = LocalStorage.retrieveItem(projectID);
  //Save new project details
  loadedProject.title = editProjectForm.elements["project-title"].value;
  loadedProject.description =
    editProjectForm.elements["project-description"].value;
  //update nav list
  const list = document.querySelector(`.List-${projectID}`);
  list.textContent = editProjectForm.elements["project-title"].value;
  LocalStorage.saveItem(projectID, loadedProject);
  //update savedProject local storage
  const savedProject = LocalStorage.retrieveItem("savedProject");
  savedProject[projectID] = loadedProject;
  LocalStorage.saveItem("savedProject", savedProject);

  updateProjectDOM(projectID);
}

export function updateProjectDOM(projectID) {
  const loadedProject = LocalStorage.retrieveItem(projectID);
  //Project Title
  const projectTitle = document.querySelector(`#Project-Title-${projectID}`);
  projectTitle.textContent = loadedProject.title;

  //Project Description
  const projectDescription = document.querySelector(
    `#Project-Description-${projectID}`
  );
  projectDescription.textContent = loadedProject.description;
}
