import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Avatar,
  HStack,
  VStack,
  Button,
  Input,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { getArticle, listArticles, likeArticle, addComment } from '../api/articles.js';
import '../styles/ArticlePage.css';

export default function ArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const articles = await listArticles();
        setRelated(articles.filter(a => a.id !== articleId).slice(0, 3));
        if (articleId) {
          const data = await getArticle(articleId);
          setArticle(data);
        } else if (articles.length) {
          navigate(`/articles/${articles[0].id}`, { replace: true });
        }
      } catch (err) {
        setError(err.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [articleId, navigate]);

  async function handleLike() {
    try {
      const res = await likeArticle(articleId);
      setArticle(prev => ({ ...prev, likes: res.likes }));
    } catch {
      toast({ status: 'error', title: 'Unable to like article' });
    }
  }

  async function handleAddComment() {
    if (!comment.trim()) return;
    try {
      const newComment = await addComment(articleId, comment.trim());
      setArticle(prev => ({ ...prev, comments: [...(prev.comments || []), newComment] }));
      setComment('');
    } catch {
      toast({ status: 'error', title: 'Unable to post comment' });
    }
  }

  if (loading)
    return (
      <Box className="article-container" p={4} textAlign="center">
        <Spinner />
      </Box>
    );

  if (error)
    return (
      <Box className="article-container" p={4}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );

  if (!article) return null;

  return (
    <Box className="article-container" p={4}>
      <Heading mb={2}>{article.title}</Heading>
      <HStack spacing={4} mb={4} className="article-meta">
        <Avatar size="sm" name={article.author?.name} src={article.author?.avatar} />
        <Text>{article.author?.name}</Text>
        <Text color="gray.500">{new Date(article.createdAt).toLocaleDateString()}</Text>
        <Text color="gray.500">{article.readingTime} min read</Text>
      </HStack>
      <Box className="article-content" mb={6}>
        <Text whiteSpace="pre-line">{article.content}</Text>
      </Box>
      <HStack spacing={4} mb={6}>
        <Button onClick={handleLike}>Like ({article.likes || 0})</Button>
      </HStack>
      <Box className="comment-section">
        <Heading size="md" mb={4}>Comments</Heading>
        <VStack align="stretch" spacing={3}>
          {(article.comments || []).map(c => (
            <Box key={c.id} p={2} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">{c.author}</Text>
              <Text>{c.content}</Text>
            </Box>
          ))}
        </VStack>
        <HStack mt={4}>
          <Input value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment" />
          <Button onClick={handleAddComment}>Post</Button>
        </HStack>
      </Box>
      <Box mt={10}>
        <Heading size="md" mb={4}>Related Posts</Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          {related.map(r => (
            <Box
              key={r.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              className="related-post"
              onClick={() => navigate(`/articles/${r.id}`)}
            >
              <Heading size="sm">{r.title}</Heading>
              <Text fontSize="sm" color="gray.500">
                {new Date(r.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
