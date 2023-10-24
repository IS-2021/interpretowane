import { type Filters, type TodoItem } from "@/types.ts";
import { JSONBin } from "@/model/todo/jsonbin.ts";

export class Repository {
  private todos: TodoItem[] = [];

  constructor(todos: TodoItem[] = []) {
    this.todos = todos;
  }

  private save() {
    JSONBin.save(this.todos).catch((err) => console.error(err));
  }

  getTodos() {
    return this.todos;
  }

  getTodosBySearch(query: string) {
    return this.getTodos().filter(
      (todo) =>
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query),
    );
  }

  getTodosFromFilters(filters?: Filters) {
    let todos = this.getTodos();

    if (filters?.content) {
      const query = filters.content;

      todos = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query),
      );
    }

    if (filters?.fromDate && filters?.toDate) {
      const fromDate = filters.fromDate;
      const toDate = filters.toDate;
      todos = todos.filter(
        (todo) => fromDate <= todo.dueDate && todo.dueDate <= toDate,
      );
    }

    return todos;
  }

  setTodos(todos: TodoItem[]) {
    this.todos = todos;
  }

  addTodo(todo: TodoItem) {
    this.todos = [...this.todos, todo];
    this.save();
  }

  addTodos(newTodos: TodoItem[]) {
    this.todos = [...this.todos, ...newTodos];
    this.save();
  }

  deleteByPredicate(predicate: (todo: TodoItem) => boolean) {
    this.todos = this.todos.filter(predicate);
    this.save();
  }

  deleteById(todoId: TodoItem["id"]) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
    this.save();
  }
}
