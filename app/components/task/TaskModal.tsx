import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Flag,
  Inbox,
  MoreHorizontal,
  Plus,
  X,
} from "lucide-react";
import { useTasks } from "~/contexts/TaskContext";
import { useEffect, useState } from "react";
import { formatISO8601 } from "~/libs/dateUtils";
import SubTaskList from "./SubTaskList";

export default function TaskModal() {
  const {
    isModalOpen,
    closeModal,
    selectedTask,
    handleToggleTask,
    updateTask,
  } = useTasks();
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setDescription(selectedTask.description || "");
    }
  }, [selectedTask]);

  if (!isModalOpen || !selectedTask) {
    return null;
  }

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setDescription(event.target.value);
  }

  function handleSaveDescription() {
    if (selectedTask) {
      updateTask({ ...selectedTask, description });
    }
  }

  function handleToggle() {
    if (selectedTask?.task_id) {
      handleToggleTask(selectedTask.task_id);
    }
  }

  return (
    <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
      <div className="modal-box h-[600px] w-11/12 max-w-4xl p-0">
        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex flex-1 flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-b-black p-4">
              <div className="flex items-center gap-2">
                <Inbox className="h-4 w-4" />
                <span className="text-sm font-medium">Inbox</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="btn btn-ghost btn-square btn-sm">
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button className="btn btn-ghost btn-square btn-sm">
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button className="btn btn-ghost btn-square btn-sm">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                <button
                  className="btn btn-ghost btn-square btn-sm"
                  onClick={closeModal}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Task Content */}
            <div className="flex-1 space-y-6 p-6">
              {/* Task Title */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggle}
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    selectedTask.is_completed
                      ? "border-green-500 bg-green-500"
                      : "border-base-300 hover:border-base-400"
                  }`}
                >
                  {selectedTask.is_completed && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <h1 className="text-xl font-medium">{selectedTask.content}</h1>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="h-0.5 w-4 bg-gray-300"></div>
                  <span className="text-sm">Description</span>
                </div>
                <textarea
                  placeholder="Add a description..."
                  className="textarea textarea-ghost min-h-[80px] w-full resize-none p-0 focus:outline-none"
                  value={description}
                  onChange={handleDescriptionChange}
                  onBlur={handleSaveDescription}
                />
              </div>

              {/* Sub-tasks */}
              {selectedTask.task_id && (
                <SubTaskList parentId={selectedTask.task_id} />
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="bg-base-200 w-80 space-y-6 border-l border-l-black p-6">
            {/* Project */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Project</label>
              <div className="flex items-center gap-2">
                <Inbox className="h-4 w-4" />
                <span className="text-sm">Inbox</span>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {formatISO8601(
                    selectedTask.due_date,
                    selectedTask.due_datetime,
                  ) || "No date"}
                </span>
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                <span className="text-sm">{selectedTask.priority}</span>
              </div>
            </div>

            {/* Labels */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Labels</label>
                <button className="btn btn-ghost btn-square btn-sm h-6 w-6">
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </div>
  );
}
