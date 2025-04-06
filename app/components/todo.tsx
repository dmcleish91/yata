import React from 'react';
import TodoItem from './todoitem';
import { useTodos } from '~/hooks/useTodos';

export default function TodoApp() {
  const {
    todos,
    newTodo,
    setNewTodo,
    handleToggleTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
  } = useTodos();

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 4;

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
              <TodoItem key={todo.todo_id} todo={todo} onToggle={handleToggleTodo} />
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
                value={newTodo.due_date}
                onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                required
              />
            </div>
            {/* <div className='form-control flex flex-row'>
              <label className='label mb-2'>
                <span className='label-text'>Tags (comma separated)</span>
              </label>
              <input
                type='text'
                placeholder='Enter tags'
                className='input input-bordered ml-auto'
                value={newTodo.tags.join(' ')}
                onChange={(e) =>
                  setNewTodo({ ...newTodo, tags: e.target.value.split(' ') })
                }
              />
            </div> */}
            <button type='submit' className='btn btn-primary w-full'>
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
