import "./scss/styles.scss";
// import * as bootstrap from "bootstrap";
import { TodoListUI } from "@/ui/todo/list.ts";
import { todoItems } from "@/todoListTasks.ts";
import { TodoFormUI } from "@/ui/todo/form.ts";

function getElement<TReturn extends Element>(selector: string): TReturn {
  const el = document.querySelector<TReturn>(selector);
  if (!el) {
    throw Error(`Element with ${selector} not found.`);
  }
  return el;
}

function main() {
  const todoListElement = getElement<HTMLDivElement>("#todoListView");
  const todoFormElement = getElement<HTMLFormElement>("form");

  const todoListUI = new TodoListUI(todoListElement, todoItems);
  const todoFormUI = new TodoFormUI();

  todoListUI.updateTodoList();
  todoFormUI.attachTo(todoFormElement, (todo) => {
    todoItems.push(todo);
    todoListUI.updateTodoList();
  });
}

document.addEventListener("DOMContentLoaded", main);
