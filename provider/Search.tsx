import { createContext } from '@chakra-ui/react-utils';
import { PropsWithChildren, useEffect } from 'react';
import useLocalStorage from '../hook/useLocalStorage';
import { setFlag } from '../hook/utils';
import { CallbacksFor, useMethods } from '../hook/use-method';

export enum Purity {
  UNKNOWN = 0, // 000
  SFW = 1, // 001
  SKETCHY = 2, // 010
  NSFW = 4, // 100
}

export enum Categories {
  UNKNOWN = 0, // 000
  GENERAL = 1, // 001
  ANIME = 2, // 010
  PEOPLE = 4, // 100
}

interface SearchState {
  q: string;
  apikey?: string | undefined;
  purity: number;
  categories: number;
  page: number;
  // status: SearchStatus
}

interface SearchContext {
  state: SearchState;
  actions: CallbacksFor<typeof methods>;
}

export const [SearchProvider, useSearchContext] = createContext<SearchContext>({
  name: 'SearchContext',
  errorMessage:
    'useSearchContext: `context` is undefined. Seems you forgot to wrap Search components in `<Search />`',
});

const initialState: SearchState = {
  q: 'dune',
  purity: 1, // default of api 1
  categories: 1, // default of api 7
  apikey: undefined,
  page: 1,
};

const methods = (state: SearchState) => ({
  reset() {
    return initialState;
  },
  setQ(q: string) {
    state.q = q;
  },
  setApikey(value: string) {
    state.apikey = value;
  },
  togglePurity(purity: number) {
    state.purity = setFlag(state.purity, purity);
  },
  toggleCategories(value: number) {
    state.categories = setFlag(state.categories, value);
  },

  nextPage() {
    state.page += 1;
  },
  prevPage() {
    if (state.page > 1) {
      state.page -= 1;
    }
  },
});

export type Actions = CallbacksFor<typeof methods>;

export function Search(props: PropsWithChildren<unknown>) {
  const [apikey] = useLocalStorage('apikey', undefined);
  const [state, actions] = useMethods(methods, initialState);

  useEffect(() => {
    if (apikey) {
      actions.setApikey(apikey);
    }
  }, [actions, apikey]);

  return (
    <SearchProvider
      value={{
        state,
        actions,
      }}
    >
      {props.children}
    </SearchProvider>
  );
}
