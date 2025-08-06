export function validateAd(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is required';
  }
  if (!values.content) {
    errors.content = 'Content is required';
  }
  if (values.targetUrl && !/^https?:\/\//i.test(values.targetUrl)) {
    errors.targetUrl = 'Invalid URL';
  }
  return errors;
}
