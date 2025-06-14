import React, { useEffect } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useTodos } from "~/hooks/useTodos";
import type { Todo } from "~/types/todo";

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
    <main className="w-3/5 flex min-h-screen bg-base-200 p-4">
      <div className="flex flex-col gap-8 w-full max-w-6xl">
        {/* Form Card */}
        <div className="w-full">
          <TodoForm
            todo={todo}
            setTodo={setTodo}
            tags={tags}
            setTags={setTags}
            isEditing={isEditing}
            onSubmit={handleFormSubmit}
            onCancel={clearEditAndResetTodo}
          />
        </div>
        {/* Todo List Card */}
        <div className="w-full">
          <div className="p-6 border-2 mx-auto">
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
