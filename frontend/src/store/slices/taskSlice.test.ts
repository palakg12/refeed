import taskReducer, { fetchTasks, addTask, updateTask, deleteTask, TaskState } from "./taskSlice";
import { AnyAction } from "@reduxjs/toolkit";

describe("taskSlice", () => {
  const initialState: TaskState = { tasks: [], loading: false, error: null };

  it("should return the initial state", () => {
    expect(taskReducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  it("should handle fetchTasks.pending", () => {
    const action = { type: fetchTasks.pending.type };
    expect(taskReducer(initialState, action)).toEqual({ ...initialState, loading: true });
  });

  it("should handle fetchTasks.fulfilled", () => {
    const mockTasks = [{ _id: "1", title: "Task 1", description: "Test", status: "pending" }];
    const action = { type: fetchTasks.fulfilled.type, payload: mockTasks };
    expect(taskReducer(initialState, action)).toEqual({ 
      ...initialState, 
      tasks: mockTasks,
      loading: false  // ✅ Ensure loading is reset
    });
  });

  it("should handle deleteTask.fulfilled", () => {
    const stateWithTasks = { 
      ...initialState, 
      tasks: [{ _id: "1", title: "Test", description: "Test", status: "pending" }] 
    };
    const action = { type: deleteTask.fulfilled.type, payload: "1" };
    expect(taskReducer(stateWithTasks, action)).toEqual({
      ...initialState,
      tasks: stateWithTasks.tasks.filter(task => task._id !== "1"), // ✅ Correct filtering logic
    });
  });

});
