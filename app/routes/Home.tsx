import type { Route } from '../+types/root';
import { ViewPort } from '~/components/ViewPort';
import TaskList from '~/components/task/TaskList';
import { useTasks } from '~/hooks/useTasks';
import type { Task } from '~/types/task';
import { useCallback } from 'react';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'YATA' }, { name: 'description', content: 'Welcome to Yet Another Todo App!' }];
}

export default function Home() {
  const {
    tasks,
    task,
    setTask,
    handleToggleTask,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    clearEditAndResetTask,
    editTaskID,
    prepareEditTask,
  } = useTasks();

  const handleEdit = useCallback(
    (task: Task) => {
      if (task.task_id) {
        prepareEditTask(task.task_id);
      }
    },
    [prepareEditTask]
  );

  return (
    <ViewPort>
      <TaskList
        tasks={tasks}
        task={task}
        setTask={setTask}
        onToggle={handleToggleTask}
        onEdit={handleEdit}
        onDelete={handleDeleteTask}
        onSubmit={!!editTaskID ? handleEditTask : handleAddTask}
        onCancel={clearEditAndResetTask}
        isEditing={!!editTaskID}
        totalTasks={tasks.length}
      />
    </ViewPort>
  );
}
