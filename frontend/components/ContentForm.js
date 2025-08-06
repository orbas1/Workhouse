const { Box, Stack, Select, Input, Textarea, Button } = ChakraUI;
const { useState } = React;

function ContentForm({ onSubmit }) {
  const [form, setForm] = useState({ type: 'podcast', title: '', description: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm({ type: 'podcast', title: '', description: '' });
  }

  return (
    <Box as="form" onSubmit={handleSubmit} className="content-form">
      <Stack spacing={3}>
        <Select name="type" value={form.type} onChange={handleChange}>
          <option value="podcast">Podcast</option>
          <option value="webinar">Webinar</option>
        </Select>
        <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <Button colorScheme="teal" type="submit">Create</Button>
      </Stack>
    </Box>
  );
}

window.ContentForm = ContentForm;
