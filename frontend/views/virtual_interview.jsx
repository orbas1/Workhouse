const { Box, Heading, Button, Text, Textarea } = ChakraUI;
const { useState, useEffect } = React;
const { useParams } = ReactRouterDOM;

function VirtualInterviewPage() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [inSession, setInSession] = useState(false);
  const [note, setNote] = useState('');
  const domain = (window.env && window.env.JITSI_DOMAIN) || 'https://meet.jit.si';

  useEffect(() => {
    async function load() {
      try {
        const data = await window.interviewAPI.getInterview(id);
        setInterview(data);
      } catch (err) {
        console.error('Failed to load interview', err);
      }
    }
    load();
  }, [id]);

  async function handleSaveNote() {
    try {
      await window.interviewAPI.addNote(id, note);
      setNote('');
    } catch (err) {
      console.error('Failed to save note', err);
    }
  }

  return (
    <Box className="virtual-interview" p={4}>
      <NavMenu />
      <Heading mb={4}>Virtual Interview</Heading>
      {interview && (
        <Text mb={4}>Scheduled for: {new Date(interview.scheduledFor).toLocaleString()}</Text>
      )}
      {!inSession ? (
        <Button colorScheme="blue" onClick={() => setInSession(true)}>Join Interview</Button>
      ) : (
        <Box className="video-container" mb={4}>
          <iframe
            title="Interview"
            src={`${domain}/${'workhouse-interview-'+id}`}
            allow="camera; microphone; fullscreen; display-capture"
            style={{ width: '100%', height: '500px', border: 0 }}
          ></iframe>
        </Box>
      )}
      <Box mt={4}>
        <Heading size="md" mb={2}>Notes</Heading>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Enter notes" />
        <Button mt={2} colorScheme="teal" onClick={handleSaveNote}>Save Note</Button>
      </Box>
    </Box>
  );
}

window.VirtualInterviewPage = VirtualInterviewPage;
