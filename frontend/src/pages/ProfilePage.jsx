import React, { useEffect } from 'react';
import { Box, VStack, Spinner, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '../components/ProfileHeader.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ProfessionalDetails from '../components/ProfessionalDetails.jsx';
import ActivityFeed from '../components/ActivityFeed.jsx';
import '../styles/ProfilePage.css';
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
