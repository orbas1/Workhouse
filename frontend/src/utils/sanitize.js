export default function sanitizeInput(value) {
  return String(value).replace(/[<>"'`;()]/g, '').trim();
}
