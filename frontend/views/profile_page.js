const { useState, useEffect } = React;
const { ChakraProvider, Flex, Box, Spinner, VStack } = ChakraUI;
const { useNavigate } = ReactRouterDOM;

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authUtils.getUserFromToken();
    const token = localStorage.getItem('token');
    if (!user || !token) {
      setLoading(false);
      return;
    }
    profileAPI.getProfile(user.id, token)
      .then(data => setProfile(data))
      .catch(err => console.error('Failed to load profile', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (!profile) return <Box>Profile not found.</Box>;

  return (
    <ChakraProvider>
      <Flex className="profile-page" direction="column" gap={4}>
        <ProfileHeader profile={profile} onEdit={() => navigate('/profile/customize')} />
        <AboutSection bio={profile.bio} />
        <ProfessionalDetails skills={profile.skills || []} />
        <ActivityFeed activities={profile.activities || []} />
      </Flex>
    </ChakraProvider>
  );
}

window.ProfilePage = ProfilePage;
