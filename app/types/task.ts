/**
 * Represents a task as defined in the database schema.
 * @typedef {Task}
 */
export type Task = {
  /** Unique identifier for the task (UUID, primary key) */
  task_id: string;
  /** Associated project ID (UUID, foreign key) */
  project_id: string;
  /** Associated user ID (UUID, foreign key) */
  user_id: string;
  /** Main content of the task */
  content: string;
  /** Optional description of the task */
  description?: string | null;
  /** Optional due date (YYYY-MM-DD format) */
  due_date?: string | null;
  /** Optional time with time zone (ISO 8601 time string) */
  date_datetime?: string | null;
  /** Optional priority (smallint) */
  priority?: number;
  /** Whether the task is completed */
  is_completed?: boolean | null;
  /** Timestamp when the task was completed (ISO 8601 string) */
  completed_at?: string | null;
  /** Optional parent task ID (UUID, self-referencing foreign key) */
  parent_task_id?: string | null;
};

export enum Priority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

/**
 * Represents the payload for creating or editing a task (excluding completion fields).
 * @typedef {NewTask}
 */
export type NewTask = Omit<Task, 'is_completed' | 'completed_at'>;
