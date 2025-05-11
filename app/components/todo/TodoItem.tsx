import { Pencil, Trash2 } from 'lucide-react';
import type { TodoPreview } from '~/types/todo';

type TodoItemProps = {
  todo: TodoPreview;
  onToggle: (id: number) => void;
  editTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

function TodoItem({ todo, editTodo, deleteTodo, onToggle }: TodoItemProps) {
  return (
    <li
      className='list-row cursor-pointer flex justify-between items-center'
      onClick={() => onToggle(todo.todo_id!)}>
      <span
        className={todo.is_completed ? 'line-through' : 'w-32 md:w-80 lg:w-96 2xl:w-fit'}>
        {todo.title}
      </span>
      <div className='flex flex-row gap-2 flex-wrap 2xl:flex-nowrap min-w-22'>
        <button
          className='btn btn-square btn-primary'
          onClick={(e) => {
            e.stopPropagation();
            editTodo(todo.todo_id);
          }}>
          <Pencil />
        </button>
        <button
          className='btn btn-square btn-secondary'
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.todo_id);
          }}>
          <Trash2 />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
