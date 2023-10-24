export type TodoItem = {
  id: string;
  title: string;
  description: string;
  place: string;
  dueDate: Date;
};

export type Filters = {
  content?: string;
  fromDate?: Date | null;
  toDate?: Date | null;
};
