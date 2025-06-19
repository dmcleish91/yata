import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";
import {
  createResource,
  deleteResource,
  editResource,
  fetchData,
  HttpMethod,
} from "~/libs/httpMethods";
import { handleError } from "~/libs/handleError";
import { Priority } from "~/types/task";
import type { Task, NewTask } from "~/types/task";
import { APIEndpoints } from "~/constants/api";
import { formatDateToMMDDYYYY, formatTimeTo12Hour } from "~/libs/dateUtils";

/**
 * Custom hook for managing tasks. Provides CRUD operations, optimistic updates, and error handling for Task objects.
 * @returns Task management state and handlers
 */
export function useTasks() {
  const {
    data: tasksRaw,
    error,
    isLoading,
  } = useSWR(APIEndpoints.TASKS, fetchData<Task[]>);
  const tasks: Task[] = Array.isArray(tasksRaw) ? tasksRaw : [];

  const [editTaskID, setEditTaskID] = useState<string | null>(null);
  const [task, setTask] = useState<Task>(getDefaultTask());

  // Memoized Handlers
  const handleToggleTask = useCallback((id: string): void => {
    mutate(
      APIEndpoints.TASKS,
      (currentTasks: Task[] = []) =>
        currentTasks.map((t) =>
          t.task_id === id ? { ...t, is_completed: !t.is_completed } : t,
        ),
      false,
    );
  }, []);

  const handleAddTask = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      if (!task.content.trim()) {
        toast.error("Task content is required");
        return;
      }

      const payload: NewTask = {
        project_id: undefined,
        content: task.content,
        description: task.description,
        priority: task.priority ?? Priority.LOW,
      };

      setTask(getDefaultTask());
      const previousTasks = tasks;
      const optimisticNewTask: Task = {
        ...payload,
        task_id: crypto.randomUUID(),
        is_completed: false,
        completed_at: null,
      } as Task;
      mutate(APIEndpoints.TASKS, [...tasks, optimisticNewTask], false);
      try {
        const response = await createResource<typeof payload, Task>(
          APIEndpoints.TASKS,
          payload,
        );
        const createdTask = response.data;
        mutate(
          APIEndpoints.TASKS,
          (currentTasks: Task[] = []) => [
            ...currentTasks.filter(
              (t) => t.task_id !== optimisticNewTask.task_id,
            ),
            createdTask,
          ],
          false,
        );
        toast.success("Task successfully added");
      } catch (error) {
        mutate(APIEndpoints.TASKS, previousTasks, false);
        setTask({
          ...task,
          content: payload.content as string,
          description: payload.description as string,
          priority: payload.priority as Priority,
          project_id: (payload.project_id as string) || "",
        });
        handleError(error);
        toast.error("Failed to add task. Please try again.");
      }
    },
    [task, tasks],
  );

  const handleEditTask = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      if (!editTaskID) {
        toast.error("No task selected for editing");
        return;
      }
      if (!task.content.trim()) {
        toast.error("Task content is required");
        return;
      }
      const payload: NewTask = {
        task_id: editTaskID,
        content: task.content,
        description: task.description || undefined,
        due_date: task.due_date
          ? formatDateToMMDDYYYY(task.due_date)
          : undefined,
        due_datetime: task.due_datetime
          ? formatTimeTo12Hour(task.due_datetime)
          : undefined,
        priority: task.priority || Priority.LOW,
        parent_task_id: task.parent_task_id || undefined,
        project_id: task.project_id || undefined,
      };

      setTask(getDefaultTask());
      const previousTasks = tasks;
      const optimisticUpdatedTasks = tasks.map((t) =>
        t.task_id === editTaskID ? { ...t, ...payload } : t,
      );
      mutate(APIEndpoints.EDIT_TASKS, optimisticUpdatedTasks, false);
      try {
        const response = await editResource<typeof payload, Task>(
          APIEndpoints.EDIT_TASKS,
          payload,
          HttpMethod.PUT,
        );
        const updatedTask = response.data;
        mutate(
          APIEndpoints.EDIT_TASKS,
          (currentTasks: Task[] = []) =>
            currentTasks.map((t) =>
              t.task_id === updatedTask.task_id ? updatedTask : t,
            ),
          false,
        );
        setEditTaskID(null);
        toast.success("Task successfully edited");
      } catch (error) {
        mutate(APIEndpoints.EDIT_TASKS, previousTasks, false);
        setTask({ ...task, ...payload });
        handleError(error);
        toast.error("Failed to edit task. Please try again.");
      }
    },
    [editTaskID, task, tasks],
  );

  const handleDeleteTask = useCallback(
    async (id: string): Promise<void> => {
      const previousTasks = tasks;
      mutate(
        APIEndpoints.TASKS,
        (currentTasks: Task[] = []) =>
          currentTasks.filter((t) => t.task_id !== id),
        false,
      );
      try {
        const wasSuccessful = await deleteResource(
          APIEndpoints.DELETE_TASKS(id),
        );
        if (!wasSuccessful) {
          throw new Error("Failed to delete task");
        }
        toast.success("Successfully deleted task");
      } catch (error) {
        mutate(APIEndpoints.TASKS, previousTasks, false);
        toast.error("Error deleting task. Please try again.");
      }
    },
    [tasks],
  );

  const clearEditAndResetTask = useCallback((): void => {
    setEditTaskID(null);
    setTask(getDefaultTask());
  }, []);

  const prepareEditTask = useCallback(
    (id: string): void => {
      const taskToEdit = tasks.find((t) => t.task_id === id);
      if (taskToEdit) {
        setEditTaskID(id);
        setTask({
          ...taskToEdit,
          due_date: taskToEdit.due_date ?? "",
          due_datetime: taskToEdit.due_datetime ?? "",
          description: taskToEdit.description ?? "",
          priority: taskToEdit.priority ?? Priority.LOW,
          parent_task_id: taskToEdit.parent_task_id ?? null,
        });
      } else {
        toast.error("Unable to edit task: Task not found.");
      }
    },
    [tasks],
  );

  // Memoize the returned object for stability
  return useMemo(
    () => ({
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
      prepareEditTask,
      clearEditAndResetTask,
    }),
    [
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
      prepareEditTask,
      clearEditAndResetTask,
    ],
  );
}

// Helper to get the default task state
function getDefaultTask(): Task {
  return {
    task_id: undefined,
    project_id: undefined,
    content: "",
    description: "",
    due_date: "",
    due_datetime: "",
    priority: Priority.LOW,
    parent_task_id: null,
  };
}
