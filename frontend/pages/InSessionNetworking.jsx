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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
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
  const isHost = localStorage.getItem('role') === 'host';
  const [roundDuration, setRoundDuration] = useState(120);
  const [breakDuration, setBreakDuration] = useState(30);
  const [phase, setPhase] = useState('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(roundDuration);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [groupMessages, setGroupMessages] = useState([]);
  const [groupInput, setGroupInput] = useState('');
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
    if (!isRunning) return;
    if (seconds <= 0) {
      if (phase === 'active') {
        setPhase('break');
        setSeconds(breakDuration);
      } else if (phase === 'break') {
        handleShuffle();
        setPhase('active');
        setSeconds(roundDuration);
      }
      return;
    }
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds, isRunning, phase, breakDuration, roundDuration]);

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
      toast({ title: 'Next round starting', status: 'info' });
      loadMetrics();
    } catch (err) {
      toast({ title: 'Shuffle failed', status: 'error' });
    }
  };

  const startSession = () => {
    handleShuffle();
    setPhase('active');
    setSeconds(roundDuration);
    setIsRunning(true);
  };

  const pauseSession = () => setIsRunning(false);
  const resumeSession = () => setIsRunning(true);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { from: 'me', text: input }]);
    setInput('');
  };

  const sendGroupMessage = () => {
    if (!groupInput.trim()) return;
    setGroupMessages((m) => [...m, { from: 'me', text: groupInput }]);
    setGroupInput('');
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

  const handleShare = async () => {
    if (!currentMatch) return;
    try {
      await exchangeContact(sessionId, {
        userId: currentMatch.id,
        contactInfo: 'shared',
      });
      toast({ title: 'Card shared', status: 'success' });
    } catch {
      toast({ title: 'Share failed', status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Flex className="networking-container" position="relative">
        <Box className="video-area" ref={videoRef}></Box>
        <Box className="chat-panel">
          <Tabs h="100%" display="flex" flexDirection="column">
            <TabList>
              <Tab>Match Chat</Tab>
              <Tab>Group Chat</Tab>
            </TabList>
            <TabPanels flex="1">
              <TabPanel p={0} display="flex" flexDirection="column" flex="1">
                <VStack className="message-list" p={2} align="stretch" flex="1">
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
              </TabPanel>
              <TabPanel p={0} display="flex" flexDirection="column" flex="1">
                <VStack className="message-list" p={2} align="stretch" flex="1">
                  {groupMessages.map((m, idx) => (
                    <Box key={idx} alignSelf={m.from === 'me' ? 'flex-end' : 'flex-start'}>
                      {m.text}
                    </Box>
                  ))}
                </VStack>
                <HStack className="message-input" p={2}>
                  <Input
                    value={groupInput}
                    onChange={(e) => setGroupInput(e.target.value)}
                    placeholder="Message everyone"
                  />
                  <Button onClick={sendGroupMessage}>Send</Button>
                </HStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
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
          {phase === 'break' ? `Break: ${formatSeconds(seconds)}` : formatSeconds(seconds)}
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
              <Button size="sm" onClick={handleShare}>
                Share My Card
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
        {isHost && (
          <Box
            className="host-controls"
            position="absolute"
            top="2"
            left="2"
            bg="white"
            p={2}
            borderRadius="md"
            boxShadow="md"
          >
            <HStack mb={2}>
              <Text>Round:</Text>
              <Button
                size="sm"
                onClick={() => setRoundDuration(120)}
                colorScheme={roundDuration === 120 ? 'blue' : 'gray'}
              >
                2 min
              </Button>
              <Button
                size="sm"
                onClick={() => setRoundDuration(300)}
                colorScheme={roundDuration === 300 ? 'blue' : 'gray'}
              >
                5 min
              </Button>
            </HStack>
            <HStack>
              <Button size="sm" onClick={startSession} disabled={isRunning && phase !== 'idle'}>
                Start
              </Button>
              <Button size="sm" onClick={pauseSession} disabled={!isRunning}>
                Pause
              </Button>
              <Button size="sm" onClick={resumeSession} disabled={isRunning}>
                Resume
              </Button>
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
