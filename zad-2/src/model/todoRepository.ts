import { type TodoItem } from "@/types.ts";

export class TodoRepository {
  private todos: TodoItem[] = [];

  constructor(todos: TodoItem[] = []) {
    this.todos = todos;
  }

  getTodos() {
    return this.todos;
  }

  addTodo(todo: TodoItem) {
    this.todos = [...this.todos, todo];
  }

  deleteByPredicate(predicate: (todo: TodoItem) => boolean) {
    this.todos = this.todos.filter(predicate);
  }
}
