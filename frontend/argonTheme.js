import { extendTheme } from '@chakra-ui/react';

const argonTheme = extendTheme({
  colors: {
    brand: {
      50: '#e9f7fe',
      100: '#d0eefc',
      200: '#a0def9',
      300: '#70cdf5',
      400: '#41bdf2',
      500: '#11cdef',
      600: '#0fa3c2',
      700: '#0c7a94',
      800: '#085066',
      900: '#042739',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Stat: {
      baseStyle: {
        container: {
          p: 6,
          borderRadius: 'lg',
          boxShadow: '0 0 2rem 0 rgba(136, 152, 170, 0.15)',
          backgroundColor: 'white',
        },
      },
    },
    Card: {
      baseStyle: {
        p: 6,
        borderRadius: 'lg',
        boxShadow: '0 0 2rem 0 rgba(136, 152, 170, 0.15)',
        backgroundColor: 'white',
      },
    },
  },
});

export default argonTheme;
