import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Textarea,
  Button,
  Text,
  Spinner,
  Select,
  Input,
} from '@chakra-ui/react';
import '../styles/LiveFeedPage.css';
import {
  getPosts,
  createPost,
  likePost,
  getEvents,
  commentPost,
  sharePost,
  reportPost,
} from '../api/liveFeed.js';
import ActionQueue from '../utils/actionQueue.js';

export default function LiveFeedPage() {
  const queue = useRef(new ActionQueue());
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [content, setContent] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, e] = await Promise.all([getPosts(), getEvents()]);
        setPosts(p);
        setEvents(e);
      } catch (err) {
        console.error('Failed to load feed', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleFilter = async () => {
    try {
      const filtered = await getPosts(filterCategory || undefined);
      setPosts(filtered);
    } catch (err) {
      console.error('Failed to filter posts', err);
    }
  };

  const handlePost = () => {
    if (!content.trim()) return;
    queue.current.enqueue(async () => {
      try {
        const newPost = await createPost({ content, category: postCategory });
        setPosts((p) => [newPost, ...p]);
        setContent('');
        setPostCategory('');
      } catch (err) {
        console.error('Post failed', err);
      }
    });
  };

  const handleLike = (id) => {
    queue.current.enqueue(async () => {
      try {
        const updated = await likePost(id);
        setPosts((p) => p.map((post) => (post.id === id ? updated : post)));
      } catch (err) {
        console.error('Like failed', err);
      }
    });
  };

  const handleComment = (id) => {
    const text = commentInputs[id];
    if (!text || !text.trim()) return;
    queue.current.enqueue(async () => {
      try {
        const updated = await commentPost(id, { content: text });
        setPosts((p) => p.map((post) => (post.id === id ? updated : post)));
        setCommentInputs((ci) => ({ ...ci, [id]: '' }));
      } catch (err) {
        console.error('Comment failed', err);
      }
    });
  };

  const handleShare = (id) => {
    queue.current.enqueue(async () => {
      try {
        const updated = await sharePost(id);
        setPosts((p) => p.map((post) => (post.id === id ? updated : post)));
      } catch (err) {
        console.error('Share failed', err);
      }
    });
  };

  const handleReport = (id) => {
    queue.current.enqueue(async () => {
      try {
        const updated = await reportPost(id);
        setPosts((p) => p.map((post) => (post.id === id ? updated : post)));
      } catch (err) {
        console.error('Report failed', err);
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <Box className="live-feed-page" p={4}>
      <Heading mb={4}>Live Feed</Heading>
      <VStack align="stretch" spacing={2} mb={6}>
        <HStack>
          <Select
            placeholder="Filter category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="gig">Gig</option>
            <option value="contract">Contract</option>
            <option value="profile">Profile</option>
            <option value="course">Course</option>
            <option value="webinar">Webinar</option>
            <option value="class">Class</option>
            <option value="podcast">Podcast</option>
            <option value="tasks">Task</option>
            <option value="networking">Networking</option>
            <option value="general">General</option>
          </Select>
          <Button onClick={handleFilter}>Filter</Button>
        </HStack>
        <Textarea
          placeholder="Share an update..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <HStack>
          <Select
            placeholder="Post category"
            value={postCategory}
            onChange={(e) => setPostCategory(e.target.value)}
          >
            <option value="gig">Gig</option>
            <option value="contract">Contract</option>
            <option value="profile">Profile</option>
            <option value="course">Course</option>
            <option value="webinar">Webinar</option>
            <option value="class">Class</option>
            <option value="podcast">Podcast</option>
            <option value="tasks">Task</option>
            <option value="networking">Networking</option>
            <option value="general">General</option>
          </Select>
          <Button colorScheme="teal" onClick={handlePost}>
            Post
          </Button>
        </HStack>
      </VStack>
      <HStack align="start" spacing={8} alignItems="flex-start">
        <VStack flex="1" spacing={4} align="stretch">
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="md">
              <Text fontWeight="bold">{post.author}</Text>
              <Text fontSize="sm" className="post-meta">
                {new Date(post.createdAt).toLocaleString()}
              </Text>
              <Text mb={2}>{post.content}</Text>
              <HStack spacing={2} mb={2} className="post-actions">
                <Button size="sm" onClick={() => handleLike(post.id)}>
                  Like ({post.likes || 0})
                </Button>
                <Button size="sm" onClick={() => handleShare(post.id)}>
                  Share ({post.shares || 0})
                </Button>
                <Button size="sm" onClick={() => handleReport(post.id)}>
                  Report ({post.reports || 0})
                </Button>
              </HStack>
              {post.comments &&
                post.comments.map((c) => (
                  <Text key={c.id} fontSize="sm" className="comment">
                    <strong>{c.author}:</strong> {c.content}
                  </Text>
                ))}
              <HStack mt={2}>
                <Input
                  size="sm"
                  placeholder="Add comment"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) =>
                    setCommentInputs((ci) => ({ ...ci, [post.id]: e.target.value }))
                  }
                />
                <Button size="sm" onClick={() => handleComment(post.id)}>
                  Comment
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
        <VStack w="250px" spacing={4} align="stretch" className="events-sidebar">
          <Heading size="sm">Live Events</Heading>
          {events.map((ev, idx) => (
            <Box key={idx} p={2} borderWidth="1px" borderRadius="md">
              {ev.title}
            </Box>
          ))}
        </VStack>
      </HStack>
    </Box>
  );
}
