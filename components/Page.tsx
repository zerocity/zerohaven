import {
  Link as BaseLink,
  Flex,
  HStack,
  Spinner,
  Stack,
} from "@chakra-ui/react";

import { useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";
import {
  FaBackward,
  FaChevronCircleLeft,
  FaImages,
  FaRegClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Background from "./Background";
import { Footer } from "./Footer";

export enum ScreenMode {
  DEFAULT = "DEFAULT",
  SETTING = "SETTING",
}
export interface PageProps {
  renderHeader: React.ReactNode;
  renderFooter?: React.ReactNode;
  loading?: boolean;
  isRoot: boolean;
}

export function Page({
  loading = false,
  isRoot,
  ...props
}: PropsWithChildren<PageProps>) {
  const bg = "blackAlpha.600";

  return (
    <>
      <HStack
        position={"fixed"}
        bg={bg}
        p={2}
        h={"64px"}
        zIndex={"docked"}
        justify={"center"}
        w={isRoot ? "inherit" : "full"}
        right={isRoot ? "0" : "inherit"}
        borderBottomLeftRadius={isRoot ? 12 : 0}
        align="center"
        spacing={4}
      >
        {props.renderHeader}
        {loading && (
          <BaseLink
            _focus={{
              boxShadow: "inherit",
            }}
            p={4}
            color="white"
          >
            <Spinner size={"sm"} speed="0.65s" color="white" />
          </BaseLink>
        )}
        {!isRoot && !loading && (
          <BaseLink
            as={Link}
            to="/"
            _focus={{
              boxShadow: "inherit",
            }}
            p={4}
            color="white"
          >
            <FaChevronCircleLeft />
          </BaseLink>
        )}
        {isRoot && !loading && (
          <BaseLink
            to={"/settings"}
            // href={'/settings'}
            _focus={{
              boxShadow: "inherit",
            }}
            p={4}
            color="white"
            as={Link}
          >
            <FaImages />
          </BaseLink>
        )}
      </HStack>

      <Background>{props.children}</Background>
      <Footer />
    </>
  );
}
