import { FC } from 'react';
import { Box, ChakraProps } from '@chakra-ui/react';

interface Props extends ChakraProps {}

export const Banner: FC<Props> = ({ children, ...props }) => {
  return (
    <Box
      w='100%'
      minH='50px'
      px={3}
      py={3}
      display='flex'
      justifyContent='center'
      alignItems='center'
      bg='brand.accent'
      color='white'
      {...props}
    >
      {children}
    </Box>
  );
};
