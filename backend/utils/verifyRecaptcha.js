async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) {
    return false;
  }
  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    return false;
  }
}

module.exports = verifyRecaptcha;
