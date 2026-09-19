const STORAGE_KEY = "offline-todo-list";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const themeLabel = document.querySelector(".theme-label");
const filterButtons = document.querySelectorAll(".filter-button");
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

let todos = loadTodos();
let currentFilter = "all";

// 優先使用使用者手動選擇的主題，否則依照作業系統設定初始化。
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem("todo-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return colorSchemeQuery.matches ? "dark" : "light";
}

// 從瀏覽器儲存空間讀取待辦資料，若資料損壞則回傳空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 儲存目前清單，讓重新整理頁面後仍能保留資料。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.replaceChildren();

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.classList.toggle("completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-check";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為已完成`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((itemTodo) => itemTodo.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  const incompleteTodos = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成: ${incompleteTodos} 項`;
  emptyState.textContent = getEmptyMessage(visibleTodos.length);
  emptyState.hidden = visibleTodos.length > 0;
}

function getEmptyMessage(visibleCount) {
  if (visibleCount > 0) return "";
  if (currentFilter === "active") return "目前沒有未完成的待辦事項。";
  if (currentFilter === "completed") return "目前沒有已完成的待辦事項。";
  return "還沒有任何待辦事項，新增一個吧!";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  todos.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text,
    completed: false
  });

  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("todo-theme", nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTodos();
  });
});

applyTheme(getInitialTheme());

colorSchemeQuery.addEventListener("change", (event) => {
  if (!localStorage.getItem("todo-theme")) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

renderTodos();
