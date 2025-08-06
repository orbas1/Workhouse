import { vi } from 'vitest';
import { convertUsd } from '../src/utils/currency';

describe('convertUsd', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.window = { env: { CURRENCY_API: 'http://example.com' } };
  });

  it('converts using provided rate', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { EUR: 0.5 } })
      })
    );
    const result = await convertUsd(10, 'EUR');
    expect(result).toBe(5);
    expect(fetch).toHaveBeenCalled();
  });

  it('returns amount when rate missing', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: {} })
      })
    );
    const result = await convertUsd(10, 'ABC');
    expect(result).toBe(10);
  });
});
