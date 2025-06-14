import { Pencil, Trash2 } from "lucide-react";
import type { Todo } from "~/types/todo";

/**
 * Props for the TodoItem component.
 */
export type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
};

/**
 * TodoItem component displays a single todo in a DaisyUI card.
 */
export default function TodoItem({
  todo,
  editTodo,
  deleteTodo,
  onToggle,
}: TodoItemProps) {
  return (
    <div className="bg-base-100 shadow-sm w-full">
      <div className="p-3">
        <div className="flex gap-3">
          {/* Checkbox for completion */}
          <input
            type="checkbox"
            className="checkbox checkbox-success checkbox-sm mt-0.5"
            checked={todo.is_completed}
            onChange={() => onToggle(todo.todo_id)}
            aria-label={`Mark "${todo.title}" as ${
              todo.is_completed ? "incomplete" : "complete"
            }`}
          />
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3
                className={`text-base font-medium ${
                  todo.is_completed
                    ? "text-base-content/50 line-through"
                    : "text-base-content"
                }`}
              >
                {todo.title}
              </h3>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={() => editTodo(todo)}
                  aria-label={`Edit "${todo.title}"`}
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={() => deleteTodo(todo.todo_id)}
                  aria-label={`Delete "${todo.title}"`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            {/* Description */}
            {todo.description && (
              <p
                className={`text-xs leading-relaxed mt-1 ${
                  todo.is_completed
                    ? "text-base-content/40"
                    : "text-base-content/70"
                }`}
              >
                {todo.description}
              </p>
            )}
            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap mt-2">
              {(todo.tags ?? []).map((tag) => (
                <span key={tag} className="badge badge-neutral badge-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
