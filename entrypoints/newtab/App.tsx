import { Home, SettingPage } from "@@/pages";
import {
  ChakraProvider,
  ColorModeScript,
  Text,
  VStack,
} from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

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

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <Page isRoot={true} renderHeader={null}>
      <VStack
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        boxShadow={"lg"}
      >
        <Text as="h1">Oops!</Text>
        <Text>Sorry, an unexpected error has occurred.</Text>
        <Text as="pre">{JSON.stringify(error, null, 2)}</Text>
      </VStack>
    </Page>
  );
}

const router = createMemoryRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="newtab.html" element={<Home />} />
      <Route lazy={() => import("../../pages/settings")} path="/settings" />
      <Route lazy={() => import("../../pages/desktop")} path="/desktop" />
    </Route>
  )
);

export default function () {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ColorModeScript initialColorMode="dark" />
        <RouterProvider fallbackElement={<Home />} router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
