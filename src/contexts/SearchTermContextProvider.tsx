import { useClearHash, useDebounce, useLocalStorage } from "@/lib/hooks";
import { createContext } from "react";

type SearchTermContextProviderProps = {
  children: React.ReactNode;
};

type TSearchTermContext = {
  searchTerm: string;
  debouncedSearchTerm: string;
  handleChangeSearchTerm: (newSearchTerm: string) => void;
};

export const SearchTermContext = createContext<TSearchTermContext | null>(null);

export function SearchTermContextProvider({
  children,
}: SearchTermContextProviderProps) {
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  useClearHash(searchTerm);

  const handleChangeSearchTerm = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <SearchTermContext.Provider
      value={{
        searchTerm,
        debouncedSearchTerm,
        handleChangeSearchTerm,
      }}
    >
      {children}
    </SearchTermContext.Provider>
  );
}
