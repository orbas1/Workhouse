import { ChakraProvider, Box, Heading, Button, Text, Textarea, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavMenu from '../components/NavMenu';
import { getInterview, addNote } from '../api/interviews.js';
import '../styles/InterviewSession.css';

export default function InterviewSession() {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState(null);
  const [inSession, setInSession] = useState(false);
  const [note, setNote] = useState('');
  const toast = useToast();
  const domain = window.env?.JITSI_DOMAIN || 'https://meet.jit.si';

  useEffect(() => {
    async function load() {
      try {
        const data = await getInterview(interviewId);
        setInterview(data);
      } catch (err) {
        toast({ title: 'Failed to load interview', status: 'error' });
      }
    }
    load();
  }, [interviewId, toast]);

  const handleSaveNote = async () => {
    try {
      await addNote(interviewId, note);
      setNote('');
      toast({ title: 'Note saved', status: 'success' });
    } catch (err) {
      toast({ title: 'Failed to save note', status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box className="interview-session" p={4}>
        <Heading mb={4}>Virtual Interview</Heading>
        {interview && (
          <Text mb={4}>
            Scheduled for: {new Date(interview.scheduledFor).toLocaleString()}
          </Text>
        )}
        {!inSession ? (
          <Button colorScheme="blue" onClick={() => setInSession(true)}>
            Join Interview
          </Button>
        ) : (
          <Box className="video-container" mb={4}>
            <iframe
              title="Interview"
              src={interview ? `${domain}/${interview.meetingId}` : ''}
              allow="camera; microphone; fullscreen; display-capture"
              style={{ width: '100%', height: '500px', border: 0 }}
            />
          </Box>
        )}
        <Box mt={4}>
          <Heading size="md" mb={2}>
            Notes
          </Heading>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter notes"
          />
          <Button mt={2} colorScheme="teal" onClick={handleSaveNote}>
            Save Note
          </Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

