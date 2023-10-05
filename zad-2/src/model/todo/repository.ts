import { type TodoItem } from "@/types.ts";
import { TodoStorage } from "@/model/todo/storage.ts";

export class Repository {
  private todos: TodoItem[] = [];

  constructor(todos: TodoItem[] = []) {
    this.todos = [...todos, ...TodoStorage.load()];
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

  addTodo(todo: TodoItem) {
    this.todos = [...this.todos, todo];
    TodoStorage.save(this.todos);
  }

  deleteByPredicate(predicate: (todo: TodoItem) => boolean) {
    this.todos = this.todos.filter(predicate);
    TodoStorage.save(this.todos);
  }
}
