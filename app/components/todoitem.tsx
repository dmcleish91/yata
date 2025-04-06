import type { Todo } from './todo';

function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: number) => void }) {
  return (
    <li className='list-row cursor-pointer' onClick={() => onToggle(todo.todo_id)}>
      <span className={todo.is_completed ? 'line-through' : ''}>{todo.title}</span>
    </li>
  );
}

export default TodoItem;
