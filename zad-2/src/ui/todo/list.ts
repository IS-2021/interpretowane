import { CloseIcon } from "@/icons.ts";
import { type Repository } from "@/model/todo/repository.ts";
import { type TodoItem } from "@/types.ts";

export class TodoListUI {
  private todoListElement: HTMLDivElement;
  private todos: Repository;

  constructor(todoListElement: HTMLDivElement, todos: Repository) {
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

    this.todos.deleteByPredicate(
      (todo) => !todoContent.includes(todo.description),
    );
    this.rerenderTodoList();
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
  rerenderTodoList(filter?: string) {
    this.clearList();

    const todoItems = filter
      ? this.todos.getTodosBySearch(filter)
      : this.todos.getTodos();

    const todoElements = todoItems.map((todo) =>
      this.createTodoUIElement(todo),
    );
    todoElements.forEach((todoEl) => {
      this.todoListElement.appendChild(todoEl);
    });
  }
}
