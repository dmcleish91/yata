import { useState } from 'react';
import { Pencil, Trash2, Calendar, ChevronDown, ChevronUp, Clock, AlertTriangle } from 'lucide-react';
import type { Todo } from '~/types/todo';

/**
 * Props for the TodoItem component.
 */
export type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
};

/**
 * Returns the status and DaisyUI color classes for a due date.
 */
function getDueDateStatus(dueDate: string): { status: string; color: string; icon: React.ElementType | null } {
  if (!dueDate) return { status: 'none', color: 'bg-base-200 text-base-content', icon: null };
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) {
    return { status: 'overdue', color: 'bg-error text-error-content', icon: AlertTriangle };
  } else if (diffDays === 0) {
    return { status: 'today', color: 'bg-warning text-warning-content', icon: Clock };
  } else if (diffDays <= 3) {
    return { status: 'soon', color: 'bg-warning text-warning-content', icon: Clock };
  } else {
    return { status: 'future', color: 'bg-success text-success-content', icon: Calendar };
  }
}

/**
 * Formats a date string as "MMM DD, YYYY".
 */
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * TodoItem component displays a single todo in a DaisyUI card.
 */
export default function TodoItem({ todo, editTodo, deleteTodo, onToggle }: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dueDateInfo = getDueDateStatus(todo.due_date);
  const DueDateIcon = dueDateInfo.icon;

  return (
    <div className='card bg-base-100 shadow-md w-full'>
      <div className='card-body p-4'>
        <div className='flex items-start gap-4'>
          {/* Checkbox for completion */}
          <input
            type='checkbox'
            className='checkbox checkbox-success mt-1'
            checked={todo.is_completed}
            onChange={() => onToggle(todo.todo_id)}
            aria-label={`Mark "${todo.title}" as ${todo.is_completed ? 'incomplete' : 'complete'}`}
          />
          {/* Main content */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between gap-4 mb-2'>
              <h3 className={`text-lg font-semibold ${todo.is_completed ? 'text-base-content/50 line-through' : 'text-base-content'}`}>
                {todo.title}
              </h3>
              <div className='flex items-center gap-2 flex-shrink-0'>
                <button
                  type='button'
                  className='btn btn-square btn-sm btn-primary'
                  onClick={() => editTodo(todo)}
                  aria-label={`Edit "${todo.title}"`}>
                  <Pencil className='w-4 h-4' />
                </button>
                <button
                  type='button'
                  className='btn btn-square btn-sm btn-error'
                  onClick={() => deleteTodo(todo.todo_id)}
                  aria-label={`Delete "${todo.title}"`}>
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>
            </div>
            {/* Description with DaisyUI collapse */}
            {todo.description && (
              <div className='mb-2'>
                <div className='collapse collapse-arrow'>
                  <input
                    type='checkbox'
                    className='peer'
                    checked={isExpanded}
                    onChange={() => setIsExpanded((prev) => !prev)}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} description for "${todo.title}"`}
                    readOnly
                  />
                  <div
                    className='collapse-title text-sm font-medium flex items-center gap-1 cursor-pointer select-none'
                    onClick={() => setIsExpanded((prev) => !prev)}>
                    {isExpanded ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                    {isExpanded ? 'Hide details' : 'Show details'}
                  </div>
                  <div className='collapse-content'>
                    <p className={`text-sm leading-relaxed ${todo.is_completed ? 'text-base-content/40' : 'text-base-content/70'}`}>
                      {todo.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Tags and due date */}
            <div className='flex items-center justify-between gap-4 flex-wrap mt-2'>
              <div className='flex items-center gap-2 flex-wrap'>
                {(todo.tags ?? []).map((tag) => (
                  <span key={tag} className='badge badge-neutral text-xs'>
                    {tag}
                  </span>
                ))}
              </div>
              {todo.due_date && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${dueDateInfo.color}`}>
                  {DueDateIcon && <DueDateIcon className='h-3 w-3' />}
                  <span>Due {formatDate(todo.due_date)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
