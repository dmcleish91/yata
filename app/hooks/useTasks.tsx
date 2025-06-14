import { useState } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import {
  createResource,
  deleteResource,
  editResource,
  fetchData,
} from "~/libs/httpMethods";
import { handleError } from "~/libs/handleError";
import { Priority } from "~/types/task";
import type { Task, NewTask } from "~/types/task";

/**
 * API endpoints for tasks. Replace with actual endpoints as needed.
 */
const TaskAPIEndpoints = {
  TASKS: "/v1/tasks",
  EDIT_TASKS: "/v1/editTask",
  DELETE_TASKS: (task_id: string) => `/v1/tasks?task_id=${task_id}`,
};

/**
 * Custom hook for managing tasks, following the useTodos template and style guide.
 * Provides CRUD operations, optimistic updates, and error handling for Task objects.
 * @returns Task management state and handlers
 */
export function useTasks() {
  const {
    data: tasksRaw,
    error,
    isLoading,
  } = useSWR(TaskAPIEndpoints.TASKS, fetchData<Task[]>);
  const tasks: Task[] = Array.isArray(tasksRaw) ? tasksRaw : [];

  const [editTaskID, setEditTaskID] = useState<string | null>(null);
  const [task, setTask] = useState<NewTask>({
    task_id: "",
    project_id: "",
    user_id: "",
    content: "",
    description: "",
    due_date: "",
    date_datetime: "",
    priority: Priority.LOW,
    parent_task_id: null,
  });

  /**
   * Toggle the completion status of a task by ID (optimistic update).
   * @param id - Task UUID
   */
  function handleToggleTask(id: string): void {
    mutate(
      TaskAPIEndpoints.TASKS,
      (currentTasks: Task[] = []) =>
        currentTasks.map((t) =>
          t.task_id === id ? { ...t, is_completed: !t.is_completed } : t
        ),
      false
    );
  }

  /**
   * Add or edit a task (handles both create and update, with optimistic updates).
   * @param e - React form event
   */
  async function handleAddTask(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    // Validate required fields
    if (!task.content.trim()) {
      toast.error("Task content is required");
      return;
    }
    if (!task.project_id.trim()) {
      toast.error("Project ID is required");
      return;
    }
    if (!task.user_id.trim()) {
      toast.error("User ID is required");
      return;
    }
    const payload: NewTask = {
      ...task,
      due_date: task.due_date
        ? new Date(task.due_date).toISOString().split("T")[0]
        : undefined,
      date_datetime: task.date_datetime || undefined,
      priority: task.priority || Priority.LOW,
      description: task.description || undefined,
      parent_task_id: task.parent_task_id || undefined,
      task_id: editTaskID || "",
      project_id: task.project_id,
      user_id: task.user_id,
      content: task.content,
    };
    setTask({
      task_id: "",
      project_id: "",
      user_id: "",
      content: "",
      description: "",
      due_date: "",
      date_datetime: "",
      priority: Priority.LOW,
      parent_task_id: null,
    });

    if (editTaskID) {
      const previousTasks = tasks;
      const optimisticUpdatedTasks = tasks.map((t) =>
        t.task_id === editTaskID ? { ...t, ...payload } : t
      );
      mutate(TaskAPIEndpoints.TASKS, optimisticUpdatedTasks, false);
      try {
        const response = await editResource<typeof payload, Task>(
          TaskAPIEndpoints.EDIT_TASKS,
          payload
        );
        const updatedTask = response.data;
        mutate(
          TaskAPIEndpoints.TASKS,
          (currentTasks: Task[] = []) =>
            currentTasks.map((t) =>
              t.task_id === updatedTask.task_id ? updatedTask : t
            ),
          false
        );
        setEditTaskID(null);
        toast.success("Task successfully edited");
      } catch (error) {
        mutate(TaskAPIEndpoints.TASKS, previousTasks, false);
        setTask(payload);
        handleError(error);
      }
    } else {
      const previousTasks = tasks;
      const optimisticNewTask: Task = {
        ...payload,
        task_id: crypto.randomUUID(),
        is_completed: false,
        completed_at: null,
      };
      mutate(TaskAPIEndpoints.TASKS, [optimisticNewTask, ...tasks], false);
      try {
        const response = await createResource<typeof payload, Task>(
          TaskAPIEndpoints.TASKS,
          payload
        );
        const createdTask = response.data;
        mutate(
          TaskAPIEndpoints.TASKS,
          (currentTasks: Task[] = []) => [
            createdTask,
            ...currentTasks.filter(
              (t) => t.task_id !== optimisticNewTask.task_id
            ),
          ],
          false
        );
        toast.success("Task successfully added");
      } catch (error) {
        mutate(TaskAPIEndpoints.TASKS, previousTasks, false);
        setTask(payload);
        handleError(error);
      }
    }
  }

  /**
   * Delete a task by ID (optimistic update).
   * @param id - Task UUID
   */
  async function handleDeleteTask(id: string): Promise<void> {
    const previousTasks = tasks;
    mutate(
      TaskAPIEndpoints.TASKS,
      (currentTasks: Task[] = []) =>
        currentTasks.filter((t) => t.task_id !== id),
      false
    );
    try {
      const wasSuccessful = await deleteResource(
        TaskAPIEndpoints.DELETE_TASKS(id)
      );
      if (!wasSuccessful) {
        throw new Error("Failed to delete task");
      }
      toast.success("Successfully deleted task");
    } catch (error) {
      mutate(TaskAPIEndpoints.TASKS, previousTasks, false);
      toast.error("Error deleting task");
    }
  }

  /**
   * Reset the edit state and clear the task form.
   */
  function clearEditAndResetTask(): void {
    setEditTaskID(null);
    setTask({
      task_id: "",
      project_id: "",
      user_id: "",
      content: "",
      description: "",
      due_date: "",
      date_datetime: "",
      priority: Priority.LOW,
      parent_task_id: null,
    });
  }

  /**
   * Prepare a task for editing by ID.
   * @param id - Task UUID
   */
  function handleEditTask(id: string): void {
    const taskToEdit = tasks.find((t) => t.task_id === id);
    if (taskToEdit) {
      setEditTaskID(id);
      setTask({
        ...taskToEdit,
        due_date: taskToEdit.due_date ?? "",
        date_datetime: taskToEdit.date_datetime ?? "",
        description: taskToEdit.description ?? "",
        priority: taskToEdit.priority ?? Priority.LOW,
        parent_task_id: taskToEdit.parent_task_id ?? null,
      });
    } else {
      toast.error("Unable to edit task");
    }
  }

  return {
    tasks,
    error,
    isLoading,
    task,
    editTaskID,
    setTask,
    handleToggleTask,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    clearEditAndResetTask,
  };
}
