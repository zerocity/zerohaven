import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";

import * as React from "react";
import { BsFilter } from "react-icons/bs";
import { useImage } from "../hook/useImage";
import { hasFlag, toFlipMask } from "../hook/utils";
import {
  Categories,
  Purity,
  Search,
  useSearchContext,
} from "../provider/Search";
import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "react-router-dom";
import { useGetImages } from "@@/components/query/use-get-images";
import { SearchInput } from "@@/components/SearchInput";
import { Page } from "@@/components/Page";
import { WallpaperSearchResults } from "@@/components/WallpaperSearchResults";

export const Setting = () => {
  const router = useLocation();
  const isRoot = router.pathname === "/" || router.pathname === "/index.html";

  const [_, setImage] = useImage();
  const toggle = useDisclosure({ defaultIsOpen: true });
  const [loading, setLoading] = React.useState(false);

  const search = useSearchContext();
  const fetchedImages = useGetImages({
    q: search.state.q,
    purity: toFlipMask(search.state.purity, Purity),
    categories: toFlipMask(search.state.categories, Categories),
    page: search.state.page.toString(),
    apikey: search.state.apikey,
  });

  const header = (
    <HStack w="100%" align={"center"}>
      <IconButton
        variant={"ghost"}
        color="white"
        _hover={{
          bg: "white",
          color: "black",
          p: 2,
        }}
        onClick={toggle.onToggle}
        aria-label={`Close`}
        icon={<BsFilter />}
      />
      <SearchInput
        defaultValue={search.state.q}
        color="white"
        bg="blackAlpha.600"
        zIndex={"banner"}
        onDebounce={(q: string) => {
          if (q) {
            search.actions.setQ(q);
          }
        }}
      />
    </HStack>
  );

  if (fetchedImages.isLoading) {
    return (
      <Page isRoot={isRoot} renderHeader={header}>
        <Flex flex={1}>
          <FilterNavigation toggle={toggle} />
          <Flex flex={1} h="100vh" justify={"center"} align={"center"}>
            <Box p={12} borderRadius="md" bg="blackAlpha.600">
              <Spinner color="white" size={"xl"} />
            </Box>
          </Flex>
        </Flex>
      </Page>
    );
  }

  if (fetchedImages.isError) {
    return (
      <Page isRoot={isRoot} renderHeader={header}>
        <Flex flex={1}>
          <FilterNavigation toggle={toggle} />
          <Flex flex={1} h="100vh" justify={"center"} align={"center"}>
            <Box p={12} borderRadius="md" bg="blackAlpha.600">
              <Text color="white">{`Something bad happend :(`} </Text>
            </Box>
          </Flex>
        </Flex>
      </Page>
    );
  }

  if (isEmpty(fetchedImages.data)) {
    return (
      <Page isRoot={isRoot} renderHeader={header}>
        <Flex flex={1}>
          <FilterNavigation toggle={toggle} />
          <Flex flex={1} h="100vh" justify={"center"} align={"center"}>
            <Box p={12} borderRadius="md" bg="blackAlpha.600">
              <Text color="white">{`Nothing found :(`} </Text>
            </Box>
          </Flex>
        </Flex>
      </Page>
    );
  }

  return (
    <Page isRoot={isRoot} loading={loading} renderHeader={header}>
      <Flex flex={1}>
        <FilterNavigation toggle={toggle} />
        <WallpaperSearchResults
          setLoading={setLoading}
          fetchedImages={fetchedImages.data ?? []}
          setImage={setImage}
        />
      </Flex>
    </Page>
  );
};

interface FilterNavigation {
  // purity: UseBitmaskReturn<Purity>;
  toggle: UseDisclosureReturn;
}
function FilterNavigation(props: FilterNavigation) {
  const search = useSearchContext();
  if (!props.toggle.isOpen) return null;
  return (
    <Stack
      position={["absolute", "inherit"]}
      zIndex="banner"
      p={2}
      mt={"64px"}
      w={["full", "200px"]}
      bg="blackAlpha.600"
      flexDir={"column"}
    >
      <ButtonGroup size="sm" isAttached>
        <Button
          w="full"
          isActive={hasFlag(search.state.purity, Purity.SFW)}
          onClick={() => search.actions.togglePurity(Purity.SFW)}
          mr="-px"
        >
          SFW
        </Button>
        <Button
          w="full"
          isActive={hasFlag(search.state.purity, Purity.SKETCHY)}
          onClick={() => search.actions.togglePurity(Purity.SKETCHY)}
          mr="-px"
        >
          Sketchy
        </Button>
        {search.state.apikey && (
          <Button
            w="full"
            isActive={hasFlag(search.state.purity, Purity.NSFW)}
            onClick={() => search.actions.togglePurity(Purity.NSFW)}
            mr="-px"
          >
            NSFW
          </Button>
        )}
      </ButtonGroup>

      <ButtonGroup size="sm" isAttached>
        <Button
          w="full"
          isActive={hasFlag(search.state.categories, Categories.GENERAL)}
          onClick={() => search.actions.toggleCategories(Categories.GENERAL)}
          mr="-px"
        >
          General
        </Button>
        <Button
          w="full"
          isActive={hasFlag(search.state.categories, Categories.ANIME)}
          onClick={() => search.actions.toggleCategories(Categories.ANIME)}
          mr="-px"
        >
          Anime
        </Button>
        <Button
          w="full"
          isActive={hasFlag(search.state.categories, Categories.PEOPLE)}
          onClick={() => search.actions.toggleCategories(Categories.PEOPLE)}
          mr="-px"
        >
          People
        </Button>
      </ButtonGroup>

      <ButtonGroup size="sm" isAttached>
        <Button w="full" onClick={() => search.actions.prevPage()} mr="-px">
          Prev
        </Button>
        <Button w="full" onClick={() => search.actions.nextPage()} mr="-px">
          Next
        </Button>
      </ButtonGroup>
    </Stack>
  );
}

export const Component = () => {
  return (
    <Search>
      <Setting />
    </Search>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();
  return isRouteErrorResponse(error) ? (
    <h1>
      {error.status} {error.statusText}
    </h1>
  ) : (
    <h1>{JSON.stringify(error, null, 4)}</h1>
  );
}
