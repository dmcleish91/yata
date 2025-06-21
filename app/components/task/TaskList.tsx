import { useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import type { Task, NewTask } from "~/types/task";
import { Plus } from "lucide-react";

/**
 * Props for the TaskList component.
 */
export type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  totalTasks: number;
  task: NewTask;
  onSubmit: (task: NewTask) => void;
  editingTaskId: string | null;
  startEditingTask: (id: string) => void;
  cancelEditingTask: () => void;
  updateTask: (task: Task) => void;
};

/**
 * TaskList component displays a list of tasks with empty state, using DaisyUI 5.
 */
export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  totalTasks,
  task,
  onSubmit,
  editingTaskId,
  startEditingTask,
  cancelEditingTask,
  updateTask,
}: TaskListProps) {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  // Empty state
  if (totalTasks === 0) {
    return (
      <div
        className="flex h-full w-full max-w-96 flex-col pt-16 text-center"
        aria-live="polite"
        aria-label="No tasks"
      >
        <TaskForm task={task} isEditing={false} onSubmit={onSubmit} />
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
      className="flex h-full w-full max-w-96 flex-col pt-16 text-center"
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
        {tasks.map((task, index) => {
          const isEditing = editingTaskId === task.task_id;
          return (
            <li
              key={task.task_id}
              className="animate-fade-in-right"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {isEditing && task.task_id ? (
                <TaskForm
                  task={task}
                  isEditing={true}
                  onSubmit={updateTask}
                  onCancel={cancelEditingTask}
                />
              ) : (
                <TaskItem
                  task={task}
                  onToggle={onToggle}
                  editTask={() =>
                    task.task_id && startEditingTask(task.task_id)
                  }
                  deleteTask={onDelete}
                />
              )}
            </li>
          );
        })}
      </ul>
      {/* Task Form */}
      <div className="mt-8">
        {showAddTaskForm ? (
          <TaskForm
            task={task}
            isEditing={false}
            onSubmit={(newTask) => {
              onSubmit(newTask as NewTask);
              setShowAddTaskForm(false);
            }}
            onCancel={() => setShowAddTaskForm(false)}
          />
        ) : (
          <button
            type="button"
            className="btn btn-success text-white"
            onClick={() => setShowAddTaskForm(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </button>
        )}
      </div>
    </div>
  );
}
