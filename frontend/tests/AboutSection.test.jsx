import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import AboutSection from '../src/components/AboutSection.jsx';

describe('AboutSection', () => {
  it('renders provided bio', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <AboutSection bio="Hello world" />
      </ChakraProvider>
    );
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders fallback when no bio provided', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <AboutSection />
      </ChakraProvider>
    );
    expect(screen.getByText('No bio provided.')).toBeInTheDocument();
  });
});
