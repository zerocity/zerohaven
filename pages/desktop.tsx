import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { css } from '@emotion/react';
import { Page } from '@@/components/Page';

const hiddeUnhovered = css`
  &:hover {
    background-color: var(--chakra-colors-blackAlpha-800);
  }
  :not(&:hover) {
    background-color: var(--chakra-colors-blackAlpha-600);
  }
`;

function Folder() {
  return (
    <VStack
      className="others"
      borderRadius={'lg'}
      bg="blackAlpha.600"
      h="200px"
      _hover={{
        bg: 'blackAlpha.800',
        // position: 'absolute',
        // boxSizing: 'inherit',
        // margin: 8,
        // zIndex: 'modal',
        // w: '66%',
        // h: '66%',
      }}
      w={'200px'}
      p={2}
      alignItems={'start'}
      as="section"
    >
      <HStack
        w="full"
        h="max-content"
        borderRadius={'lg'}
        bg="whiteAlpha.200"
        _hover={{
          bg: 'whiteAlpha.400',
          w: 'full',
        }}
        p={2}
        as="header"
      >
        <Text color={'whiteAlpha.600'} fontSize={12} as="span">
          Header
        </Text>
      </HStack>
      <VStack
        borderRadius={'lg'}
        w="full"
        flex={1}
        bg="whiteAlpha.200"
        as="main"
      >
        <Text color={'whiteAlpha.600'} fontSize={12} as="span">
          Header
        </Text>{' '}
        <Text color={'whiteAlpha.600'} fontSize={12} as="span">
          Header
        </Text>{' '}
        <Text color={'whiteAlpha.600'} fontSize={12} as="span">
          Header
        </Text>{' '}
        <Text color={'whiteAlpha.600'} fontSize={12} as="span">
          Header
        </Text>
      </VStack>
    </VStack>
  );
}

export function Component() {
  console.log('HERE');
  return (
    <Page isRoot={true} renderHeader={null}>
      <Flex
        mt={16}
        p={4}
        columnGap={2}
        gap={2}
        wrap={'wrap'}
        justifyContent={'center'}
      >
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
        <Folder />
      </Flex>
    </Page>
  );
}

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
