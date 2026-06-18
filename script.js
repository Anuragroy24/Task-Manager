  const body = document.body;
const taskForm = document.querySelector("#taskForm");
const taskTitleInput = document.querySelector("#taskTitle");
const taskCategorySelect = document.querySelector("#taskCategory");
const taskList = document.querySelector("#taskList");
const themeToggle = document.querySelector("#themeToggle");
const searchInput = document.querySelector("#taskSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const clearTasksButton = document.querySelector("#clearTasks");
const totalCounter = document.querySelector("#totalCounter");
const completedCounter = document.querySelector("#completedCounter");
const pendingCounter = document.querySelector("#pendingCounter");

let tasks = JSON.parse(localStorage.getItem("domTasks")) || [];

// Attribute vs Property demo:
// input.value is the live property. It changes while the user types.
// input.getAttribute("value") reads the original HTML attribute unless setAttribute changes it.
console.log("Property input.value:", taskTitleInput.value);
console.log("Attribute input.getAttribute('value'):", taskTitleInput.getAttribute("value"));

function saveTasks() {
  localStorage.setItem("domTasks", JSON.stringify(tasks));
}

function updateCounters() {
  const completed = tasks.filter((task) => task.status === "completed").length;
  totalCounter.textContent = tasks.length;
  completedCounter.textContent = completed;
  pendingCounter.textContent = tasks.length - completed;
}

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";

  card.setAttribute("data-id", task.id);
  card.setAttribute("data-status", task.status);
  card.setAttribute("data-category", task.category);

  if (card.hasAttribute("data-draft")) {
    card.removeAttribute("data-draft");
  }

  const title = document.createElement("h3");
  title.className = "task-title";
  title.appendChild(document.createTextNode(task.title));

  const meta = document.createElement("p");
  meta.className = "task-meta";
  
  meta.append(document.createTextNode(`${card.dataset.category} • ${card.getAttribute("data-status")}`));

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.dataset.action = "edit";
  editButton.textContent = "Edit";

  const completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.dataset.action = "complete";
  completeButton.textContent = task.status === "completed" ? "Undo" : "Complete";

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.textContent = "Delete";

  actions.append(editButton, completeButton, deleteButton);
  card.append(title, meta, actions);
  return card;
}

function getVisibleTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(query);
    const matchesCategory = category === "all" || task.category === category;
    return matchesSearch && matchesCategory;
  });
}

function renderTasks() {
  taskList.textContent = "";

  const fragment = document.createDocumentFragment();
  getVisibleTasks().forEach((task) => {
    fragment.append(createTaskCard(task));
  });

  taskList.append(fragment);
  updateCounters();
}

function addTask(title, category) {
  const task = {
    id: crypto.randomUUID(),
    title,
    category,
    status: "pending"
  };

  tasks.unshift(task);
  saveTasks();

  const newCard = createTaskCard(task);
  taskList.prepend(newCard);
  updateCounters();

  const note = document.createElement("p");
  note.className = "task-meta";
  note.textContent = "New task inserted with prepend().";
  newCard.before(note);
  note.after(newCard);
  setTimeout(() => note.remove(), 1200);
}

function editTask(card) {
  const task = tasks.find((item) => item.id === card.dataset.id);
  if (!task) return;

  const nextTitle = prompt("Edit task title:", task.title);
  if (!nextTitle || !nextTitle.trim()) return;

  task.title = nextTitle.trim();
  saveTasks();

  const updatedCard = createTaskCard(task);
  card.replaceWith(updatedCard);
}

function toggleComplete(card) {
  const task = tasks.find((item) => item.id === card.dataset.id);
  if (!task) return;

  task.status = task.status === "completed" ? "pending" : "completed";
  card.setAttribute("data-status", task.status);
  saveTasks();
  renderTasks();
}

function deleteTask(card) {
  tasks = tasks.filter((item) => item.id !== card.dataset.id);
  card.remove();
  saveTasks();
  updateCounters();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask(taskTitleInput.value.trim(), taskCategorySelect.value);
  taskTitleInput.value = "";
});

// Event delegation: one listener on the parent handles all task card buttons.
taskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const card = button.closest(".task-card");
  if (!card) return;

  const action = button.dataset.action;
  if (action === "edit") editTask(card);
  if (action === "complete") toggleComplete(card);
  if (action === "delete") deleteTask(card);
});

themeToggle.addEventListener("click", () => {
  const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
  body.dataset.theme = nextTheme;
  body.setAttribute("data-theme", nextTheme);
  body.classList.toggle("dark-mode", nextTheme === "dark");
  themeToggle.dataset.currentTheme = nextTheme;
  themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
  themeToggle.textContent = nextTheme === "dark" ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", nextTheme);
});

searchInput.addEventListener("input", renderTasks);
categoryFilter.addEventListener("change", renderTasks);

clearTasksButton.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

const grandparent = document.querySelector("#grandparent");
const parent = document.querySelector("#parent");
const childButton = document.querySelector("#childButton");

// Capturing runs from outer element to inner element before the target's bubbling phase.
grandparent.addEventListener("click", () => console.log("Capturing: Grandparent"), true);
parent.addEventListener("click", () => console.log("Capturing: Parent"), true);
childButton.addEventListener("click", () => console.log("Capturing: Child"), true);

// Bubbling runs from the clicked target back outward to its ancestors.
grandparent.addEventListener("click", () => console.log("Bubbling: Grandparent"));
parent.addEventListener("click", () => console.log("Bubbling: Parent"));
childButton.addEventListener("click", () => console.log("Bubbling: Child"));

const savedTheme = localStorage.getItem("theme") || "light";
body.dataset.theme = savedTheme;
body.setAttribute("data-theme", savedTheme);
body.classList.toggle("dark-mode", savedTheme === "dark");
themeToggle.dataset.currentTheme = savedTheme;
themeToggle.setAttribute("aria-pressed", String(savedTheme === "dark"));
themeToggle.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";

renderTasks();