import { Pencil, Trash2 } from 'lucide-react';
import type { Task } from '~/types/task';

/**
 * Props for the TaskItem component.
 */
export type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
};

/**
 * TaskItem component displays a single task in a DaisyUI card.
 */
export default function TaskItem({ task, editTask, deleteTask, onToggle }: TaskItemProps) {
  return (
    <div
      className='bg-base-100 shadow-sm w-full'
      tabIndex={0}
      aria-label={`Task: ${task.content}${task.description ? ', ' + task.description : ''}`}>
      <div className='p-3'>
        <div className='flex gap-3'>
          {/* Checkbox for completion */}
          <input
            type='checkbox'
            className='checkbox checkbox-success checkbox-sm mt-0.5'
            checked={!!task.is_completed}
            onChange={() => task.task_id && onToggle(task.task_id)}
            aria-label={`Mark "${task.content}" as ${task.is_completed ? 'incomplete' : 'complete'}`}
          />
          {/* Main content */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between gap-2'>
              <h3 className={`text-base font-medium ${task.is_completed ? 'text-base-content/50 line-through' : 'text-base-content'}`}>
                {task.content}
              </h3>
              <div className='flex items-center gap-1 flex-shrink-0'>
                <button type='button' className='btn btn-ghost btn-xs' onClick={() => editTask(task)} aria-label={`Edit "${task.content}"`}>
                  <Pencil className='w-3 h-3' />
                </button>
                <button
                  type='button'
                  className='btn btn-ghost btn-xs'
                  onClick={() => task.task_id && deleteTask(task.task_id)}
                  aria-label={`Delete "${task.content}"`}>
                  <Trash2 className='w-3 h-3' />
                </button>
              </div>
            </div>
            {/* Description */}
            {task.description && (
              <p
                className={`text-xs leading-relaxed mt-1 text-left ${task.is_completed ? 'text-base-content/40' : 'text-base-content/70'}`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
