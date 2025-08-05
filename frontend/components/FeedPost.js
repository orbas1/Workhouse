const { Box, Text, Flex, Button } = ChakraUI;
const { useState } = React;

function FeedPost({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);

  async function handleLike() {
    try {
      const updated = await liveFeedAPI.likePost(post.id);
      setLikes(updated.likes);
    } catch (err) {
      console.error('Failed to like post', err);
    }
  }

  return (
    <Box className="feed-post" borderWidth="1px" borderRadius="md" p={4} mb={4} bg="white">
      <Text fontWeight="bold" mb={2}>{post.author}</Text>
      <Text mb={3}>{post.content}</Text>
      <Flex gap={2}>
        <Button size="sm" colorScheme="blue" variant="outline" onClick={handleLike}>
          Like ({likes})
        </Button>
        <Button size="sm" colorScheme="green" variant="outline">Comment</Button>
        <Button size="sm" colorScheme="purple" variant="outline">Share</Button>
      </Flex>
    </Box>
  );
}

window.FeedPost = FeedPost;
