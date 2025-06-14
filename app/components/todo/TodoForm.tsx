import React from "react";
import { Plus, Edit3, X, CalendarDays, PlusIcon, Tag } from "lucide-react";
import { toast } from "sonner";
import type { NewTodo } from "~/types/todo";
import MinimalInput from "~/components/ui/MinimalInput";

interface TodoFormProps {
  todo: NewTodo;
  setTodo: (todo: NewTodo) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

/**
 * TodoForm component that handles the creation and editing of todos
 * @param props - Component props including todo data and handlers
 */
export default function TodoForm({
  todo,
  setTodo,
  tags,
  setTags,
  isEditing,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <MinimalInput
            placeholder="Add a Task"
            icon={PlusIcon}
            onChange={(value) => setTodo({ ...todo, title: value })}
            value={todo.title}
            required
          />
          <MinimalInput
            placeholder="Enter description"
            icon={PlusIcon}
            onChange={(value) => setTodo({ ...todo, description: value })}
            value={todo.description}
            required
          />
          <MinimalInput
            type="date"
            icon={CalendarDays}
            onChange={(value) => setTodo({ ...todo, due_date: value })}
            value={todo.due_date}
            required
          />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div key={index} className="badge badge-success gap-1 p-3">
                <span>{tag}</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-xs px-1"
                  onClick={() => {
                    setTags(tags.filter((_, i) => i !== index));
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <MinimalInput
            id="new-tag"
            icon={Tag}
            placeholder="Type a tag and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const newTag = e.currentTarget.value.trim();
                if (!newTag) return;
                if (newTag.length > 10) {
                  toast.error("Tag must be 10 characters or less");
                  return;
                }
                if (tags.includes(newTag)) {
                  toast.error("Tag already exists");
                  return;
                }
                setTags([...tags, newTag]);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className={`btn ${
              isEditing ? "btn-primary" : "btn-success"
            } flex-1 text-white`}
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
          {isEditing && onCancel && (
            <button
              type="button"
              className="btn btn-outline btn-error flex items-center gap-1"
              onClick={onCancel}
            >
              <X className="h-4 w-4" /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
