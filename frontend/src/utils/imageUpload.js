import axios from 'axios';

export default async function uploadImage(file) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const uploadUrl = import.meta.env.VITE_IMGBB_UPLOAD_URL;
  if (!apiKey || !uploadUrl) {
    throw new Error('Image upload configuration missing');
  }
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await axios.post(`${uploadUrl}?key=${apiKey}`, formData);
  if (!data?.data?.url) {
    throw new Error('Failed to upload image');
  }
  return data.data.url;
}
