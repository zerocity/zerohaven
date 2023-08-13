import { SetValue } from "@@/hook/useLocalStorage";
import { ImageReturn } from "@@/types";
import {
  Image as BB,
  Box,
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { AiOutlineClose } from "react-icons/ai";
import { BiCopy, BiPaste } from "react-icons/bi";

export interface WallpaperSearchResultsProps {
  fetchedImages: ImageReturn[];
  setImage: SetValue<ImageReturn>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function WallpaperSearchResults({
  fetchedImages,
  setImage,
  setLoading,
}: WallpaperSearchResultsProps) {
  const toast = useToast();
  const [value, setValue] = React.useState<string>("");
  const { hasCopied, onCopy } = useClipboard(value);
  const [cache, setCache] = React.useState<ImageReturn | null>(null);

  function handleLoadingError() {
    if (!cache) return;
    toast({
      title: "Resviced 403 for image :( ",
      variant: "left-accent",
      position: "top",
      isClosable: true,
      render: (props) => (
        <Stack
          mt={32}
          spacing={6}
          justifyContent="center"
          borderRadius={3}
          color="white"
          p={3}
          bg="black"
        >
          <Flex justifyContent="space-between" align={"center"}>
            <Text fontWeight={600}>Image could not be loaded :(</Text>
            <IconButton
              variant={"ghost"}
              size="xs"
              borderRadius="full"
              _hover={{
                bg: "white",
                color: "black",
                p: 2,
              }}
              //
              // isActive={true}
              onClick={() => {
                setCache(null);
                props.onClose();
              }}
              aria-label={`Close`}
              icon={<AiOutlineClose />}
            />
          </Flex>
          <Text>
            Sometimes it helps to open these links and reload the page
          </Text>

          <Flex justifyContent="space-between">
            <Stack isInline justifyContent="space-between" align={"center"}>
              <Link
                target={"_blank"}
                href={cache.path}
                onClick={() => {
                  setCache(null);
                }}
              >
                Image
              </Link>
              <IconButton
                variant={"ghost"}
                size="xs"
                borderRadius="full"
                _hover={{
                  bg: "white",
                  color: "black",
                  p: 2,
                }}
                //
                onClick={onCopy}
                aria-label={`copy paste`}
                icon={hasCopied ? <BiPaste /> : <BiCopy />}
              />
            </Stack>

            <Link target={"_blank"} href={cache.short_url}>
              Wallhaven
            </Link>
          </Flex>
        </Stack>
      ),
    });
  }

  return (
    <Scrollbars autoHeight autoHeightMin={"100vh"} universal>
      <Wrap ml={0} my={24} spacing={[4, 6, 8]} justify={"center"}>
        {fetchedImages.map((img) => (
          <WrapItem
            key={img.id}
            style={{
              perspective: "1000px",
            }}
            // Shadow
            _before={{
              display: "block",
              position: "absolute",
              content: '""',
              top: "5%",
              left: "5%",
              width: "90%",
              height: "90%",
              bg: "rgba(0,0,0, 0.5)",
              boxShadow: "0 6px 12px 12px rgba(0,0,0, 0.4)",
              willChange: "opacity",
              transformOrigin: "top center",
              transform: "skewX(.001deg)",
              transition: "transform .35s ease-in-out, opacity .5s ease-in-out",
            }}
            _hover={{
              _before: {
                opacity: 1.0,
                transform: "rotateX(14deg) translateY(-12px) scale(1.05)",
              },
            }}
          >
            <Box
              position={"relative"}
              zIndex="1"
              backgroundColor={img.colors[0]}
              overflow="hidden"
              transformOrigin="top center"
              willChange="transform"
              transform="skewX(.001deg)"
              transition="transform .35s ease-in-out"
              minW={300}
              minH={200}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
                perspectiveOrigin: "50% 50%",
                backgroundImage: `url(${img.thumbs.small})`,
              }}
              _hover={{
                cursor: "pointer",
                transform: "rotateX(14deg) translateY(-12px)",
                _after: {
                  transform: "translateY(0%)",
                },
              }}
              // glossy
              _after={{
                display: "block",
                content: '""',
                position: "absolute",
                zIndex: 100,
                top: 0,
                left: 0,
                width: "100%",
                height: "130%",
                background:
                  "linear-gradient(226deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.4) 35%, rgba(255,255,255,0.2) 42%, rgba(255,255,255,0) 60%)",
                transform: "translateY(-20%)",
                willChange: "transform",
                transition: "transform .65s cubic-bezier(0.18, 0.9, 0.58, 1)",
              }}
              title={img.short_url}
              onClick={() => {
                setCache(img);
                setLoading(true);
                // sometimes this way would return 403 but the images will load in a tab
                //
                //   const preload = new Image();
                //    preload.loading = "eager";
                //   preload.onload = function (e) {
                //     setImage(img);
                //   };
                //   preload.onerror = function (e) {
                //     console.error(e);
                //   };
                //   preload.src = img.path;
              }}
            />
          </WrapItem>
        ))}
      </Wrap>
      {cache && (
        <BB
          referrerPolicy="no-referrer"
          h={0}
          w={0}
          src={cache?.path}
          onError={(error) => {
            console.error(error);
            // setValue(cache.path);
            // handleLoadingError();
            // setLoading(false);
          }}
          onLoad={() => {
            setImage(cache);
            setCache(null);
            setLoading(false);
          }}
        />
      )}
    </Scrollbars>
  );
}
