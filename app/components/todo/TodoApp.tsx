import React, { useEffect } from 'react';
import { Plus, Edit3, X, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import TodoList from './TodoList';
import { useTodos } from '~/hooks/useTodos';
import type { Todo } from '~/types/todo';

const itemsPerPage = 4;

export default function TodoApp() {
  const {
    todos,
    todo,
    editTodoID,
    setTodo,
    tags,
    setTags,
    handleToggleTodo,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    clearEditAndResetTodo,
  } = useTodos();

  const isEditing = editTodoID !== null;

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  useEffect(() => {
    if (todos.length <= itemsPerPage) {
      setCurrentPage(1);
    }
  }, [todos]);

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!todo.title.trim()) return;
    handleAddTodo(e);
  }

  function handleEdit(todoToEdit: Todo) {
    handleEditTodo(todoToEdit.todo_id);
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-base-200 p-4'>
      <div className='flex flex-col gap-8 w-full max-w-6xl xl:flex-row xl:items-start xl:gap-8'>
        {/* Form Card */}
        <div className='w-full xl:w-1/3'>
          <div className='card bg-base-100 shadow-xl p-6'>
            <form className='space-y-6' onSubmit={handleAddTodo}>
              <div className='flex items-center gap-2 text-2xl font-semibold mb-2 text-base-content'>
                {isEditing ? (
                  <>
                    <Edit3 className='h-5 w-5 text-primary' /> Edit Todo
                  </>
                ) : (
                  <>
                    <Plus className='h-5 w-5 text-success' /> Add New Todo
                  </>
                )}
              </div>
              <div className='form-control'>
                <label className='label' htmlFor='title'>
                  <span className='label-text'>Task Title</span>
                </label>
                <input
                  id='title'
                  type='text'
                  placeholder='Enter task title'
                  className='input input-bordered w-full'
                  value={todo.title}
                  onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                  required
                />
              </div>
              <div className='form-control'>
                <label className='label' htmlFor='description'>
                  <span className='label-text'>Description</span>
                </label>
                <textarea
                  id='description'
                  className='textarea textarea-bordered w-full min-h-[100px]'
                  placeholder='Enter description'
                  value={todo.description}
                  onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                  required></textarea>
              </div>
              <div className='form-control'>
                <label className='label' htmlFor='due_date'>
                  <span className='label-text'>Due Date</span>
                </label>
                <div className='relative'>
                  <input
                    id='due_date'
                    type='date'
                    className='input input-bordered w-full pl-10'
                    value={todo.due_date}
                    onChange={(e) => setTodo({ ...todo, due_date: e.target.value })}
                    required
                  />
                  <CalendarDays className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/40' />
                </div>
              </div>{' '}
              <div className='form-control'>
                <label className='label' htmlFor='tags'>
                  <span className='label-text'>Tags</span>
                </label>
                <div className='flex flex-wrap gap-2 mb-2'>
                  {tags.map((tag, index) => (
                    <div key={index} className='badge badge-success gap-1 p-3'>
                      <span>{tag}</span>
                      <button
                        type='button'
                        className='btn btn-ghost btn-xs px-1'
                        onClick={() => {
                          setTags(tags.filter((_, i) => i !== index));
                        }}>
                        <X className='h-3 w-3' />
                      </button>
                    </div>
                  ))}
                </div>
                <div className='input-group'>
                  <input
                    id='new-tag'
                    type='text'
                    className='input input-bordered w-full'
                    placeholder='Type a tag and press Enter'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const newTag = e.currentTarget.value.trim();
                        if (!newTag) return;
                        if (newTag.length > 10) {
                          toast.error('Tag must be 10 characters or less');
                          return;
                        }
                        if (tags.includes(newTag)) {
                          toast.error('Tag already exists');
                          return;
                        }
                        setTags([...tags, newTag]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
              <div className='flex gap-3 pt-2'>
                <button
                  type='submit'
                  className={`btn ${
                    isEditing ? 'btn-primary' : 'btn-success'
                  } flex-1 text-white`}>
                  {isEditing ? 'Update Task' : 'Add Task'}
                </button>
                {isEditing && (
                  <button
                    type='button'
                    className='btn btn-outline btn-error flex items-center gap-1'
                    onClick={clearEditAndResetTodo}>
                    <X className='h-4 w-4' /> Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        {/* Todo List Card */}
        <div className='w-full xl:w-2/3'>
          <div className='card bg-base-100 shadow-xl p-6'>
            <TodoList
              todos={currentTodos}
              onToggle={handleToggleTodo}
              onEdit={handleEdit}
              onDelete={handleDeleteTodo}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalTodos={todos.length}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
