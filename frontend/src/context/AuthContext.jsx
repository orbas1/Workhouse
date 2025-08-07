import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, me as fetchMe } from '../api/auth.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchMe();
        setUser(data);
        if (data?.id) {
          const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
          storage.setItem('userId', data.id);
        }
      } catch {
        setUser(null);
        localStorage.removeItem('userId');
        sessionStorage.removeItem('userId');
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function login(username, password, code, remember = true) {
    const data = await apiLogin(username, password, code, remember);
    if (data?.id) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('userId', data.id);
    }
    setUser(data);
  }

  function logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
