export type Task = {
  task_id?: string;
  project_id?: string;
  content: string;
  description?: string | null;
  due_date?: string | null;
  due_datetime?: string | null;
  priority?: number;
  is_completed?: boolean | null;
  completed_at?: string | null;
  parent_task_id?: string | null;
  created_at?: string;
};

export type NewTask = Omit<Task, "is_completed" | "completed_at">;

export enum Priority {
  HIGHEST = 0,
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
  LOWEST = 4,
}
