import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import '../styles/CourseDetailPage.css';
import { getCourse, purchaseCourse } from '../api/courses.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [promoCode, setPromoCode] = useState('');
  const toast = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await getCourse(courseId);
        setCourse(data);
      } catch (err) {
        toast({ title: 'Failed to load course', status: 'error' });
      }
    }
    load();
  }, [courseId, toast]);

  async function handlePurchase() {
    try {
      await purchaseCourse(courseId, {
        userId: user.id,
        paymentMethod,
        amount: course.price,
        promoCode: promoCode || undefined
      });
      toast({ title: 'Course purchased successfully', status: 'success' });
    } catch (err) {
      toast({ title: err.message || 'Purchase failed', status: 'error' });
    }
  }

  if (!course) {
    return <Box className="course-detail-page" p={4}>Loading...</Box>;
  }

  return (
    <Box className="course-detail-page" p={4}>
      <Heading mb={2}>{course.title}</Heading>
      <Text mb={2}>{course.description}</Text>
      <Text mb={2}>Price: ${course.price}</Text>
      <FormControl mb={3}>
        <FormLabel>Payment Method</FormLabel>
        <Input value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Promo Code</FormLabel>
        <Input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handlePurchase}>Buy Now</Button>
    </Box>
  );
}
