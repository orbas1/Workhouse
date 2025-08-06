const { List, ListItem, HStack, Box, Text } = ChakraUI;

function ContentList({ items }) {
  if (!items || items.length === 0) {
    return <Text className="content-empty">No content yet.</Text>;
  }
  return (
    <List spacing={3} className="content-list">
      {items.map((item) => (
        <ListItem key={item.id} className="content-list-item">
          <HStack justify="space-between">
            <Box>
              <Text fontWeight="bold">{item.title}</Text>
              <Text fontSize="sm">{item.type}</Text>
            </Box>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}

window.ContentList = ContentList;
