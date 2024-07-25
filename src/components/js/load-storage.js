import { projectList } from "../..";
import { LocalStorage } from "./local-storage-logic";
import { addProjectDOM } from "./project-creation";
import { addTaskDOM } from "./task-creation";

export function loadProject() {
  const savedProject = LocalStorage.retrieveItem("savedProject");
  for (let key in savedProject) {
    addProjectDOM(key, savedProject[key]);
    projectList.push(key);
  }
}

export function loadTask() {
  const savedProject = LocalStorage.retrieveItem("savedProject");
  for (let projectID in savedProject) {
    const tasksArray = savedProject[projectID].task;
    if (tasksArray.length > 0) {
      tasksArray.forEach((task) => {
        addTaskDOM(task);
      });
    }
  }
}
