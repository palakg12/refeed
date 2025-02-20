import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get("http://localhost:5000/tasks");
  console.log("API Response:", response.data); // Debugging line
  return response.data;
});


export const addTask = createAsyncThunk("tasks/addTask", async (task: Omit<Task, "_id">) => {
  const response = await axios.post("http://localhost:5000/tasks", task);
  return response.data;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (task: Task) => {
  const response = await axios.put(`http://localhost:5000/tasks/${task._id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId: string, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data || "Failed to delete task");
  }
});


// Task Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })

      // Add Task
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })

      // Update Task
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })

      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
