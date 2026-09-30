const tasks = [];

class Task {
	constructor({
		id = crypto.randomUUID(),
		title = "",
		date = "",
		subject = "",
		description = "",
		isCompleted = false,
	} = {}) {
		this.id = id;
		this.title = String(title);
		this.date = String(date);
		this.subject = String(subject);
		this.description = String(description);
		this.isCompleted = Boolean(isCompleted);
	}
}

function filterTasksByDate(selectedDate) {
	return tasks.filter((task) => task.date === selectedDate);
}

const addTaskButton = document.querySelector("#add-task-button");
const taskDialog = document.querySelector("#task-dialog");

addTaskButton.addEventListener("click", () => {
	taskDialog.showModal();
});