import React from 'react';
import { Box, Avatar, Heading, Text, HStack } from '@chakra-ui/react';
import '../styles/ProfileHeader.css';

function ProfileHeader({ profile }) {
  const avatar = profile.avatarUrl || `${import.meta.env.VITE_AVATAR_API}?seed=${encodeURIComponent(profile.fullName || profile.userId)}`;
  return (
    <Box className="profile-header" p={4} borderWidth="1px" borderRadius="lg">
      <HStack spacing={4} align="center">
        <Avatar name={profile.fullName} src={avatar} size="xl" />
        <Box>
          <Heading size="md">{profile.fullName || 'Unnamed User'}</Heading>
          {profile.title && <Text>{profile.title}</Text>}
          {profile.location && <Text className="profile-location">{profile.location}</Text>}
        </Box>
      </HStack>
    </Box>
  );
}

export default ProfileHeader;
