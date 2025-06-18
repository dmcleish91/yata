import React, { useState } from 'react';
import { Plus, X, CalendarDays, PlusIcon, Clock } from 'lucide-react';
import { toast } from 'sonner';
import type { NewTask } from '~/types/task';
import MinimalInput from '~/components/ui/MinimalInput';

interface TaskFormProps {
  task: NewTask;
  setTask: (task: NewTask) => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

/**
 * TaskForm component that handles the creation and editing of tasks
 * @param props - Component props including task data and handlers
 */
export default function TaskForm({ task, setTask, isEditing, onSubmit, onCancel }: TaskFormProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  // Generate unique IDs for accessibility
  const contentId = 'task-content-input';
  const descId = 'task-desc-input';
  const dateId = 'task-date-input';
  const timeId = 'task-time-input';

  // If editing, always show the form
  if (isEditing) {
    return (
      <div className='p-2 w-96'>
        <form onSubmit={onSubmit} aria-label='Task Form'>
          <div className='flex flex-col'>
            <label htmlFor={contentId} className='sr-only'>
              Task Content
            </label>
            <MinimalInput
              id={contentId}
              ariaLabel='Task Content'
              placeholder='Add a Task'
              icon={PlusIcon}
              onChange={(value) => setTask({ ...task, content: value })}
              value={task.content}
              required
            />
            <label htmlFor={descId} className='sr-only'>
              Task Description
            </label>
            <MinimalInput
              id={descId}
              ariaLabel='Task Description'
              placeholder='Enter description'
              icon={PlusIcon}
              onChange={(value) => setTask({ ...task, description: value })}
              value={task.description ?? ''}
              required
            />
            <label htmlFor={dateId} className='sr-only'>
              Due Date
            </label>
            <MinimalInput
              id={dateId}
              ariaLabel='Due Date'
              type='date'
              icon={CalendarDays}
              onChange={(value) => setTask({ ...task, due_date: value })}
              value={task.due_date ?? ''}
            />
            <label htmlFor={timeId} className='sr-only'>
              Due Time
            </label>
            <MinimalInput
              id={timeId}
              ariaLabel='Due Time'
              type='time'
              icon={Clock}
              onChange={(value) => setTask({ ...task, due_datetime: value })}
              value={task.due_datetime ?? ''}
            />
          </div>
          <div className='flex justify-end gap-3 pt-2'>
            <button type='submit' className='btn btn-primary text-white'>
              Update Task
            </button>
            {onCancel && (
              <button type='button' className='btn btn-outline btn-error flex items-center gap-1' onClick={onCancel}>
                <X className='h-4 w-4' /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  // If not editing, show either the button or the form
  if (!showForm) {
    return (
      <div className='p-2 w-fit'>
        <button
          type='button'
          className='btn btn-success text-white'
          onClick={() => {
            setShowForm(true);
            // setTask({
            //   ...task,
            //   due_date: getCurrentDate(),
            //   date_datetime: getCurrentTime(),
            // });
          }}>
          <Plus className='h-4 w-4 mr-2' /> Add New Task
        </button>
      </div>
    );
  }

  return (
    <div className='p-2 w-96'>
      <form
        onSubmit={(e) => {
          onSubmit(e);
          setShowForm(false);
        }}
        aria-label='Task Form'>
        <div className='flex flex-col'>
          <label htmlFor={contentId} className='sr-only'>
            Task Content
          </label>
          <MinimalInput
            id={contentId}
            ariaLabel='Task Content'
            placeholder='Add a Task'
            icon={PlusIcon}
            onChange={(value) => setTask({ ...task, content: value })}
            value={task.content}
            required
          />
          <label htmlFor={descId} className='sr-only'>
            Task Description
          </label>
          <MinimalInput
            id={descId}
            ariaLabel='Task Description'
            placeholder='Enter description'
            icon={PlusIcon}
            onChange={(value) => setTask({ ...task, description: value })}
            value={task.description ?? ''}
            required
          />
          <label htmlFor={dateId} className='sr-only'>
            Due Date
          </label>
          <MinimalInput
            id={dateId}
            ariaLabel='Due Date'
            type='date'
            icon={CalendarDays}
            onChange={(value) => setTask({ ...task, due_date: value })}
            value={task.due_date ?? ''}
          />
          <label htmlFor={timeId} className='sr-only'>
            Due Time
          </label>
          <MinimalInput
            id={timeId}
            ariaLabel='Due Time'
            type='time'
            icon={Clock}
            onChange={(value) => setTask({ ...task, due_datetime: value })}
            value={task.due_datetime ?? ''}
          />
        </div>
        <div className='flex justify-end gap-3 pt-2'>
          <button type='button' className='btn btn-outline btn-error flex items-center gap-1' onClick={() => setShowForm(false)}>
            <X className='h-4 w-4' /> Cancel
          </button>
          <button type='submit' className='btn btn-success text-white'>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
