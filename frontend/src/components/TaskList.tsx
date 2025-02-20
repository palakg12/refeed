import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, Task } from "../store/slices/taskSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  console.log("Redux State:", useAppSelector((state) => state.tasks));
  
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Task List</h2>
      <button onClick={() => { setSelectedTask(null); setShowForm(true); }} className="bg-green-500 text-white px-4 py-2 my-2">
        + Add Task
      </button>


      {showForm && (
        <TaskForm
          existingTask={selectedTask ?? undefined}
          onClose={() => setShowForm(false)}/>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 my-2 flex justify-between">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setSelectedTask(task);
                  setShowForm(true);
                }}
                className="bg-yellow-500 text-white px-3 py-1 mx-1">
                Edit
              </button>
              <button onClick={() => dispatch(deleteTask(task._id))} className="bg-red-500 text-white px-3 py-1">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
