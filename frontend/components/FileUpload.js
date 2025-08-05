const { Box, Input, Text } = ChakraUI;
const { useState } = React;

function FileUpload({ onFileSelect }) {
  const [fileName, setFileName] = useState('');

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    }
  }

  return (
    <Box className="file-upload" border="2px dashed #ccc" p={4} borderRadius="md" textAlign="center" position="relative">
      <Input type="file" className="file-input" onChange={handleChange} />
      <Text>{fileName || 'Drag and drop or click to upload'}</Text>
    </Box>
  );
}

window.FileUpload = FileUpload;
