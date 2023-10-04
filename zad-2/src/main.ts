import "./scss/styles.scss";
import { TodoListUI } from "@/ui/todo/list.ts";
import { todoItems } from "@/todoListTasks.ts";
import { TodoFormUI } from "@/ui/todo/form.ts";
import { getElement } from "@/utils.ts";
import { TodoRepository } from "@/model/todoRepository.ts";

function main() {
  const todoListElement = getElement<HTMLDivElement>("#todoListView");
  const todoFormElement = getElement<HTMLFormElement>("form");

  const todoRepository = new TodoRepository(todoItems);
  const todoListUI = new TodoListUI(todoListElement, todoRepository);
  const todoFormUI = new TodoFormUI(todoFormElement);

  todoListUI.updateTodoList();
  todoFormUI.attachToOnSubmit((todo) => {
    todoItems.push(todo);
    todoListUI.updateTodoList();
  });
}

document.addEventListener("DOMContentLoaded", main);
