import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { fetchPopularPodcasts, recordPodcastListen } from '../api/podcast.js';
import '../styles/PodcastPlayer.css';

export default function PodcastPlayer() {
  const [podcasts, setPodcasts] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPopularPodcasts();
        const list = data?.data || data?.results || [];
        setPodcasts(list);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelect = (p) => {
    setCurrent(p);
    if (p.key) {
      recordPodcastListen(p.key).catch(() => {});
    }
  };

  return (
    <Box className="podcast-player" p={4} borderWidth="1px" borderRadius="md">
      <Heading size="md" mb={4}>Popular Podcasts</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <List spacing={2} className="podcast-list">
          {podcasts.map((p) => (
            <ListItem
              key={p.key}
              className="podcast-item"
              onClick={() => handleSelect(p)}
            >
              {p.name || p.title}
            </ListItem>
          ))}
        </List>
      )}
      {current && (
        <Box mt={4} className="podcast-current">
          <Heading size="sm" mb={2}>{current.name || current.title}</Heading>
          <iframe
            title="podcast-player"
            src={`https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(current.url)}&hide_cover=1`}
            frameBorder="0"
            width="100%"
            height="120"
          />
        </Box>
      )}
    </Box>
  );
}
