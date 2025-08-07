import { describe, it, expect } from 'vitest';
import sanitizeInput from './sanitize.js';

describe('sanitizeInput', () => {
  it('removes dangerous characters', () => {
    const input = '<script>alert("x");</script>';
    expect(sanitizeInput(input)).toBe('scriptalertx/script');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });
});
