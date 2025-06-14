import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import type { Todo, NewTodo } from "~/types/todo";

/**
 * Props for the TodoList component.
 */
export type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  totalTodos: number;
  todo: NewTodo;
  setTodo: (todo: NewTodo) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
};

/**
 * TodoList component displays a list of todos with empty state, using DaisyUI 5.
 */
export default function TodoList({
  todos,
  onToggle,
  onEdit,
  onDelete,
  totalTodos,
  todo,
  setTodo,
  tags,
  setTags,
  isEditing,
  onSubmit,
  onCancel,
}: TodoListProps) {
  // Empty state
  if (totalTodos === 0) {
    return (
      <div className="w-full flex flex-col text-center">
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          tags={tags}
          setTags={setTags}
          isEditing={isEditing}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
        <div className="mt-4">
          <p className="max-w-sm">No todos yet</p>
          <p className="text-base-content/60 max-w-sm">
            Start by adding your first todo using the form above. Stay organized
            and productive!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-base-content">
          Your Todos
          <span className="ml-2 text-sm font-normal text-base-content/60">
            ({totalTodos} total)
          </span>
        </h2>
      </div>
      {/* Todo items list */}
      <div className="space-y-4">
        {todos.map((todo, index) => (
          <div
            key={todo.todo_id}
            className="animate-fade-in-right"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggle}
              editTodo={onEdit}
              deleteTodo={onDelete}
            />
          </div>
        ))}
      </div>
      {/* Todo Form */}
      <div className="mt-8">
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          tags={tags}
          setTags={setTags}
          isEditing={isEditing}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
