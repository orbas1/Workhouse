import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  IconButton,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import NavMenu from '../components/NavMenu';
import {
  startVideo,
  endVideo,
  exchangeContact,
  rateMatch,
  getNextOneMinuteMatch,
  getSessionMetrics,
} from '../api/networking';
import { formatSeconds } from '../utils/time';
import '../styles/InSessionNetworking.css';

export default function InSessionNetworking() {
  const { sessionId } = useParams();
  const videoRef = useRef(null);
  const [seconds, setSeconds] = useState(120);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentMatch, setCurrentMatch] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const toast = useToast();

  useEffect(() => {
    startVideo(sessionId).catch(() =>
      toast({ title: 'Failed to start session', status: 'error' })
    );
    return () => {
      endVideo(sessionId).catch(() => {});
    };
  }, [sessionId, toast]);

  // Load Jitsi
  useEffect(() => {
    const loadJitsi = () => {
      const domain = import.meta.env.VITE_JITSI_DOMAIN.replace(/^https?:\/\//, '');
      const options = {
        roomName: `networking-${sessionId}`,
        parentNode: videoRef.current,
        width: '100%',
        height: '100%',
      };
      const api = new window.JitsiMeetExternalAPI(domain, options);
      return () => api.dispose();
    };
    if (!window.JitsiMeetExternalAPI) {
      const script = document.createElement('script');
      script.src = `${import.meta.env.VITE_JITSI_DOMAIN}/external_api.js`;
      script.async = true;
      script.onload = loadJitsi;
      document.body.appendChild(script);
      return () => script.remove();
    }
    return loadJitsi();
  }, [sessionId]);

  useEffect(() => {
    if (seconds <= 0) {
      handleShuffle();
      return;
    }
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const loadMetrics = async () => {
    try {
      const data = await getSessionMetrics(sessionId);
      setMetrics(data);
    } catch {
      /* ignore */
    }
  };

  const handleShuffle = async () => {
    try {
      const data = await getNextOneMinuteMatch(sessionId);
      setCurrentMatch(data.match || null);
      setSeconds(120);
      toast({ title: 'Next round starting', status: 'info' });
      loadMetrics();
    } catch (err) {
      toast({ title: 'Shuffle failed', status: 'error' });
      setSeconds(120);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: 'me', text: input }]);
    setInput('');
  };

  const handleSave = async () => {
    if (!currentMatch) return;
    try {
      await exchangeContact(sessionId, {
        userId: currentMatch.id,
        contactInfo: 'saved',
      });
      toast({ title: 'Connection saved', status: 'success' });
      loadMetrics();
    } catch {
      toast({ title: 'Save failed', status: 'error' });
    }
  };

  const handleRate = async (rating) => {
    if (!currentMatch) return;
    try {
      await rateMatch(currentMatch.matchId || currentMatch.id, { rating });
      toast({ title: 'Rating submitted', status: 'success' });
      loadMetrics();
    } catch {
      toast({ title: 'Rating failed', status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Flex className="networking-container" position="relative">
        <Box className="video-area" ref={videoRef}></Box>
        <Box className="chat-panel">
          <VStack className="message-list" p={2} align="stretch">
            {messages.map((m, idx) => (
              <Box key={idx} alignSelf={m.from === 'me' ? 'flex-end' : 'flex-start'}>
                {m.text}
              </Box>
            ))}
          </VStack>
          <HStack className="message-input" p={2}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <Button onClick={sendMessage}>Send</Button>
          </HStack>
        </Box>
        <Box
          className="timer"
          position="absolute"
          top="2"
          right="2"
          bg="gray.700"
          color="white"
          px={2}
          py={1}
          borderRadius="md"
        >
          {formatSeconds(seconds)}
        </Box>
        {currentMatch && (
          <Box
            className="controls"
            position="absolute"
            bottom="2"
            left="2"
            bg="white"
            p={2}
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontWeight="bold">{currentMatch.name}</Text>
            <HStack mt={2} spacing={3}>
              <Button size="sm" onClick={handleSave}>
                Save to My Network
              </Button>
              <ButtonGroup isAttached size="sm">
                {[1, 2, 3, 4, 5].map((s) => (
                  <IconButton
                    key={s}
                    icon={<StarIcon />}
                    aria-label={`${s} star`}
                    onClick={() => handleRate(s)}
                  />
                ))}
              </ButtonGroup>
            </HStack>
          </Box>
        )}
        {metrics && (
          <Box
            className="metrics"
            position="absolute"
            bottom="2"
            right="2"
            bg="white"
            p={2}
            borderRadius="md"
            boxShadow="md"
          >
            <Text fontSize="sm">Connections: {metrics.contactExchanges}</Text>
          </Box>
        )}
      </Flex>
    </ChakraProvider>
  );
}
