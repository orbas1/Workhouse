import React, { useEffect, useState } from 'react';
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from '@chakra-ui/react';
import ContentForm from '../components/ContentForm.jsx';
import ContentList from '../components/ContentList.jsx';
import { listContent, createContent, updateContent, deleteContent } from '../api/content.js';
import '../styles/ContentManagerPage.css';

export default function ContentManagerPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const toast = useToast();

  async function load() {
    try {
      const data = await listContent();
      setItems(data);
    } catch (err) {
      toast({ title: 'Failed to load content', status: 'error' });
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(data) {
    try {
      if (editing) {
        await updateContent(editing.id, data);
        toast({ title: 'Content updated', status: 'success' });
      } else {
        await createContent(data);
        toast({ title: 'Content created', status: 'success' });
      }
      setEditing(null);
      setTabIndex(1);
      load();
    } catch (err) {
      toast({ title: 'Save failed', status: 'error' });
    }
  }

  async function handleDelete(id) {
    try {
      await deleteContent(id);
      toast({ title: 'Content deleted', status: 'info' });
      load();
    } catch (err) {
      toast({ title: 'Delete failed', status: 'error' });
    }
  }

  function handleEdit(item) {
    setEditing(item);
    setTabIndex(0);
  }

  return (
    <Box className="content-manager-page" p={4}>
      <Heading mb={4}>Content Creation & Management</Heading>
      <Tabs index={tabIndex} onChange={setTabIndex} variant="enclosed">
        <TabList>
          <Tab>Create Content</Tab>
          <Tab>Manage Content</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ContentForm initialData={editing} onSubmit={handleSubmit} />
          </TabPanel>
          <TabPanel>
            <ContentList items={items} onEdit={handleEdit} onDelete={handleDelete} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
