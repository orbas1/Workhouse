import React, { useEffect, useState } from 'react';
import { Box, VStack, Spinner } from '@chakra-ui/react';
import NavBar from '../components/NavBar.jsx';
import React, { useEffect } from 'react';
import { Box, VStack, Spinner, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ProfessionalDetails from '../components/ProfessionalDetails.jsx';
import ActivityFeed from '../components/ActivityFeed.jsx';
import NavMenu from '../components/NavMenu.jsx';
import '../styles/ProfilePage.css';
import { getUserProfile } from '../api/profile.js';
import { useAuth } from '../context/AuthContext.jsx';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!user) return;
        const data = await getUserProfile(user.id);
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  if (loading || authLoading) return <Spinner />;
  if (!profile) return <Box>Profile not found.</Box>;

  return (
    <Box className="profile-page-container">
      <NavBar />
      <NavMenu />
import { useProfile } from '../context/ProfileContext.jsx';

function ProfilePage() {
  const { profile, fetchProfile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) return <Spinner />;

  return (
    <Box className="profile-page-container">
      <Button className="customize-btn" onClick={() => navigate('/profile/customize')} colorScheme="teal" mb={4}>
        Customize Profile
      </Button>
      <Button onClick={() => navigate('/tasks')} colorScheme="teal" mb={4}>
        Manage Tasks
      </Button>
      <VStack spacing={6} align="stretch">
        <ProfileHeader profile={profile} />
        <AboutSection bio={profile.bio} />
        <ProfessionalDetails skills={profile.skills} />
        <ActivityFeed activities={profile.activities || []} />
      </VStack>
    </Box>
  );
}

export default ProfilePage;
