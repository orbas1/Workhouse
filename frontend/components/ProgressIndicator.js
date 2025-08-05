const { Box, Progress, Text } = ChakraUI;

function ProgressIndicator({ step, total }) {
  const percent = (step / total) * 100;
  return (
    <Box className="progress-indicator">
      <Progress value={percent} mb={2} />
      <Text className="progress-label">Step {step} of {total}</Text>
    </Box>
  );
}

window.ProgressIndicator = ProgressIndicator;
