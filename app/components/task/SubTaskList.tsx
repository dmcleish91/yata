import { useMemo, useState } from "react";
import { useTasks } from "~/contexts/TaskContext";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import type { NewTask } from "~/types/task";
import { Plus } from "lucide-react";

type SubTaskListProps = {
  parentId: string;
};

export default function SubTaskList({ parentId }: SubTaskListProps) {
  const {
    tasks,
    task,
    handleAddTask,
    editingTaskId,
    updateTask,
    cancelEditingTask,
    handleToggleTask,
    startEditingTask,
    handleDeleteTask,
  } = useTasks();
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const subTasks = useMemo(() => {
    return tasks.filter((task) => task.parent_task_id === parentId);
  }, [tasks, parentId]);

  async function handleSubmit(newTask: NewTask) {
    await handleAddTask({ ...newTask, parent_task_id: parentId });
    setShowAddTaskForm(false);
  }

  return (
    <div className="space-y-2">
      <ul>
        {subTasks.map((task) => {
          const isEditing = editingTaskId === task.task_id;
          return (
            <li key={task.task_id}>
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
                  onToggle={handleToggleTask}
                  editTask={() =>
                    task.task_id && startEditingTask(task.task_id)
                  }
                  deleteTask={handleDeleteTask}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div>
        {showAddTaskForm ? (
          <TaskForm
            task={task}
            isEditing={false}
            onSubmit={handleSubmit}
            onCancel={() => setShowAddTaskForm(false)}
          />
        ) : (
          <button
            onClick={() => setShowAddTaskForm(true)}
            className="flex h-auto items-center justify-start p-0 text-gray-500 hover:cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add sub-task
          </button>
        )}
      </div>
    </div>
  );
}
