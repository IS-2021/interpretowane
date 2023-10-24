import "./scss/styles.scss";
import JQuery from "jquery";
import { TodoListUI } from "@/ui/todo/list.ts";
import { TodoFormUI } from "@/ui/todo/form.ts";
import { getElement } from "@/utils.ts";
import { Repository } from "@/model/todo/repository.ts";
import { JSONBin } from "@/model/todo/jsonbin.ts";
import { type Filters } from "@/types.ts";

function main() {
  const todoListElement = getElement<HTMLTableElement>("#todoListView");
  const todoFormElement = getElement<HTMLFormElement>("form");
  const filterElement = getElement<HTMLInputElement>(
    "input[name=filterContent]",
  );
  const filterDateFromElement = getElement<HTMLInputElement>(
    "input[name=filterDateFrom]",
  );
  const filterDateToElement = getElement<HTMLInputElement>(
    "input[name=filterDateTo]",
  );

  // Clear inputs from start
  if (todoFormElement[0]) {
    todoFormElement[0].reset();
  }
  filterElement.val("");
  filterDateFromElement.val("");
  filterDateToElement.val("");

  const todoRepository = new Repository();
  const todoListUI = new TodoListUI(todoListElement, todoRepository);
  const todoFormUI = new TodoFormUI(todoFormElement);
  const filtersState: Filters = {
    content: undefined,
    toDate: undefined,
    fromDate: undefined,
  };

  todoFormUI.attachToOnSubmit((todo) => {
    todoRepository.addTodo(todo);
    todoListUI.rerenderTodoList();
  });

  filterElement.on("input", (e) => {
    if (e.target instanceof HTMLInputElement) {
      filtersState.content = e.target.value;
      todoListUI.rerenderTodoList(filtersState);
    }
  });
  filterDateFromElement.on("input", (e) => {
    if (e.target instanceof HTMLInputElement) {
      filtersState.fromDate = e.target.valueAsDate;
      todoListUI.rerenderTodoList(filtersState);
    }
  });
  filterDateToElement.on("input", (e) => {
    if (e.target instanceof HTMLInputElement) {
      filtersState.toDate = e.target.valueAsDate;
      todoListUI.rerenderTodoList(filtersState);
    }
  });

  JSONBin.load()
    .then((todos) => {
      const filteredTodos = todos?.filter((todo) => todo !== null);
      if (filteredTodos) {
        const todosWithDates = filteredTodos.map((todo) => ({
          ...todo,
          dueDate: new Date(todo.dueDate),
        }));
        todoRepository.setTodos(todosWithDates);
        todoListUI.rerenderTodoList();
      }
    })
    .catch((err) => console.error(err));
}

// .ready is deprecated, https://api.jquery.com/ready/
JQuery(main);
