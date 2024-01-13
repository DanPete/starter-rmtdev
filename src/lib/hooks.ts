import { RefObject, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";
import { useQuery, useQueries } from "react-query";
import { handleError } from "@/lib/utils";
import { useContext } from "react";
import {
  BookmarksContext,
  SearchTermContext,
  ActiveIdContext,
  JobItemsContext,
} from "@/contexts";

const fetchJobItem = async (id: number): Promise<JobItemExpanded> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }
  const { jobItem } = await res.json();
  return jobItem;
};

export const useJobItem = (id: number | null) => {
  const { data: jobItem, isLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    }
  );

  return { jobItem, isLoading } as const;
};

const fetchJobItems = async (searchTerm: string): Promise<JobItem[]> => {
  const res = await fetch(`${BASE_URL}?search=${searchTerm}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.description);
  }
  const { jobItems } = await res.json();
  return jobItems;
};

export const useJobItems = (ids: number[]) => {
  const results = useQueries(
    ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      onError: handleError,
    }))
  );

  const isLoading = results.some((result) => result.isLoading);
  const jobItems = results
    .map((result) => result.data)
    .filter(Boolean) as JobItemExpanded[];

  return { jobItems, isLoading } as const;
};

export const useSearchQuery = (searchTerm: string) => {
  const { data: jobItems, isLoading } = useQuery(
    ["jobItems", searchTerm],
    () => fetchJobItems(searchTerm),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchTerm),
      onError: handleError,
    }
  );

  return { jobItems, isLoading } as const;
};

export const useActiveId = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return activeId;
};

export const useActiveJobItem = () => {
  const activeId = useActiveId();
  return useJobItem(activeId);
};

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    );
  }

  return context;
};

export const useActiveIdContext = () => {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error("useActiveId must be used within a ActiveIdProvider");
  }

  return context;
};

export const useSearchTermContext = () => {
  const context = useContext(SearchTermContext);

  if (!context) {
    throw new Error("useSearchTerm must be used within a SearchTermProvider");
  }

  return context;
};

export const useJobItemContext = () => {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error("useJobItem must be used within a JobItemProvider");
  }

  return context;
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export const useClearHash = (searchTerm: string) => {
  useEffect(() => {
    if (searchTerm !== "") return;
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }, [searchTerm]);
};

export const useOnClickOutside = (
  refs: RefObject<HTMLElement>[],
  handler: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs, handler]);
};
