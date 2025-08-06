import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Spinner,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Link,
} from '@chakra-ui/react';

export default function NewsWidget() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchNews() {
      try {
        const url = 'https://api.allorigins.win/raw?url=' +
          encodeURIComponent('https://rss.bbc.co.uk/news/rss.xml');
        const res = await fetch(url);
        const text = await res.text();
        const doc = new window.DOMParser().parseFromString(text, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item')).slice(0, 5).map((item) => ({
          title: item.querySelector('title')?.textContent,
          description: item.querySelector('description')?.textContent,
          link: item.querySelector('link')?.textContent,
        }));
        setArticles(items);
      } catch (err) {
        console.error('Failed to load news', err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const openArticle = (article) => {
    setSelected(article);
    onOpen();
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="md" mb={2}>News</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <VStack align="stretch" spacing={2} maxH="200px" overflowY="auto">
          {articles.map((a, idx) => (
            <Box
              key={idx}
              p={2}
              borderWidth="1px"
              borderRadius="md"
              _hover={{ bg: 'gray.50', cursor: 'pointer' }}
              onClick={() => openArticle(a)}
            >
              <Text fontWeight="bold">{a.title}</Text>
            </Box>
          ))}
        </VStack>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selected?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={4}>{selected?.description}</Text>
            {selected?.link && (
              <Link href={selected.link} color="teal.500" isExternal>
                Read full story
              </Link>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

