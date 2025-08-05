const { Flex, Image } = ChakraUI;

function PartnerLogos({ partners = [] }) {
  if (!partners.length) return null;
  return (
    <Flex className="partner-logos" wrap="wrap" justify="center" align="center" gap={6}>
      {partners.map(p => (
        <Image key={p.id} src={p.logo} alt={p.name} h="40px" filter="grayscale(100%)" _hover={{ filter: 'grayscale(0%)' }} />
      ))}
    </Flex>
  );
}

window.PartnerLogos = PartnerLogos;
