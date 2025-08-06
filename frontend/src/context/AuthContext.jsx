import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, me as fetchMe } from '../api/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchMe();
        setUser(data);
        if (data?.id) {
          localStorage.setItem('userId', data.id);
        }
      } catch {
        setUser(null);
        localStorage.removeItem('userId');
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function login(username, password) {
    const data = await apiLogin({ username, password });
    if (data?.id) {
      localStorage.setItem('userId', data.id);
    }
    setUser(data);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
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
