import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Select,
  Text,
  Textarea,
  VStack,
  useToast
} from '@chakra-ui/react';
import {
  uploadCv,
  generateCv,
  uploadCoverLetter,
  generateCoverLetter,
  fetchResume,
  analyzeCv
} from '../api/resume.js';
import ProgressIndicator from '../components/ProgressIndicator.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/OnboardingDocumentsPage.css';

export default function OnboardingDocumentsPage() {
  const [cvFile, setCvFile] = useState(null);
  const [cvPrompt, setCvPrompt] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverContent, setCoverContent] = useState('');
  const [coverIndustry, setCoverIndustry] = useState('');
  const [resume, setResume] = useState({ cv: null, coverLetter: null });
  const [analysis, setAnalysis] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const templates = {
    Technology: 'Dear Hiring Manager,\nI am excited to apply for the software developer role...',
    Marketing: 'Dear Hiring Manager,\nAs a marketing specialist, I have managed digital campaigns...',
    Finance: 'Dear Hiring Manager,\nWith a strong background in risk assessment, I will add value to your team...'
  };

  useEffect(() => {
    fetchResume().then((data) => {
      setResume(data);
      if (data.cv?.content) {
        analyzeCv(data.cv.content).then(setAnalysis).catch(() => {});
      }
    }).catch(() => {});
  }, []);

  const handleUploadCv = async () => {
    if (!cvFile) return;
    try {
      await uploadCv(cvFile);
      const data = await fetchResume();
      setResume(data);
      if (data.cv?.content) {
        const a = await analyzeCv(data.cv.content);
        setAnalysis(a);
      }
      toast({ title: 'CV uploaded', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: 'Upload failed', status: 'error', description: err.message });
    }
  };

  const handleGenerateCv = async () => {
    try {
      const { content } = await generateCv(cvPrompt);
      setResume((prev) => ({ ...prev, cv: { content } }));
      const a = await analyzeCv(content);
      setAnalysis(a);
    } catch (err) {
      toast({ title: 'Generation failed', status: 'error', description: err.message });
    }
  };

  const handleUploadCover = async () => {
    if (!coverFile) return;
    try {
      await uploadCoverLetter(coverFile);
      const data = await fetchResume();
      setResume(data);
      toast({ title: 'Cover letter uploaded', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: 'Upload failed', status: 'error', description: err.message });
    }
  };

  const handleTemplateChange = (e) => {
    const key = e.target.value;
    setCoverIndustry(key);
    setCoverContent(templates[key] || '');
  };

  const handleGenerateCover = async () => {
    try {
      const { content } = await generateCoverLetter(coverContent);
      setResume((prev) => ({ ...prev, coverLetter: { content } }));
      setCoverContent(content);
    } catch (err) {
      toast({ title: 'Generation failed', status: 'error', description: err.message });
    }
  };

  return (
    <Box className="documents-page" p={6}>
      <ProgressIndicator step={3} total={3} />
      <Heading mb={6} textAlign="center">CV & Cover Letter</Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box flex="1" className="cv-section">
          <Heading size="md" mb={4}>Curriculum Vitae</Heading>
          {resume.cv?.filename && <Text mb={2}>Uploaded: {resume.cv.filename}</Text>}
          {resume.cv?.content && (
            <Textarea value={resume.cv.content} readOnly mb={2} />
          )}
          <FormControl mb={2}>
            <FormLabel>Upload CV</FormLabel>
            <Input type="file" onChange={(e) => setCvFile(e.target.files[0])} />
          </FormControl>
          <Button onClick={handleUploadCv} mr={2} colorScheme="teal">Upload</Button>
          <FormControl mt={4}>
            <FormLabel>Generate CV</FormLabel>
            <Textarea value={cvPrompt} onChange={(e) => setCvPrompt(e.target.value)} />
          </FormControl>
          <Button onClick={handleGenerateCv} mt={2} colorScheme="teal">Generate</Button>
          {analysis && (
            <Box mt={4}>
              <Heading size="sm" mb={2}>ATS Suggestions</Heading>
              <List spacing={1}>
                {analysis.suggestions.map((s, i) => (
                  <ListItem key={i}>{s}</ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
        <Box flex="1" className="cover-section">
          <Heading size="md" mb={4}>Cover Letter</Heading>
          {resume.coverLetter?.filename && <Text mb={2}>Uploaded: {resume.coverLetter.filename}</Text>}
          <FormControl mb={2}>
            <FormLabel>Upload Cover Letter</FormLabel>
            <Input type="file" onChange={(e) => setCoverFile(e.target.files[0])} />
          </FormControl>
          <Button onClick={handleUploadCover} mr={2} colorScheme="teal">Upload</Button>
          <FormControl mt={4}>
            <FormLabel>Template</FormLabel>
            <Select placeholder="Select Industry" value={coverIndustry} onChange={handleTemplateChange}>
              {Object.keys(templates).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Edit Cover Letter</FormLabel>
            <Textarea value={coverContent} onChange={(e) => setCoverContent(e.target.value)} h="200px" />
          </FormControl>
          <Button onClick={handleGenerateCover} mt={2} colorScheme="teal">Generate</Button>
          {coverContent && (
            <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="sm" mb={2}>Preview</Heading>
              <Text whiteSpace="pre-wrap">{coverContent}</Text>
            </Box>
          )}
        </Box>
      </Flex>
      <Button mt={6} colorScheme="purple" onClick={() => navigate('/dashboard')}>Finish</Button>
    </Box>
  );
}
