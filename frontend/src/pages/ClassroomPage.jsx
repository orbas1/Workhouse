import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, VStack } from '@chakra-ui/react';
import ClassroomChat from '../components/ClassroomChat.jsx';
import ClassroomSections from '../components/ClassroomSections.jsx';
import CourseMaterials from '../components/CourseMaterials.jsx';
import AssessmentCenter from '../components/AssessmentCenter.jsx';
import TeacherProfileBanner from '../components/TeacherProfileBanner.jsx';
import '../styles/ClassroomPage.css';

export default function ClassroomPage() {
  const { id } = useParams();

  useEffect(() => {
    const domain = import.meta.env.VITE_JITSI_DOMAIN || 'https://meet.jit.si';
    const room = id || import.meta.env.VITE_CLASSROOM_DEFAULT_ROOM || 'WorkhouseClassroom';
    const options = {
      roomName: room,
      parentNode: document.getElementById('jitsi-container'),
    };
    if (window.JitsiMeetExternalAPI) {
      new window.JitsiMeetExternalAPI(domain.replace('https://', ''), options);
    }
  }, [id]);

  return (
    <Box className="classroom-page" p={4}>
      <Heading mb={4}>Classroom</Heading>
      <VStack spacing={4} align="stretch">
        <Box id="jitsi-container" className="video-container" />
        <ClassroomChat classroomId={id} />
        <ClassroomSections />
        <CourseMaterials />
        <AssessmentCenter />
        <TeacherProfileBanner />
      </VStack>
    </Box>
  );
}
