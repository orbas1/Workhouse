import { useState } from 'react';
import { Box, Heading, Input, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import NavMenu from '../components/NavMenu.jsx';
import '../styles/FileResourceManagement.css';
import { listFiles, uploadFile as apiUploadFile } from '../api/projectManagement.js';

export default function FileResourceManagement(){
  const [projectId, setProjectId] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();

  async function loadFiles(){
    try{
      const data = await listFiles(projectId);
      setFiles(data);
    }catch(err){
      toast({ status: 'error', title: 'Failed to load files' });
    }
  }

  async function handleUpload(){
    if(!selectedFile) return;
    try{
      await apiUploadFile(projectId, selectedFile);
      toast({ status: 'success', title: 'File uploaded' });
      setSelectedFile(null);
      await loadFiles();
    }catch(err){
      toast({ status: 'error', title: err.message });
    }
  }

  return (
    <Box className="file-resource-page" p={4}>
      <NavMenu />
      <Heading mb={4}>File & Resource Management</Heading>
      <Box mb={4}>
        <Input placeholder="Project ID" value={projectId} onChange={e=>setProjectId(e.target.value)} mb={2} />
        <Button colorScheme="teal" onClick={loadFiles} isDisabled={!projectId}>Load Files</Button>
      </Box>
      <Box mb={4}>
        <Input type="file" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" onChange={e=>setSelectedFile(e.target.files[0])} />
        <Button mt={2} colorScheme="teal" onClick={handleUpload} isDisabled={!selectedFile || !projectId}>Upload File</Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Filename</Th>
            <Th>Uploaded</Th>
          </Tr>
        </Thead>
        <Tbody>
          {files.map(file => (
            <Tr key={file.id}>
              <Td><a href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a></Td>
              <Td>{new Date(file.uploadedAt).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
