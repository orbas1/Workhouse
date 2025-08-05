const { Box, Text } = ChakraUI;
const { useState, useEffect } = React;

function QuoteWidget() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch('/api/quotes/random');
        if (res.ok) {
          const data = await res.json();
          setQuote(data);
        }
      } catch (err) {
        console.error('Failed to load quote', err);
      }
    }
    load();
  }, []);

  return (
    <Box className="quote-widget" p={4} borderWidth="1px" borderRadius="md" bg="white">
      {quote ? (
        <>
          <Text fontStyle="italic">"{quote.content}"</Text>
          <Text mt={2} textAlign="right">- {quote.author}</Text>
        </>
      ) : (
        <Text>Loading quote...</Text>
      )}
    </Box>
  );
}

window.QuoteWidget = QuoteWidget;
