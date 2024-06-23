import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'

function Providers({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <ChakraProvider>
        {children}
    </ChakraProvider>
  )
}

export default Providers