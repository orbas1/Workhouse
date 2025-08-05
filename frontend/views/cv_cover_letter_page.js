const { ChakraProvider, Box, Heading, Textarea, Button, Select, Progress, Text } = ChakraUI;
const { useState } = React;

function CvCoverLetterPage() {
  const [cvFile, setCvFile] = useState(null);
  const [cvPrompt, setCvPrompt] = useState('');
  const [coverPrompt, setCoverPrompt] = useState('');
  const [coverContent, setCoverContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCvUpload() {
    if (!cvFile) return;
    const formData = new FormData();
    formData.append('cv', cvFile);
    await apiFetch('/api/resume/cv/upload', { method: 'POST', body: formData });
  }

  async function handleCvGenerate() {
    setLoading(true);
    try {
      const res = await apiFetch('/api/resume/cv/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: cvPrompt })
      });
      const data = await res.json();
      setCvPrompt(data.content || '');
    } finally {
      setLoading(false);
    }
  }

  async function handleCoverGenerate() {
    setLoading(true);
    try {
      const res = await apiFetch('/api/resume/cover-letter/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: coverPrompt })
      });
      const data = await res.json();
      setCoverContent(data.content || '');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChakraProvider>
      <Box className="cv-cover-letter-page" p={4}>
        <Progress value={100} mb={4} />
        <Heading mb={4}>Upload or Generate Your CV</Heading>
        <FileUpload onFileSelect={setCvFile} />
        <Button mt={2} colorScheme="blue" onClick={handleCvUpload} isDisabled={!cvFile}>Upload CV</Button>
        <Textarea mt={4} placeholder="Describe your experience" value={cvPrompt} onChange={(e) => setCvPrompt(e.target.value)} />
        <Button mt={2} colorScheme="green" onClick={handleCvGenerate} isLoading={loading}>Generate CV</Button>

        <Heading mt={8} mb={4}>Customize Your Cover Letter</Heading>
        <Select mb={2} onChange={(e) => setCoverPrompt(e.target.value)} value={coverPrompt}>
          <option value="">Select Template</option>
          <option value="Software developer with team leadership experience">Technology</option>
          <option value="Marketing specialist with focus on digital campaigns">Marketing</option>
          <option value="Finance analyst skilled in risk assessment">Finance</option>
        </Select>
        <Textarea placeholder="Cover letter content" value={coverContent || coverPrompt} onChange={(e) => setCoverContent(e.target.value)} h="200px" />
        <Button mt={2} colorScheme="purple" onClick={handleCoverGenerate} isLoading={loading}>Generate Cover Letter</Button>

        <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
          <Heading size="md" mb={2}>Cover Letter Preview</Heading>
          <Text whiteSpace="pre-wrap">{coverContent}</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

window.CvCoverLetterPage = CvCoverLetterPage;
