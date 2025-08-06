import { render, screen } from '@testing-library/react';
import AboutSection from '../src/components/AboutSection';
import '@testing-library/jest-dom';

describe('AboutSection', () => {
  it('renders provided bio', () => {
    render(<AboutSection bio="Hello world" />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders fallback when no bio provided', () => {
    render(<AboutSection />);
    expect(screen.getByText('No bio provided.')).toBeInTheDocument();
  });
});
