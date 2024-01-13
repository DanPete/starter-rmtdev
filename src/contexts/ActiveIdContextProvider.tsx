import { useActiveId } from "@/lib/hooks";
import { createContext } from "react";

type ActiveIdContextProviderProps = {
  children: React.ReactNode;
};

type TActiveIdContext = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<TActiveIdContext | null>(null);

export function ActiveIdContextProvider({
  children,
}: ActiveIdContextProviderProps) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
