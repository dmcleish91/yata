import { Calendar, Pencil, Trash2 } from "lucide-react";
import { useTasks } from "~/contexts/TaskContext";
import { formatISO8601 } from "~/libs/dateUtils";
import type { Task } from "~/types/task";

/**
 * Props for the TaskItem component.
 */
export type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  editTask: () => void;
  deleteTask: (id: string) => void;
};

/**
 * TaskItem component displays a single task in a DaisyUI card.
 */
export default function TaskItem({
  task,
  editTask,
  deleteTask,
  onToggle,
}: TaskItemProps) {
  const { openModal } = useTasks();

  return (
    <div
      className="w-full cursor-pointer"
      tabIndex={0}
      aria-label={`Task: ${task.content}${task.description ? ", " + task.description : ""}`}
      onClick={() => openModal(task)}
    >
      <div className="p-3">
        <div className="flex gap-3">
          {/* Checkbox for completion */}
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              className="checkbox checkbox-success checkbox-sm"
              checked={!!task.is_completed}
              onChange={() => task.task_id && onToggle(task.task_id)}
              aria-label={`Mark "${task.content}" as ${task.is_completed ? "incomplete" : "complete"}`}
            />
          </div>
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3
                className={`text-base font-medium ${task.is_completed ? "text-base-content/50 line-through" : "text-base-content"}`}
              >
                {task.content}
              </h3>
              <div
                className="flex flex-shrink-0 items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={editTask}
                  aria-label={`Edit "${task.content}"`}
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={() => task.task_id && deleteTask(task.task_id)}
                  aria-label={`Delete "${task.content}"`}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
            {/* Description */}
            {task.description && (
              <p
                className={`mt-1 text-left text-xs leading-relaxed ${task.is_completed ? "text-base-content/40" : "text-base-content/70"}`}
              >
                {task.description}
              </p>
            )}
            {/* Due Date */}
            {task.due_date && (
              <div
                className={`mt-1 flex items-center gap-1.5 text-left text-xs leading-relaxed ${task.is_completed ? "text-base-content/40" : "text-base-content/70"}`}
              >
                <Calendar className="h-3 w-3" />
                <span>{formatISO8601(task.due_date, task.due_datetime)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
