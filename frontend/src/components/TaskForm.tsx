import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addTask, updateTask } from "../store/slices/taskSlice";

interface TaskFormProps {
  existingTask?: { _id: string; title: string; description: string; status: string };
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask, onClose }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(existingTask?.description || "");
  const [status, setStatus] = useState(existingTask?.status || "pending");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setError("");

    if (existingTask) {
      dispatch(updateTask({ _id: existingTask._id, title, description, status: status as "pending" | "in-progress" | "completed" }));
    } else {
      dispatch(addTask({ title, description, status: status as "pending" | "in-progress" | "completed" }));
    }
    onClose();
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100 shadow-lg">
      <h2 className="text-lg font-bold mb-2">{existingTask ? "Edit Task" : "Add Task"}</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium">
          Title:
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full my-2 rounded-md"
          />
        </label>

        <label className="block text-sm font-medium">
          Description:
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full my-2 rounded-md"
          />
        </label>

        <label className="block text-sm font-medium">
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full my-2 rounded-md">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {existingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
