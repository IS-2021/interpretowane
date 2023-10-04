import { type TodoItem } from "@/todoListTasks.ts";

export class TodoListUI {
  private todoListElement: HTMLDivElement;
  private todos: TodoItem[];

  constructor(todoListElement: HTMLDivElement, todos: TodoItem[]) {
    this.todoListElement = todoListElement;
    this.todos = todos;
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
   * Crate a DOM Element that represents a single todo.
   * @param todo A todo object.
   */
  createTodoUIElement(todo: TodoItem): HTMLDivElement {
    const todoDiv = document.createElement("div");
    const todoText = document.createTextNode(
      `${todo.title} ${todo.description}`,
    );
    todoDiv.appendChild(todoText);

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
    todoElements.forEach((todoEl) => this.todoListElement.appendChild(todoEl));
  }
}
