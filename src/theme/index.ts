import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({
  breakpoints,
  fonts: {
    heading: `'Cafe24Ssurround', sans-serif`,
    body: `'GmarketSansMedium', sans-serif`,
  },
});

export default theme;
