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
const taskForm = taskDialog.querySelector("form");
const taskList = document.querySelector("#task-list");

function getLocalDateString(date = new Date()) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

let selectedDate = getLocalDateString();

function renderTasks(date = selectedDate) {
	selectedDate = date;
	taskList.replaceChildren();

	const existingEmptyState = taskList.nextElementSibling;
	if (existingEmptyState?.classList.contains("empty-state")) {
		existingEmptyState.remove();
	}

	const selectedTasks = filterTasksByDate(selectedDate);
	if (selectedTasks.length === 0) {
		const emptyState = document.createElement("p");
		emptyState.className = "empty-state";
		emptyState.textContent = "Сегодня отдыхаем";
		taskList.after(emptyState);
		return;
	}

	for (const task of selectedTasks) {
		const item = document.createElement("li");
		const title = document.createElement("h3");
		const details = document.createElement("p");
		const status = document.createElement("p");

		item.dataset.taskId = task.id;
		title.textContent = task.title;
		details.textContent = `${task.subject} | ${task.date}`;
		status.textContent = task.isCompleted ? "Выполнена" : "Не выполнена";
		item.append(title, details, status);

		if (task.description) {
			const description = document.createElement("p");
			description.textContent = task.description;
			item.append(description);
		}

		taskList.append(item);
	}
}

addTaskButton.addEventListener("click", () => {
	taskForm.elements.date.value = selectedDate;
	taskDialog.showModal();
});

taskForm.addEventListener("submit", (event) => {
	event.preventDefault();

	if (event.submitter?.value === "cancel") {
		taskDialog.close();
		return;
	}

	const formData = new FormData(taskForm);
	const task = new Task({
		title: formData.get("title"),
		date: formData.get("date"),
		subject: formData.get("subject"),
		description: formData.get("description"),
		isCompleted: formData.has("completed"),
	});

	tasks.push(task);
	selectedDate = task.date;
	taskForm.reset();
	taskDialog.close();
	renderTasks(selectedDate);
});

renderTasks();