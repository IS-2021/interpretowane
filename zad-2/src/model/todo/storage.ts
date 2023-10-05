import { type TodoItem } from "@/types.ts";

export class TodoStorage {
  static storageKey = "todos";

  static save(todos: TodoItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  static load() {
    const storedData = localStorage.getItem(this.storageKey);

    let parsed: TodoItem[];
    try {
      parsed = JSON.parse(storedData ?? "[]") as TodoItem[];
    } catch (err) {
      console.error(err);
      parsed = [];
    }
    return parsed;
  }

  static exists() {
    return !!localStorage.getItem(this.storageKey);
  }
}
