import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../api/profile.js';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function fetchProfile() {
    if (!userId) return;
    const data = await getUserProfile(userId);
    setProfile(data);
  }

  async function saveProfile(updates) {
    if (!userId) throw new Error('No user id');
    const data = await updateUserProfile(userId, updates);
    setProfile(data);
    return data;
  }

  return (
    <ProfileContext.Provider value={{ profile, fetchProfile, saveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
