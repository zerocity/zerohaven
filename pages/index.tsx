import { IconButton } from "@@/components/IconButton";
import { useCollectionOfTabsProvider } from "@@/provider/CollectionOfTabs.provider";
import { Search } from "@@/provider/Search";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { keys, mapObjIndexed, values } from "ramda";
import { FaRedo } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Setting } from "./settings";

export const Home = () => {
  const router = useLocation();
  const isRoot = router.pathname === "/" || router.pathname === "/newtab.html";
  const bg = "blackAlpha.600";

  const collection = useCollectionOfTabsProvider();

  const content = values(
    mapObjIndexed((value, key) => {
      return (
        <TabPanel key={`${key}-content`}>
          <VStack>
            {value.tabList.map((tab) => (
              <Text key={tab.title}> {tab.title} </Text>
            ))}
          </VStack>
        </TabPanel>
      );
    }, collection)
  );

  return (
    <VStack
      color={"white"}
      bg={bg}
      px={2}
      minH={"container.sm"}
      maxH={"container.sm"}
      minWidth={"container.sm"}
      maxWidth={"container.sm"}
      borderRadius={"md"}
      boxShadow={"dark-lg"}
      borderColor="whiteAlpha.500"
      borderWidth={1}
    >
      <Tabs w={"full"}>
        <TabList>
          {keys(collection).map((id) => (
            <Tab key={id}>{id} </Tab>
          ))}
          <Flex m="2" flex={1} justifyContent={"flex-end"}>
            <IconButton
              aria-label={`align top`}
              icon={<FaRedo />}
              onClick={() => alert("flex-start")}
            />
          </Flex>
        </TabList>
        <TabPanels>{content}</TabPanels>
      </Tabs>
    </VStack>
  );
};

export const SettingPage = () => {
  return (
    <Search>
      <Setting />
    </Search>
  );
};
