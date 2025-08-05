const { useState, useEffect } = React;
const { Box, Heading, Input, SimpleGrid, Card, CardBody, Text, Button, Stack, FormControl, FormLabel } = ChakraUI;
const { useAuth } = window;

function CoursePurchasePage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    coursesAPI.listCourses().then(setCourses).catch(() => {});
  }, []);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if(selected){
      currencyUtils.convertCurrency(selected.price, 'EUR').then(setConverted).catch(() => setConverted(null));
    }
  }, [selected]);

  async function handlePurchase(){
    if(!selected || !user) return;
    try{
      await coursesAPI.purchaseCourse(selected.id, {
        userId: user.id || user.userId,
        paymentMethod: 'card',
        amount: selected.price,
        promoCode
      });
      setMessage('Purchase successful!');
    }catch(err){
      setMessage('Purchase failed');
    }
  }

  return (
    <Box className="course-purchase-page" p={4}>
      <Heading size="lg" mb={4}>Courses</Heading>
      <Input placeholder="Search courses" mb={4} value={search} onChange={e => setSearch(e.target.value)} />
      <SimpleGrid columns={[1,2,3]} spacing={4} mb={4}>
        {filtered.map(course => (
          <Card key={course.id} onClick={() => setSelected(course)} cursor="pointer" borderWidth={selected?.id===course.id?'2px':'1px'}>
            <CardBody>
              <Heading size="md">{course.title}</Heading>
              <Text>${course.price}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      {selected && (
        <Box className="course-details" borderWidth="1px" p={4} borderRadius="md">
          <Heading size="md" mb={2}>{selected.title}</Heading>
          <Text mb={2}>{selected.description}</Text>
          <Text mb={2}>Price: ${selected.price}</Text>
          {converted && <Text mb={2}>Approx: €{converted.toFixed(2)}</Text>}
          <FormControl mb={2}>
            <FormLabel>Promo Code</FormLabel>
            <Input value={promoCode} onChange={e => setPromoCode(e.target.value)} />
          </FormControl>
          <Button colorScheme="blue" onClick={handlePurchase}>Buy Now</Button>
          {message && <Text mt={2}>{message}</Text>}
        </Box>
      )}
    </Box>
  );
}

window.CoursePurchasePage = CoursePurchasePage;
