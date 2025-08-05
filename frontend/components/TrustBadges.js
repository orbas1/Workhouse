const { Flex, Image } = ChakraUI;

function TrustBadges({ badges = [] }) {
  if (!badges.length) return null;
  return (
    <Flex className="trust-badges" justify="center" align="center" gap={4} wrap="wrap">
      {badges.map(b => (
        <Image key={b.id} src={b.image} alt={b.name} h="30px" />
      ))}
    </Flex>
  );
}

window.TrustBadges = TrustBadges;
