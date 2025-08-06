import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { fetchContentDetails } from '../api/contentLibrary.js';
import '../styles/LivePlaybackPage.css';

export default function LivePlaybackPage() {
  const { type, id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const jitsiRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContentDetails(type, id);
        setContent(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [type, id]);

  useEffect(() => {
    if (type !== 'webinar' || !content?.jitsiRoom) return;
    const domain = import.meta.env.VITE_JITSI_DOMAIN;
    const load = () => {
      const api = new window.JitsiMeetExternalAPI(domain.replace(/^https?:\/\//, ''), {
        roomName: content.jitsiRoom,
        parentNode: jitsiRef.current,
      });
      return () => api.dispose();
    };

    if (window.JitsiMeetExternalAPI) {
      return load();
    }
    const script = document.createElement('script');
    script.src = `${domain}/external_api.js`;
    script.async = true;
    script.onload = load;
    document.body.appendChild(script);
  }, [content, type]);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  if (!content) {
    return <Box p={4}>Content not found.</Box>;
  }

  return (
    <Box className="live-playback-page" p={4}>
      <Heading mb={4}>{content.title}</Heading>
      {type === 'podcast' ? (
        <audio controls src={content.audioUrl} className="audio-player" />
      ) : content.videoUrl ? (
        <video controls src={content.videoUrl} className="video-player" />
      ) : (
        <Box id="jitsi-container" ref={jitsiRef} className="jitsi-container" />
      )}
    </Box>
  );
}
