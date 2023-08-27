import Background from "@@/components/Background";
import { Flex } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-utils";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

interface TabList {
  url?: string;
  title?: string;
  favIconUrl?: string;
}

export interface WindowExtension {
  id: number;
  tabList: TabList[];
}

type CollectionOfTabsContext = Record<number, WindowExtension>;

export const [CollectionOfTabsProvider, useCollectionOfTabsProvider] =
  createContext<CollectionOfTabsContext>({
    name: "TabListProvider",
  });

const DEFAULT_STATE = {};

export function CollectionOfTabs(props: PropsWithChildren<unknown>) {
  const [state, setState] = useState<CollectionOfTabsContext>(DEFAULT_STATE);

  const syncWithProvider = useCallback(async () => {
    // const a = browser.sessions.get;
    const res = await browser.windows.getAll({
      populate: true,
      windowTypes: ["normal"],
    });
    let newState = {};
    for (const windowInfo of res) {
      newState = {
        ...newState,
        // !!! assumption
        //
        // windowInfo.id should be allways present
        [windowInfo.id ?? 0]: {
          id: windowInfo.id ?? 0,
          tabList: (windowInfo.tabs ?? []).map(
            ({ url, favIconUrl, title }) => ({
              url,
              // favIconUrl,
              title,
            })
          ),
        },
      };
    }
    setState(newState);
  }, []);

  useEffect(() => {
    console.info("[sync] set all tabs from open browser tabs to provider");
    syncWithProvider();
  }, []);

  if (!state) return null;
  return (
    <CollectionOfTabsProvider value={state}>
      <Flex
        position={"absolute"}
        h={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        zIndex={"docked"}
        w={"full"}
      >
        <Outlet />
      </Flex>
      <Background />
    </CollectionOfTabsProvider>
  );
}
