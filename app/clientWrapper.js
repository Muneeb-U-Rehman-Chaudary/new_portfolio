'use client';

import { ChakraProvider } from '@chakra-ui/react';

function ClientWrapper({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

export default ClientWrapper;
