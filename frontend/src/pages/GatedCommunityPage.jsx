import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  fetchDiscussions,
  subscribeToCommunity,
  checkCommunityAccess,
} from '../api/community.js';
import { getUserProfile } from '../api/profile.js';
import '../styles/GatedCommunityPage.css';

export default function GatedCommunityPage() {
  const { communityId: paramId } = useParams();
  const { user } = useAuth();
  const communityId = paramId || user?.id;
  const [access, setAccess] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      if (!communityId) return;
      const prof = await getUserProfile(communityId);
      setProfile(prof);
      const { access } = await checkCommunityAccess(communityId);
      setAccess(access);
      if (access) {
        const data = await fetchDiscussions(communityId);
        setDiscussions(data);
      }
    }
    load();
  }, [communityId]);

  async function handleSubscribe() {
    await subscribeToCommunity(communityId);
    setAccess(true);
    const data = await fetchDiscussions(communityId);
    setDiscussions(data);
  }

  if (!communityId) {
    return <Box p={4}>No community selected.</Box>;
  }

  return (
    <Box className="gated-community" p={4}>
      <Heading mb={4}>{profile?.name || 'Community'}</Heading>
      {!access ? (
        <VStack spacing={4}>
          <Text>This community is for members only.</Text>
          <Button colorScheme="teal" onClick={handleSubscribe}>
            Subscribe for ${profile?.communityPrice || 0}
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4} align="stretch">
          {discussions.map((d) => (
            <Box key={d.id} className="discussion" p={4} borderWidth="1px" borderRadius="md">
              <Heading size="md">{d.title}</Heading>
              <Text mt={2}>{d.content}</Text>
            </Box>
          ))}
          {discussions.length === 0 && <Text>No discussions yet.</Text>}
        </VStack>
      )}
    </Box>
  );
}
