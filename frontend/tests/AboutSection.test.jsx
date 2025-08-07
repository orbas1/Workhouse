import { render, screen } from '@testing-library/react';
import { ChakraProvider, Theme } from '@chakra-ui/react';
import AboutSection from '../src/components/AboutSection';
import '@testing-library/jest-dom';

describe('AboutSection', () => {
  it('renders provided bio', () => {
    render(
      <ChakraProvider theme={Theme}>
        <AboutSection bio="Hello world" />
      </ChakraProvider>
    );
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders fallback when no bio provided', () => {
    render(
      <ChakraProvider theme={Theme}>
        <AboutSection />
      </ChakraProvider>
    );
    expect(screen.getByText('No bio provided.')).toBeInTheDocument();
  });
});
