import type { Route } from "../+types/root";
import { ViewPort } from "~/components/ViewPort";
import TaskList from "~/components/task/TaskList";
import { useTasks } from "~/hooks/useTasks";
import type { Task } from "~/types/task";
import { useCallback } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "YATA" },
    { name: "description", content: "Welcome to Yet Another Todo App!" },
  ];
}

export default function Home() {
  const {
    tasks,
    task,
    setTask,
    handleToggleTask,
    handleAddTask,
    handleDeleteTask,
    updateTask,
    cancelEditingTask,
    editingTaskId,
    startEditingTask,
    totalTasks,
  } = useTasks();

  return (
    <ViewPort>
      <TaskList
        tasks={tasks}
        task={task}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onSubmit={handleAddTask}
        totalTasks={totalTasks}
        editingTaskId={editingTaskId}
        startEditingTask={startEditingTask}
        cancelEditingTask={cancelEditingTask}
        updateTask={updateTask}
      />
    </ViewPort>
  );
}
