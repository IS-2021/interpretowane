import "./scss/styles.scss";
import { TodoListUI } from "@/ui/todo/list.ts";
import { TodoFormUI } from "@/ui/todo/form.ts";
import { getElement } from "@/utils.ts";
import { Repository } from "@/model/todo/repository.ts";
import { JSONBin } from "@/model/todo/jsonbin.ts";

function main() {
  const todoListElement = getElement<HTMLDivElement>("#todoListView");
  const todoFormElement = getElement<HTMLFormElement>("form");
  const filterElement = getElement<HTMLInputElement>("input[name=filter]");

  const todoRepository = new Repository();
  const todoListUI = new TodoListUI(todoListElement, todoRepository);
  const todoFormUI = new TodoFormUI(todoFormElement);

  todoFormUI.attachToOnSubmit((todo) => {
    todoRepository.addTodo(todo);
    todoListUI.rerenderTodoList();
  });

  filterElement.addEventListener("input", (e) => {
    if (e.target instanceof HTMLInputElement) {
      todoListUI.rerenderTodoList(e.target.value);
    }
  });

  JSONBin.load()
    .then((todos) => {
      if (todos) {
        todoRepository.setTodos(todos);
        todoListUI.rerenderTodoList();
      }
    })
    .catch((err) => console.log(err));
}

document.addEventListener("DOMContentLoaded", main);
