import { type TodoItem } from "@/todoListTasks.ts";

type TodoItemFormData = {
  inputTitle: TodoItem["title"];
  inputDescription: TodoItem["description"];
  inputPlace: TodoItem["place"];
  inputDate: string;
};

export class TodoFormUI {
  private formElement: HTMLFormElement;

  constructor() {}

  /**
   * Attach to a HTMLFormElement and listen for onSubmit event.
   * @param formElement A form element DOM node.
   * @param onSubmitCallback A callback that will receive a form data.
   */
  attachTo(
    formElement: HTMLFormElement,
    onSubmitCallback: (todo: TodoItem) => void,
  ) {
    this.formElement = formElement;

    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      onSubmitCallback(this.getTodoFromForm());
    });
  }

  /**
   * Read form inputs and return a todo item.
   */
  getTodoFromForm(): TodoItem {
    const formData = Object.fromEntries(
      new FormData(this.formElement),
    ) as TodoItemFormData;

    return {
      title: formData.inputTitle,
      description: formData.inputDescription,
      place: formData.inputPlace,
      dueDate: new Date(formData.inputDate),
    };
  }
}
