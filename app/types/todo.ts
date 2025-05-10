export type Todo = {
  todo_id: number;
  title: string;
  description: string;
  is_completed: boolean;
  due_date: string;
  tags: string[];
};

export type NewTodo = Omit<Todo, 'is_completed' | 'tags'>;

export type TodoPreview = Pick<Todo, 'todo_id' | 'title' | 'is_completed'>;
