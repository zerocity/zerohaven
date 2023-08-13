import {
  Box,
  Flex,
  Stack,
  SystemProps,
  Text,
  useDisclosure,
  useInterval,
} from '@chakra-ui/react';
import * as React from 'react';
import { VscGear } from 'react-icons/vsc';
import {
  AiOutlinePicCenter,
  AiOutlinePicLeft,
  AiOutlinePicRight,
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignMiddle,
  AiOutlineVerticalAlignTop,
} from 'react-icons/ai';
import { IconButton } from './IconButton';
import useLocalStorage from '@@/hook/useLocalStorage';

export function getTime() {
  const date = new Date();
  return new Intl.DateTimeFormat('de-DE', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

export function Time() {
  const toggle = useDisclosure();
  const [time, setTime] = React.useState(getTime());
  const [justify, setJustify] = useLocalStorage<SystemProps['justifyContent']>(
    'justify',
    'center'
  );
  const [align, setAlign] = useLocalStorage<SystemProps['alignItems']>(
    'align',
    'center'
  );

  useInterval(() => {
    setTime(getTime());
  }, 1000);

  return (
    <Flex
      p={[20]}
      direction={'column'}
      flex={1}
      justify={justify}
      align={align}
    >
      <Flex
        px={[2, 4, 12]}
        bg="blackAlpha.600"
        borderRadius={'md'}
        position="relative"
      >
        <Box top={2} right={4} position="absolute">
          <Flex
            p={1}
            justify={'center'}
            align={'center'}
            borderRadius="full"
            borderColor={'white'}
            color={'white'}
            onClick={toggle.onToggle}
            borderWidth={1}
            cursor="pointer"
            _hover={{
              bg: 'white',
              color: 'blackAlpha.600',
            }}
          >
            <VscGear size={16} />
          </Flex>
        </Box>
        <Text color={'gray.200'} fontSize={124} userSelect="none">
          {time}
        </Text>
      </Flex>
      <Stack
        borderRadius={'full'}
        bg="blackAlpha.600"
        p={2}
        m={2}
        isInline
        display={toggle.isOpen ? 'flex' : 'none'}
      >
        <IconButton
          isActive={align === 'flex-start'}
          onClick={() => setAlign('flex-start')}
          aria-label={`Align Left`}
          icon={<AiOutlinePicLeft />}
        />
        <IconButton
          isActive={align === 'center'}
          onClick={() => setAlign('center')}
          aria-label={`align center`}
          icon={<AiOutlinePicCenter />}
        />
        <IconButton
          isActive={align === 'flex-end'}
          onClick={() => setAlign('flex-end')}
          aria-label={`align Right`}
          icon={<AiOutlinePicRight />}
        />
        <IconButton
          isActive={justify === 'flex-start'}
          aria-label={`align top`}
          icon={<AiOutlineVerticalAlignTop />}
          onClick={() => setJustify('flex-start')}
        />
        <IconButton
          isActive={justify === 'center'}
          aria-label={`align middle`}
          icon={<AiOutlineVerticalAlignMiddle />}
          onClick={() => setJustify('center')}
        />
        <IconButton
          isActive={justify === 'flex-end'}
          aria-label={`Align Bottom `}
          icon={<AiOutlineVerticalAlignBottom />}
          onClick={() => setJustify('flex-end')}
        />
      </Stack>
    </Flex>
  );
}
