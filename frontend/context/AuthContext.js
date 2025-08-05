const { createContext, useContext, useState, useEffect } = React;

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await apiFetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error('Failed to load user', err);
      }
    }
    loadUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

window.AuthProvider = AuthProvider;
window.useAuth = useAuth;
