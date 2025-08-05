import React, { useEffect, useState } from 'react';
import { Box, VStack, Spinner } from '@chakra-ui/react';
import ProfileHeader from '../components/ProfileHeader.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ProfessionalDetails from '../components/ProfessionalDetails.jsx';
import ActivityFeed from '../components/ActivityFeed.jsx';
import '../styles/ProfilePage.css';
import { getUserProfile } from '../api/profile.js';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!userId) return;
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [userId]);

  if (loading) return <Spinner />;
  if (!profile) return <Box>Profile not found.</Box>;

  return (
    <Box className="profile-page-container">
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
