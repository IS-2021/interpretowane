import { CloseIcon } from "@/icons.ts";
import { type Repository } from "@/model/todo/repository.ts";
import { type Filters, type TodoItem } from "@/types.ts";

export class TodoListUI {
  private todoListElement: JQuery<HTMLTableElement>;
  private todos: Repository;

  constructor(todoListElement: JQuery<HTMLTableElement>, todos: Repository) {
    this.todoListElement = todoListElement;
    this.todos = todos;

    this.todoListElement.on("click", (e: Event) => {
      if (e.target instanceof HTMLButtonElement) {
        this.handleTodoClick(e);
      }
    });
  }

  /**
   * Remove all items from todo-list element.
   */
  clearList() {
    while (this.todoListElement.children(":first").length) {
      this.todoListElement.children(":first").remove();
    }
  }

  /**
   * Delete a single todo from UI and from an array reference.
   * @param e
   */
  handleTodoClick(e: Event) {
    const isTargetButton = e.target instanceof HTMLButtonElement;
    if (!isTargetButton) return;

    const todoId = e.target?.parentElement?.parentElement?.id;
    if (!todoId) return;

    this.todos.deleteById(todoId);
    this.rerenderTodoList();
  }

  /**
   * Crate a DOM Element that represents a single todo.
   * @param todo A todo object.
   */
  createTodoUIElement(todo: TodoItem): HTMLTableRowElement {
    const todoElement = document.createElement("tr");
    todoElement.id = todo.id;
    todoElement.innerHTML = `
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

    return todoElement;
  }

  /**
   * Rerender all todos.
   */
  rerenderTodoList(filters?: Filters) {
    this.clearList();

    const todoItems = this.todos.getTodosFromFilters(filters);

    const todoElements = todoItems.map((todo) =>
      this.createTodoUIElement(todo),
    );
    todoElements.forEach((todoEl) => {
      this.todoListElement.append(todoEl);
    });
  }
}
