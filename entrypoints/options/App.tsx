import { ChakraProvider, ColorModeScript, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 36000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function () {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ColorModeScript initialColorMode="dark" />
        <Text>Hello world</Text>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
