// theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#FF6347',
    secondary: '#6A5ACD',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
  },
});

export default theme;
