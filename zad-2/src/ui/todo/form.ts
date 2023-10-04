import { type TodoItem } from "@/types.ts";

type TodoItemFormData = {
  inputTitle: TodoItem["title"];
  inputDescription: TodoItem["description"];
  inputPlace: TodoItem["place"];
  inputDate: string;
};

export class TodoFormUI {
  private readonly formElement: HTMLFormElement;

  constructor(formElement: HTMLFormElement) {
    this.formElement = formElement;
  }

  /**
   * Attach to a HTMLFormElement and listen for onSubmit event.
   * @param onSubmitCallback A callback that will receive a form data.
   */
  attachToOnSubmit(onSubmitCallback: (todo: TodoItem) => void) {
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
