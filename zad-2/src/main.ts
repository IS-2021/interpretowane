import "./scss/styles.scss";
// import * as bootstrap from "bootstrap";
import { TodoListUI } from "@/ui/todo/list.ts";
import { todoItems } from "@/todoListTasks.ts";
import { TodoFormUI } from "@/ui/todo/form.ts";
import { getElement } from "@/utils.ts";

function main() {
  const todoListElement = getElement<HTMLDivElement>("#todoListView");
  const todoFormElement = getElement<HTMLFormElement>("form");

  const todoListUI = new TodoListUI(todoListElement, todoItems);
  const todoFormUI = new TodoFormUI(todoFormElement);

  todoListUI.updateTodoList();
  todoFormUI.attachToOnSubmit((todo) => {
    todoItems.push(todo);
    todoListUI.updateTodoList();
  });
}

document.addEventListener("DOMContentLoaded", main);
