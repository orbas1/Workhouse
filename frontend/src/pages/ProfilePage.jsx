import React, { useEffect, useState } from 'react';
import { Box, VStack, Spinner, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ProfessionalDetails from '../components/ProfessionalDetails.jsx';
import ActivityFeed from '../components/ActivityFeed.jsx';
import '../styles/ProfilePage.css';
import { getUserProfile } from '../api/profile.js';
import { useAuth } from '../context/AuthContext.jsx';

function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      getUserProfile(user.id)
        .then(setProfile)
        .catch(() => setProfile(null))
        .finally(() => setLoading(false));
    }
  }, [authLoading, user]);

  if (authLoading || loading) return <Spinner />;
  if (!profile) return <Box p={4}>Profile not found.</Box>;

  return (
    <Box className="profile-page-container" p={4}>
      <Button className="customize-btn" onClick={() => navigate('/profile/customize')} colorScheme="teal" mb={4}>
        Customize Profile
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
