const { Box, Text, Heading, Stack, Button, Flex } = ChakraUI;
const { useState } = React;

function TestimonialCarousel({ testimonials = [] }) {
  const [index, setIndex] = useState(0);
  if (!testimonials.length) return null;

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[index];

  return (
    <Box className="testimonial-carousel" maxW="xl" mx="auto" textAlign="center">
      <Flex direction="column" align="center" mb={4}>
        <Text fontStyle="italic">"{t.quote}"</Text>
        <Heading as="h4" size="sm" mt={2}>- {t.name}</Heading>
      </Flex>
      {testimonials.length > 1 && (
        <Stack direction="row" spacing={4} justify="center">
          <Button size="sm" onClick={prev} aria-label="Previous testimonial">Prev</Button>
          <Button size="sm" onClick={next} aria-label="Next testimonial">Next</Button>
        </Stack>
      )}
    </Box>
  );
}

window.TestimonialCarousel = TestimonialCarousel;
