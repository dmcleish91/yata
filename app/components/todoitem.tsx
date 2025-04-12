import type { Todo } from '~/hooks/useTodos';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  editTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

function TodoItem({ todo, editTodo, deleteTodo, onToggle }: TodoItemProps) {
  return (
    <li
      className='list-row cursor-pointer flex justify-between items-center'
      onClick={() => onToggle(todo.todo_id!)}>
      <span className={todo.is_completed ? 'line-through' : ''}>{todo.title}</span>
      <div className='space-x-2'>
        <button
          className='btn btn-sm btn-info w-24'
          onClick={(e) => {
            e.stopPropagation();
            editTodo(todo.todo_id);
          }}>
          EDIT
        </button>
        <button
          className='btn btn-sm btn-secondary w-24'
          onClick={(e) => {
            e.stopPropagation();
            deleteTodo(todo.todo_id);
          }}>
          DELETE
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
