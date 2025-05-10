import React from 'react';
import { useTodos } from '~/hooks/useTodos';
import TodoItem from './TodoItem';

const itemsPerPage = 4;

export default function TodoApp() {
  const {
    todos,
    todo,
    editTodoID,
    setTodo,
    handleToggleTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    clearEditAndResetTodo,
  } = useTodos();

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    if (todos.length <= itemsPerPage) {
      setCurrentPage(1);
    }
  }, [todos]);

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  return (
    <main className='flex items-center justify-center h-full bg-base-200'>
      <div className='card w-4/5 xl:w-2/4 bg-base-100 xl:h-[450px] shadow-xl p-8 flex flex-col-reverse xl:flex-row'>
        <div className='xl:w-1/2 xl:pr-4 mt-4 xl:mt-0 flex flex-col'>
          <h2 className='text-center text-2xl font-semibold mb-2'>
            {editTodoID ? 'Edit Todo' : 'Add Todo'}
          </h2>
          <form className='flex flex-col justify-between h-full' onSubmit={handleAddTodo}>
            <div className='form-control flex justify-between'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input
                type='text'
                placeholder='Enter title'
                className='input input-bordered'
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
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
                value={todo.description}
                onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                required></textarea>
            </div>
            <div className='form-control  flex justify-between'>
              <label className='label'>
                <span className='label-text'>Due Date</span>
              </label>
              <input
                type='date'
                className='input input-bordered'
                value={todo.due_date}
                onChange={(e) => setTodo({ ...todo, due_date: e.target.value })}
                required
              />
            </div>
            <div className='flex flex-row gap-2'>
              <button
                type='submit'
                className={`btn btn-success ${editTodoID ? 'w-3/4' : 'w-full'}`}>
                {editTodoID ? 'Edit Todo' : 'Add Todo'}
              </button>
              {editTodoID && (
                <button
                  type='button'
                  className={'btn btn-error w-1/4'}
                  onClick={clearEditAndResetTodo}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
        <div className='flex flex-col xl:w-1/2 xl:border-l pl-4'>
          <h2 className='text-center text-2xl font-semibold mb-2'>Todos</h2>
          <ul className='list space-y-2 flex-grow'>
            {currentTodos.map((todo) => (
              <TodoItem
                key={todo.todo_id}
                todo={todo}
                onToggle={handleToggleTodo}
                editTodo={handleEditTodo}
                deleteTodo={handleDeleteTodo}
              />
            ))}
          </ul>
          <div className='mt-2 flex justify-center'>
            {totalPages > 1 && (
              <div className='join'>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn ${
                      currentPage === index + 1 ? 'btn-active' : ''
                    }`}
                    onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
