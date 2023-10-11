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

    const todoContent =
      e.target?.parentElement?.parentElement?.textContent?.trim();
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
    const todoDiv = document.createElement("tr");
    todoDiv.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td>${new Date(todo.dueDate).toLocaleString()}</td>
        <td>${todo.place}</td>
        <td>
            <button class="todo__button">
              ${CloseIcon}
            </button>
        </td>
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
