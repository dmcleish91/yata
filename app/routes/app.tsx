import { useState, type FormEvent } from 'react';

interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  tags: string[];
}

function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: number) => void }) {
  return (
    <li className='list-row cursor-pointer' onClick={() => onToggle(todo.id)}>
      <span className={todo.isCompleted ? 'line-through' : ''}>{todo.title}</span>
    </li>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Learn React',
      description: 'Study React components',
      isCompleted: false,
      dueDate: '2024-12-31',
      tags: ['react', 'learning'],
    },
    {
      id: 2,
      title: 'Build Todo App',
      description: 'Create a functional todo app',
      isCompleted: false,
      dueDate: '2024-12-25',
      tags: ['react', 'project'],
    },
    {
      id: 3,
      title: 'Deploy Todo App',
      description: 'Deploy to vercel',
      isCompleted: false,
      dueDate: '2024-12-25',
      tags: ['react', 'deployment'],
    },
    {
      id: 4,
      title: '???',
      description: 'How do we profit',
      isCompleted: false,
      dueDate: '2024-12-25',
      tags: ['react', 'project'],
    },
  ]);
  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
    dueDate: string;
    tags: string;
  }>({
    title: '',
    description: '',
    dueDate: '',
    tags: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();
    const newId = todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    setTodos([
      ...todos,
      {
        id: newId,
        title: newTodo.title,
        description: newTodo.description,
        isCompleted: false,
        dueDate: newTodo.dueDate,
        tags: newTodo.tags.split(',').map((tag) => tag.trim()),
      },
    ]);
    setNewTodo({ title: '', description: '', dueDate: '', tags: '' });
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number) => {
    // Implement edit logic here
    alert(`Edit todo with id ${id}`);
  };

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  return (
    <main className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-4/5 lg:w-2/4 bg-base-100 shadow-xl p-8 flex flex-col lg:flex-row'>
        <div className='flex flex-col lg:w-1/2 lg:border-r pr-4'>
          <h2 className='text-center text-2xl font-semibold mb-2'>Todos</h2>
          <ul className='list space-y-2 flex-grow'>
            {currentTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={handleToggleTodo} />
            ))}
          </ul>
          <div className='mt-2 flex justify-center'>
            <div className='join'>
              <button className='join-item btn btn-active'>1</button>
              <button className='join-item btn'>2</button>
              <button className='join-item btn'>3</button>
              <button className='join-item btn'>4</button>
            </div>
          </div>
          <div className='mt-2 flex gap-1'>
            <button
              className='btn btn-primary w-1/3'
              onClick={() => alert('Add not implemented')}>
              Add
            </button>
            <button className='btn btn-secondary w-1/3' onClick={() => handleEditTodo(1)}>
              Edit
            </button>
            <button className='btn btn-error w-1/3' onClick={() => handleDeleteTodo(1)}>
              Delete
            </button>
          </div>
        </div>
        <div className='lg:w-1/2 lg:pl-4 mt-4 lg:mt-0 flex flex-col'>
          <h2 className='text-center text-2xl font-semibold mb-2'>Add Todo</h2>
          <form className='flex flex-col justify-between h-full' onSubmit={handleAddTodo}>
            <div className='form-control flex justify-between'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input
                type='text'
                placeholder='Enter title'
                className='input input-bordered'
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                required
              />
            </div>
            <div className='form-control flex justify-between'>
              <label className='label'>
                <span className='label-text'>Description</span>
              </label>
              <textarea
                className='textarea textarea-bordered'
                placeholder='Enter description'
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                required></textarea>
            </div>
            <div className='form-control  flex justify-between'>
              <label className='label'>
                <span className='label-text'>Due Date</span>
              </label>
              <input
                type='date'
                className='input input-bordered'
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                required
              />
            </div>
            <div className='form-control flex flex-row'>
              <label className='label mb-2'>
                <span className='label-text'>Tags (comma separated)</span>
              </label>
              <input
                type='text'
                placeholder='Enter tags'
                className='input input-bordered ml-auto'
                value={newTodo.tags}
                onChange={(e) => setNewTodo({ ...newTodo, tags: e.target.value })}
              />
            </div>
            <button type='submit' className='btn btn-primary w-full'>
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
