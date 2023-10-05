import "./scss/styles.scss";
import { TodoListUI } from "@/ui/todo/list.ts";
import { todoItems } from "@/todoListTasks.ts";
import { TodoFormUI } from "@/ui/todo/form.ts";
import { getElement } from "@/utils.ts";
import { Repository } from "@/model/todo/repository.ts";
import { TodoStorage } from "@/model/todo/storage.ts";

const defaultRepoData = !TodoStorage.exists() ? todoItems : undefined;

function main() {
  const todoListElement = getElement<HTMLDivElement>("#todoListView");
  const todoFormElement = getElement<HTMLFormElement>("form");

  const todoRepository = new Repository(defaultRepoData);
  const todoListUI = new TodoListUI(todoListElement, todoRepository);
  const todoFormUI = new TodoFormUI(todoFormElement);

  todoListUI.updateTodoList();
  todoFormUI.attachToOnSubmit((todo) => {
    todoRepository.addTodo(todo);
    todoListUI.updateTodoList();
  });
}

document.addEventListener("DOMContentLoaded", main);
