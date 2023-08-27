import {
  IconButton as BaseIconButton,
  IconButtonProps,
} from "@chakra-ui/react";

export const IconButton = (props: IconButtonProps) => (
  <BaseIconButton
    size="md"
    borderRadius={"full"}
    fontSize="lg"
    variant="outline"
    color="whiteAlpha.600"
    borderColor="transparent"
    borderWidth={1}
    _active={{
      color: "white",
      bg: "blackAlpha.800",
    }}
    _hover={{
      color: "white",
      bg: "blackAlpha.600",
      borderColor: "white",
      borderWidth: 1,
    }}
    _focus={{
      color: "whiteAlpha.600",
      boxShadow: "transparent",
      borderColor: "white",
      borderWidth: 2,
    }}
    {...props}
  />
);
