/**
 * Represents a project as defined in the database schema.
 * @typedef {Project}
 */
export type Project = {
  /** Unique identifier for the project (UUID, primary key) */
  project_id: string;
  /** Associated user ID (UUID, foreign key) */
  user_id: string;
  /** Name of the project */
  project_name: string;
  /** Optional color for the project (string) */
  color?: string | null;
  /** Whether the project is the inbox */
  is_inbox?: boolean | null;
  /** Optional parent project ID (UUID, self-referencing foreign key) */
  parent_project_id?: string | null;
};
