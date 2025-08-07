import React, { createContext, useContext, useEffect, useState } from 'react';
import { getInstallStatus } from '../api/install.js';

const InstallContext = createContext(null);

export function InstallProvider({ children }) {
  const [installed, setInstalled] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const data = await getInstallStatus();
      setInstalled(Boolean(data?.installed));
    } catch {
      setInstalled(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <InstallContext.Provider value={{ installed, loading, refresh }}>
      {children}
    </InstallContext.Provider>
  );
}

export function useInstall() {
  return useContext(InstallContext);
}

