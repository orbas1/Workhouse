import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast
} from '@chakra-ui/react';
import NavMenu from '../components/NavMenu';
import '../styles/AdCreateEdit.css';
import { validateAd } from '../utils/validation';
import '../api/ads';

export default function AdCreateEdit() {
  const { adId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const groupId = 'default';
  const placeholder = window.env?.ADS_PLACEHOLDER_API;
  const [values, setValues] = useState({
    title: '',
    content: '',
    targetUrl: '',
    imageUrl: placeholder ? `${placeholder}/ad.png` : '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (adId) {
      adsAPI
        .getAd(groupId, adId)
        .then((data) => setValues({
          title: data.title || '',
          content: data.content || '',
          targetUrl: data.targetUrl || '',
          imageUrl: data.imageUrl || '',
        }))
        .catch(() => toast({ title: 'Failed to load ad', status: 'error' }));
    }
  }, [adId]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateAd(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      if (adId) {
        await adsAPI.updateAd(groupId, adId, values);
        toast({ title: 'Ad updated', status: 'success' });
      } else {
        await adsAPI.createAd(groupId, values);
        toast({ title: 'Ad created', status: 'success' });
      }
      navigate('/dashboard');
    } catch (err) {
      toast({ title: err.message, status: 'error' });
    }
  };

  return (
    <ChakraProvider>
      <NavMenu />
      <Box p={4} className="ad-create-edit">
        <Heading mb={4}>{adId ? 'Edit Ad' : 'Create Ad'}</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={3} isInvalid={errors.title}>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={values.title} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3} isInvalid={errors.content}>
            <FormLabel>Content</FormLabel>
            <Textarea name="content" value={values.content} onChange={handleChange} />
          </FormControl>
          <FormControl mb={3} isInvalid={errors.targetUrl}>
            <FormLabel>Target URL</FormLabel>
            <Input name="targetUrl" value={values.targetUrl} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input name="imageUrl" value={values.imageUrl} onChange={handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="blue">{adId ? 'Update' : 'Create'}</Button>
        </form>
      </Box>
    </ChakraProvider>
  );
}
