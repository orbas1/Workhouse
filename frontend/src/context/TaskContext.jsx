import React, { createContext, useContext, useState, useCallback } from 'react';
import { listTasks, createTask, updateTask, deleteTask } from '../api/tasks.js';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async (projectId) => {
    if (!projectId) return;
    const data = await listTasks(projectId);
    setTasks(data);
  }, []);

  const addTask = async (task) => {
    const created = await createTask(task);
    setTasks((prev) => [...prev, created]);
  };

  const editTask = async (taskId, updates) => {
    const updated = await updateTask(taskId, updates);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
  };

  const removeTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
