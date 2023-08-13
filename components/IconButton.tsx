import {
  IconButton as BaseIconButton,
  IconButtonProps,
} from '@chakra-ui/react';

export const IconButton = (props: IconButtonProps) => (
  //@ts-ignore
  <BaseIconButton
    size="md"
    borderRadius={'full'}
    fontSize="lg"
    // variant="outline"
    // color="whiteAlpha.600"
    // borderColor="transparent"
    borderWidth={1}
    _active={{
      color: 'white',
      bg: 'blackAlpha.800',
      // borderColor: "white",
      // borderWidth: 2,
    }}
    _focus={{
      color: 'blackAlpha.800',
      boxShadow: 'transparent',
    }}
    {...props}
  />
);
