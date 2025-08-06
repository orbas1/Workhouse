import React, { useEffect, useRef } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import PodcastPlayer from '../components/PodcastPlayer.jsx';
import '../styles/LivePlaybackPage.css';

export default function LivePlaybackPage() {
  const jitsiRef = useRef(null);

  useEffect(() => {
    const domain = import.meta.env.VITE_JITSI_DOMAIN;
    const load = () => {
      const api = new window.JitsiMeetExternalAPI(domain.replace(/^https?:\/\//, ''), {
        roomName: 'WorkhouseWebinarDemo',
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
  }, []);

  return (
    <Box className="live-playback-page" p={4}>
      <Heading mb={4}>Live Webinar Room</Heading>
      <Box id="jitsi-container" ref={jitsiRef} className="jitsi-container" mb={8} />
      <PodcastPlayer />
    </Box>
  );
}
