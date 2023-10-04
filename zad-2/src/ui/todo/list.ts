import { type TodoItem } from "@/todoListTasks.ts";
import { CloseIcon } from "@/icons.ts";

export class TodoListUI {
  private todoListElement: HTMLDivElement;
  private todos: TodoItem[];

  constructor(todoListElement: HTMLDivElement, todos: TodoItem[]) {
    this.todoListElement = todoListElement;
    this.todos = todos;

    this.todoListElement.addEventListener("click", (e: Event) => {
      if (e.target instanceof HTMLButtonElement) {
        this.handleTodoClick(e);
      }
    });
  }

  /**
   * Remove all items from todo-list element.
   */
  clearList() {
    while (this.todoListElement.firstChild) {
      this.todoListElement.removeChild(this.todoListElement.firstChild);
    }
  }

  /**
   * Delete a single todo from UI and from an array reference.
   * @param e
   */
  handleTodoClick(e: Event) {
    const isTargetButton = e.target instanceof HTMLButtonElement;
    if (!isTargetButton) return;

    const todoContent = e.target.parentElement?.textContent?.trim();
    if (!todoContent) return;

    this.todos = this.todos.filter(
      (todo) => !todoContent.includes(todo.description),
    );
    this.updateTodoList();
  }

  /**
   * Crate a DOM Element that represents a single todo.
   * @param todo A todo object.
   */
  createTodoUIElement(todo: TodoItem): HTMLDivElement {
    const todoDiv = document.createElement("div");
    todoDiv.innerHTML = `
      <div class="todo alert alert-light fade show">
        <p>${todo.title} ${todo.description}</p>
        <button class="todo__button">
            ${CloseIcon}
        </button>
      </div>
    `;

    return todoDiv;
  }

  /**
   * Rerender all todos.
   */
  updateTodoList() {
    this.clearList();

    const todoElements = this.todos.map((todo) =>
      this.createTodoUIElement(todo),
    );
    todoElements.forEach((todoEl) => {
      this.todoListElement.appendChild(todoEl);
    });
  }
}
