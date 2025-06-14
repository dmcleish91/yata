import TodoList from "./TodoList";
import { useTodos } from "~/hooks/useTodos";
import type { Todo } from "~/types/todo";

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

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!todo.title.trim()) return;
    handleAddTodo(e);
  }

  function handleEdit(todoToEdit: Todo) {
    handleEditTodo(todoToEdit.todo_id);
  }

  return (
    <main className="w-full flex min-h-screen bg-base-100 p-4 rounded-3xl">
      <div className="flex flex-col gap-8 w-full max-w-6xl">
        <div className="p-6 border-2 mx-auto w-full">
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onEdit={handleEdit}
            onDelete={handleDeleteTodo}
            totalTodos={todos.length}
            todo={todo}
            setTodo={setTodo}
            tags={tags}
            setTags={setTags}
            isEditing={isEditing}
            onSubmit={handleFormSubmit}
            onCancel={clearEditAndResetTodo}
          />
        </div>
      </div>
    </main>
  );
}
