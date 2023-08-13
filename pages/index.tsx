import { Page } from "@@/components/Page";
import { Time } from "@@/components/Time";
import { Search } from "@@/provider/Search";
import { Setting } from "./settings";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const router = useLocation();
  const isRoot = router.pathname === "/" || router.pathname === "/newtab.html";

  return (
    <Page isRoot={isRoot} renderHeader={null}>
      <Time />
    </Page>
  );
};

export const SettingPage = () => {
  return (
    <Search>
      <Setting />
    </Search>
  );
};
