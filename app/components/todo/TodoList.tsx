import TodoItem from './TodoItem';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { Todo } from '~/types/todo';

/**
 * Props for the TodoList component.
 */
export type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalTodos: number;
};

/**
 * TodoList component displays a list of todos with pagination and empty state, using DaisyUI 5.
 */
export default function TodoList({ todos, onToggle, onEdit, onDelete, currentPage, totalPages, onPageChange, totalTodos }: TodoListProps) {
  // Empty state
  if (totalTodos === 0) {
    return (
      <div className='card bg-base-100 shadow-lg w-full'>
        <div className='card-body flex flex-col items-center justify-center py-16 text-center'>
          <div className='w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-6'>
            <CheckCircle2 className='h-12 w-12 text-base-content/30' />
          </div>
          <h3 className='text-xl font-semibold text-base-content mb-2'>No todos yet</h3>
          <p className='text-base-content/60 max-w-sm'>
            Start by adding your first todo using the form on the left. Stay organized and productive!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-base-content'>
          Your Todos
          <span className='ml-2 text-sm font-normal text-base-content/60'>({totalTodos} total)</span>
        </h2>
      </div>
      {/* Todo items list */}
      <div className='space-y-4'>
        {todos.map((todo, index) => (
          <div key={todo.todo_id} className='animate-fade-in-right' style={{ animationDelay: `${index * 50}ms` }}>
            <TodoItem todo={todo} onToggle={onToggle} editTodo={onEdit} deleteTodo={onDelete} />
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className='card bg-base-100 shadow-sm w-full'>
          <div className='card-body flex flex-row items-center justify-between py-4'>
            <div className='text-sm text-base-content/70'>
              Page {currentPage} of {totalPages}
            </div>
            <div className='flex gap-2'>
              <button
                type='button'
                className='btn btn-outline btn-sm'
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label='Previous page'>
                <ChevronLeft className='h-4 w-4' />
                Previous
              </button>
              <button
                type='button'
                className='btn btn-outline btn-sm'
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label='Next page'>
                Next
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
