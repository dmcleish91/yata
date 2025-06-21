import React, { useState, useEffect } from "react";
import { Plus, X, CalendarDays, PlusIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import type { Task, NewTask } from "~/types/task";
import MinimalInput from "~/components/ui/MinimalInput";
import {
  extractDateFromISO,
  extractTimeFromISO,
  getTodaysDateYYYYMMDD,
} from "~/libs/dateUtils";

interface TaskFormProps {
  task: NewTask | Task;
  isEditing: boolean;
  onSubmit: (task: NewTask | Task) => void;
  onCancel?: () => void;
}

/**
 * TaskForm component that handles the creation and editing of tasks
 * @param props - Component props including task data and handlers
 */
export default function TaskForm({
  task,
  isEditing,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [localTask, setLocalTask] = useState<NewTask | Task>({
    ...task,
    due_date: task.due_date ? extractDateFromISO(task.due_date) : "",
    due_datetime: task.due_datetime
      ? extractTimeFromISO(task.due_datetime)
      : "",
  });

  useEffect(() => {
    if (isEditing) {
      setLocalTask({
        ...task,
        due_date: task.due_date ? extractDateFromISO(task.due_date) : "",
        due_datetime: task.due_datetime
          ? extractTimeFromISO(task.due_datetime)
          : "",
      });
    } else {
      setLocalTask({ ...task, due_date: getTodaysDateYYYYMMDD() });
    }
  }, [task, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(localTask);
  };

  const contentId = "task-content-input";
  const descId = "task-desc-input";
  const dateId = "task-date-input";
  const timeId = "task-time-input";

  return (
    <div className="w-full max-w-96 p-2">
      <form onSubmit={handleSubmit} aria-label="Task Form">
        <div className="flex flex-col">
          <label htmlFor={contentId} className="sr-only">
            Task Content
          </label>
          <MinimalInput
            id={contentId}
            ariaLabel="Task Content"
            placeholder="Add a Task"
            icon={PlusIcon}
            onChange={(value) => setLocalTask({ ...localTask, content: value })}
            value={localTask.content}
            required
          />
          <label htmlFor={descId} className="sr-only">
            Task Description
          </label>
          <MinimalInput
            id={descId}
            ariaLabel="Task Description"
            placeholder="Enter description"
            icon={PlusIcon}
            onChange={(value) =>
              setLocalTask({ ...localTask, description: value })
            }
            value={localTask.description ?? ""}
          />
          <label htmlFor={dateId} className="sr-only">
            Due Date
          </label>
          <MinimalInput
            id={dateId}
            ariaLabel="Due Date"
            type="date"
            icon={CalendarDays}
            onChange={(value) =>
              setLocalTask({ ...localTask, due_date: value })
            }
            value={localTask.due_date ?? ""}
          />
          <label htmlFor={timeId} className="sr-only">
            Due Time
          </label>
          <MinimalInput
            id={timeId}
            ariaLabel="Due Time"
            type="time"
            icon={Clock}
            onChange={(value) =>
              setLocalTask({ ...localTask, due_datetime: value })
            }
            value={localTask.due_datetime ?? ""}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          {onCancel && (
            <button
              type="button"
              className="btn btn-outline btn-error flex items-center gap-1"
              onClick={onCancel}
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          )}
          <button
            type="submit"
            className={`btn ${isEditing ? "btn-primary" : "btn-success"} text-white`}
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}
