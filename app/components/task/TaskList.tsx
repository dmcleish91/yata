import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import type { Task, NewTask } from "~/types/task";

/**
 * Props for the TaskList component.
 */
export type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  totalTasks: number;
  task: NewTask;
  setTask: (task: NewTask) => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
};

/**
 * TaskList component displays a list of tasks with empty state, using DaisyUI 5.
 */
export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  totalTasks,
  task,
  setTask,
  isEditing,
  onSubmit,
  onCancel,
}: TaskListProps) {
  // Empty state
  if (totalTasks === 0) {
    return (
      <div
        className="flex h-full w-96 flex-col pt-16 text-center"
        aria-live="polite"
        aria-label="No tasks"
      >
        <TaskForm
          task={task}
          setTask={setTask}
          isEditing={isEditing}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
        <div className="mt-4">
          <p className="max-w-sm">No tasks yet</p>
          <p className="text-base-content/60 max-w-sm">
            Start by adding your first task using the form above. Stay organized
            and productive!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-full w-96 max-w-full flex-col border pt-16 text-center"
      aria-label="Task List"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base-content text-2xl font-bold">
          Your Tasks
          <span className="text-base-content/60 ml-2 text-sm font-normal">
            ({totalTasks} total)
          </span>
        </h2>
      </div>
      {/* Task items list */}
      <ul className="space-y-4" aria-label="Task List">
        {tasks.map((task, index) => (
          <li
            key={task.task_id}
            className="animate-fade-in-right"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TaskItem
              task={task}
              onToggle={onToggle}
              editTask={onEdit}
              deleteTask={onDelete}
            />
          </li>
        ))}
      </ul>
      {/* Task Form */}
      <div className="mt-8">
        <TaskForm
          task={task}
          setTask={setTask}
          isEditing={isEditing}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
