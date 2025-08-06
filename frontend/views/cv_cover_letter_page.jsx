const { ChakraProvider, Box, Heading, Textarea, Button, Select, Text, Flex, useToast } = ChakraUI;
const { useState } = React;

function CvCoverLetterPage() {
  const [cvFile, setCvFile] = useState(null);
  const [cvPrompt, setCvPrompt] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverTemplate, setCoverTemplate] = useState('');
  const [coverContent, setCoverContent] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleCvUpload() {
    if (!cvFile) return;
    try {
      await resumeAPI.uploadCv(cvFile);
      toast({ title: 'CV uploaded', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true });
    }
  }

  async function handleCvGenerate() {
    setLoading(true);
    try {
      const data = await resumeAPI.generateCv(cvPrompt);
      setCvPrompt(data.content || '');
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  }

  async function handleCoverUpload() {
    if (!coverFile) return;
    try {
      await resumeAPI.uploadCoverLetter(coverFile);
      toast({ title: 'Cover letter uploaded', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true });
    }
  }

  async function handleCoverGenerate() {
    setLoading(true);
    try {
      const data = await resumeAPI.generateCoverLetter(coverTemplate);
      setCoverContent(data.content || '');
    } catch (err) {
      toast({ title: err.message, status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChakraProvider>
      <Box className="cv-cover-letter-page" p={4}>
        <ProgressIndicator step={3} total={3} />
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          <Box flex="1" className="cv-section">
            <Heading mb={4} size="md">Upload or Generate Your CV</Heading>
            <FileUpload onFileSelect={setCvFile} />
            <Button mt={2} colorScheme="blue" onClick={handleCvUpload} isDisabled={!cvFile || loading}>Upload CV</Button>
            <Textarea mt={4} placeholder="Describe your experience" value={cvPrompt} onChange={(e) => setCvPrompt(e.target.value)} />
            <Button mt={2} colorScheme="green" onClick={handleCvGenerate} isLoading={loading}>Generate CV</Button>
          </Box>
          <Box flex="1" className="cover-section">
            <Heading mb={4} size="md">Customize Your Cover Letter</Heading>
            <FileUpload onFileSelect={setCoverFile} />
            <Button mt={2} colorScheme="blue" onClick={handleCoverUpload} isDisabled={!coverFile || loading}>Upload Cover Letter</Button>
            <Select mt={4} mb={2} placeholder="Select Template" onChange={(e) => setCoverTemplate(e.target.value)} value={coverTemplate}>
              <option value="Software developer with team leadership experience">Technology</option>
              <option value="Marketing specialist with focus on digital campaigns">Marketing</option>
              <option value="Finance analyst skilled in risk assessment">Finance</option>
            </Select>
            <Textarea placeholder="Cover letter content" value={coverContent || coverTemplate} onChange={(e) => setCoverContent(e.target.value)} h="200px" />
            <Button mt={2} colorScheme="purple" onClick={handleCoverGenerate} isLoading={loading}>Generate Cover Letter</Button>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="sm" mb={2}>Cover Letter Preview</Heading>
              <Text whiteSpace="pre-wrap">{coverContent}</Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

window.CvCoverLetterPage = CvCoverLetterPage;
