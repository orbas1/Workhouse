import React, { createContext, useContext, useState, useCallback } from 'react';
import { listTasks, createTask, updateTask, deleteTask, assignTask as apiAssignTask } from '../api/tasks.js';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async (projectId, params = {}) => {
    if (!projectId) return;
    const data = await listTasks(projectId, params);
    setTasks(data);
  }, []);

  const addTask = async (task) => {
    const created = await createTask(task);
    setTasks((prev) => [...prev, created]);
    return created;
  };

  const editTask = async (taskId, updates) => {
    const updated = await updateTask(taskId, updates);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
  };

  const removeTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const assign = async (taskId, assignee) => {
    const updated = await apiAssignTask({ taskId, assignee });
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    return updated;
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, editTask, removeTask, assign }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
