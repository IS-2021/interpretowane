import { type TodoItem } from "@/types.ts";

export const todoItems: TodoItem[] = [
  {
    title: "Learn JS",
    description: "Create a demo application for my TODO's",
    place: "445",
    dueDate: new Date(2019, 10, 16),
  },
  {
    title: "Lecture test",
    description: "Quick test from the first three lectures",
    place: "F6",
    dueDate: new Date(2019, 10, 17),
  },
];
