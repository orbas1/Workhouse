const { Box, Avatar, Heading, Text, HStack, Button } = ChakraUI;

function ProfileHeader({ profile, onEdit }) {
  const avatar = profile.avatarUrl || `${window.env.AVATAR_API}?seed=${encodeURIComponent(profile.name || profile.userId)}`;
  return (
    <Box className="profile-header" p={4} borderWidth="1px" borderRadius="lg">
      <HStack spacing={4} align="center">
        <Avatar name={profile.name} src={avatar} size="xl" />
        <Box>
          <Heading size="md">{profile.name || 'Unnamed User'}</Heading>
          {profile.title && <Text>{profile.title}</Text>}
          {profile.location && <Text className="profile-location">{profile.location}</Text>}
          <HStack mt={2} spacing={2}>
            {onEdit && <Button size="sm" colorScheme="blue" onClick={onEdit}>Edit Profile</Button>}
            <Button size="sm" variant="outline">Message</Button>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}

window.ProfileHeader = ProfileHeader;
