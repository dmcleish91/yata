export type Task = {
  task_id?: string;
  project_id?: string;
  user_id?: string;
  content: string;
  description?: string | null;
  due_date?: string | null;
  due_datetime?: string | null;
  priority?: number;
  is_completed?: boolean | null;
  completed_at?: string | null;
  parent_task_id?: string | null;
};

export type NewTask = Omit<Task, 'is_completed' | 'completed_at'>;

export enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}
