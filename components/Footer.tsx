import { Box, Flex, Link, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { FaDev } from 'react-icons/fa';
import { useImage } from '@@/hook/useImage';

export function Footer() {
  const [image] = useImage();
  const toggle = useDisclosure();
  if (!image.url) return null;
  return (
    <Flex
      w="full"
      flex={1}
      bottom={4}
      color={'gray.200'}
      justify="space-between"
      alignItems={'center'}
      my={2}
      px={2}
      h={'32px'}
      position={'absolute'}
      zIndex={'banner'}
    >
      <Box>
        <FaDev size={26} onClick={toggle.onToggle} />
      </Box>
      <Text
        px={2}
        bg="blackAlpha.600"
        borderRadius={'md'}
        onClick={toggle.onToggle}
        fontSize="xs"
        display={toggle.isOpen ? 'inherit' : 'none'}
      ></Text>

      <Stack
        p={2}
        display={!toggle.isOpen ? 'flex' : 'none'}
        flexDirection={'column'}
        bg="blackAlpha.600"
        borderRadius={'md'}
      >
        <Link href={image.url}>{image.url}</Link>
        {image.source && (
          <Link fontSize="xs" href={image.source}>
            {`(${image.source})`}
          </Link>
        )}
      </Stack>
    </Flex>
  );
}
