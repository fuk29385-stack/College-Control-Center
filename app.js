const addTaskButton = document.querySelector("#add-task-button");
const taskDialog = document.querySelector("#task-dialog");

addTaskButton.addEventListener("click", () => {
	taskDialog.showModal();
});