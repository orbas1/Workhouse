import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
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
  fetchResume
} from '../api/resume.js';
import '../styles/OnboardingDocumentsPage.css';

export default function OnboardingDocumentsPage() {
  const [cvFile, setCvFile] = useState(null);
  const [cvPrompt, setCvPrompt] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverPrompt, setCoverPrompt] = useState('');
  const [resume, setResume] = useState({ cv: null, coverLetter: null });
  const toast = useToast();

  useEffect(() => {
    fetchResume().then(setResume).catch(() => {});
  }, []);

  const handleUploadCv = async () => {
    if (!cvFile) return;
    try {
      await uploadCv(cvFile);
      const data = await fetchResume();
      setResume(data);
      toast({ title: 'CV uploaded', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: 'Upload failed', status: 'error', description: err.message });
    }
  };

  const handleGenerateCv = async () => {
    try {
      const { content } = await generateCv(cvPrompt);
      setResume((prev) => ({ ...prev, cv: { content } }));
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

  const handleGenerateCover = async () => {
    try {
      const { content } = await generateCoverLetter(coverPrompt);
      setResume((prev) => ({ ...prev, coverLetter: { content } }));
    } catch (err) {
      toast({ title: 'Generation failed', status: 'error', description: err.message });
    }
  };

  return (
    <Box className="documents-page" maxW="xl" mx="auto" p={6}>
      <Heading mb={6} textAlign="center">CV & Cover Letter</Heading>
      <VStack align="stretch" spacing={6}>
        <Box>
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
        </Box>
        <Box>
          <Heading size="md" mb={4}>Cover Letter</Heading>
          {resume.coverLetter?.filename && <Text mb={2}>Uploaded: {resume.coverLetter.filename}</Text>}
          {resume.coverLetter?.content && (
            <Textarea value={resume.coverLetter.content} readOnly mb={2} />
          )}
          <FormControl mb={2}>
            <FormLabel>Upload Cover Letter</FormLabel>
            <Input type="file" onChange={(e) => setCoverFile(e.target.files[0])} />
          </FormControl>
          <Button onClick={handleUploadCover} mr={2} colorScheme="teal">Upload</Button>
          <FormControl mt={4}>
            <FormLabel>Generate Cover Letter</FormLabel>
            <Textarea value={coverPrompt} onChange={(e) => setCoverPrompt(e.target.value)} />
          </FormControl>
          <Button onClick={handleGenerateCover} mt={2} colorScheme="teal">Generate</Button>
        </Box>
      </VStack>
    </Box>
  );
}
