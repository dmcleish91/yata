import {
  useState,
  createContext,
  useContext,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
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
import { combineTodayWithTime } from "~/libs/dateUtils";
import { logInfo } from "~/libs/logger";

type TaskContextType = {
  tasks: Task[];
  task: Task;
  setTask: (task: Task) => void;
  error: unknown;
  isLoading: boolean;
  editingTaskId: string | null;
  startEditingTask: (id: string) => void;
  cancelEditingTask: () => void;
  updateTask: (taskToUpdate: Task) => Promise<void>;
  handleToggleTask: (id: string) => Promise<void>;
  handleAddTask: (newTask: NewTask) => Promise<void>;
  handleDeleteTask: (id: string) => Promise<void>;
  completedTasks: Task[];
  incompleteTasks: Task[];
  totalTasks: number;
  isEditing: boolean;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

/**
 * Returns a default task object.
 * @returns A default task object.
 */
function getDefaultTask(): Task {
  return {
    content: "",
    description: "",
    priority: Priority.LOW,
    project_id: "",
    due_date: "",
    due_datetime: "",
  };
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const {
    data: tasksRaw,
    error,
    isLoading,
  } = useSWR(APIEndpoints.TASKS, fetchData<Task[]>);
  const tasks: Task[] = Array.isArray(tasksRaw) ? tasksRaw : [];

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [task, setTask] = useState<Task>(getDefaultTask());

  // Memoized Handlers
  const handleToggleTask = useCallback(
    async (id: string): Promise<void> => {
      const previousTasks = tasks;
      mutate(
        APIEndpoints.TASKS,
        (currentTasks: Task[] = []) =>
          currentTasks.map((t) =>
            t.task_id === id ? { ...t, is_completed: !t.is_completed } : t,
          ),
        false,
      );

      try {
        const response = await editResource<Partial<Task>, Task>(
          APIEndpoints.TOGGLE_TASK_COMPLETION(id),
          {},
          HttpMethod.PUT,
        );
        const updatedTask = response.data;

        mutate(
          APIEndpoints.TASKS,
          (currentTasks: Task[] = []) =>
            currentTasks.map((t) =>
              t.task_id === updatedTask.task_id ? updatedTask : t,
            ),
          false,
        );
        toast.success("Task updated");
      } catch (err) {
        mutate(APIEndpoints.TASKS, previousTasks, false);
        handleError(err);
        toast.error("Failed to toggle task. Please try again.");
      }
    },
    [tasks],
  );

  const handleAddTask = useCallback(
    async (newTask: NewTask): Promise<void> => {
      if (!newTask.content.trim()) {
        toast.error("Task content is required");
        return;
      }

      const payload: NewTask = {
        ...newTask,
        project_id: newTask.project_id || undefined,
        due_date: newTask.due_date
          ? new Date(newTask.due_date).toISOString()
          : undefined,
        due_datetime: newTask.due_datetime
          ? combineTodayWithTime(newTask.due_datetime)
          : undefined,
      };

      logInfo("handleAddTask Payload:", payload);

      const previousTasks = tasks;
      const optimisticNewTask: Task = {
        ...payload,
        task_id: crypto.randomUUID(),
        is_completed: false,
        completed_at: null,
        created_at: new Date().toISOString(),
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
        handleError(error);
        toast.error("Failed to add task. Please try again.");
      }
    },
    [tasks],
  );

  const updateTask = useCallback(
    async (taskToUpdate: Task): Promise<void> => {
      if (!taskToUpdate.task_id) {
        toast.error("Task ID is missing.");
        return;
      }
      if (!taskToUpdate.content.trim()) {
        toast.error("Task content is required");
        return;
      }

      const payload: Task = {
        ...taskToUpdate,
        due_date: taskToUpdate.due_date
          ? new Date(taskToUpdate.due_date).toISOString()
          : undefined,
        due_datetime: taskToUpdate.due_datetime
          ? combineTodayWithTime(taskToUpdate.due_datetime)
          : undefined,
      };

      logInfo("updateTask Payload:", payload);

      const previousTasks = tasks;
      const optimisticUpdatedTasks = tasks.map((t) =>
        t.task_id === payload.task_id ? payload : t,
      );
      mutate(APIEndpoints.TASKS, optimisticUpdatedTasks, false);
      setEditingTaskId(null);

      try {
        const response = await editResource<Task, Task>(
          APIEndpoints.EDIT_TASKS,
          payload,
          HttpMethod.PUT,
        );
        const updatedTask = response.data;
        mutate(
          APIEndpoints.TASKS,
          (currentTasks: Task[] = []) =>
            currentTasks.map((t) =>
              t.task_id === updatedTask.task_id ? updatedTask : t,
            ),
          false,
        );
        toast.success("Task successfully updated");
      } catch (error) {
        mutate(APIEndpoints.TASKS, previousTasks, false);
        handleError(error);
        toast.error("Failed to update task. Please try again.");
      }
    },
    [tasks],
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
      } catch (error) {
        mutate(APIEndpoints.TASKS, previousTasks, false);
        toast.error("Error deleting task. Please try again.");
      }
    },
    [tasks],
  );

  const cancelEditingTask = useCallback((): void => {
    setEditingTaskId(null);
  }, []);

  const startEditingTask = useCallback((id: string): void => {
    setEditingTaskId(id);
  }, []);

  const completedTasks = useMemo(
    () => (tasks ? tasks.filter((task) => task.is_completed) : []),
    [tasks],
  );
  const incompleteTasks = useMemo(
    () => (tasks ? tasks.filter((task) => !task.is_completed) : []),
    [tasks],
  );

  const totalTasks = tasks?.length || 0;

  const value = {
    tasks: tasks,
    task,
    setTask,
    error,
    isLoading,
    editingTaskId,
    startEditingTask,
    cancelEditingTask,
    updateTask,
    handleToggleTask,
    handleAddTask,
    handleDeleteTask,
    completedTasks,
    incompleteTasks,
    totalTasks,
    isEditing: !!editingTaskId,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// utility function to make using context easier in components
export function useTasks() {
  const currentTaskContext = useContext(TaskContext);
  if (!currentTaskContext) {
    throw new Error(
      "Task context is unavailable. " +
        "This usually means you are trying to use the useTasks() hook outside of an <TaskProvider>. " +
        "Please ensure your component is wrapped in <TaskProvider> at a higher level in the component tree.",
    );
  }
  return currentTaskContext;
}
