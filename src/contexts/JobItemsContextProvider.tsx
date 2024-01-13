import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTermContext } from "@/lib/hooks";
import { RESULTS_PER_PAGE } from "@/lib/constants";
import { JobItem, PageDirection, SortBy } from "@/lib/types";

type JobItemsContextProviderProps = {
  children: React.ReactNode;
};

type TJobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  currentPage: number;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  handlePageChange: (direction: PageDirection) => void;
  handleSortByChange: (newSortBy: SortBy) => void;
  sortBy: SortBy;
};

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

export function JobItemsContextProvider({
  children,
}: JobItemsContextProviderProps) {
  const { debouncedSearchTerm } = useSearchTermContext();
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchTerm);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "recent") {
          return a.daysAgo - b.daysAgo;
        } else {
          return b.relevanceScore - a.relevanceScore;
        }
      }),
    [jobItems, sortBy]
  );
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [jobItemsSorted, currentPage]
  );

  const handlePageChange = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleSortByChange = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      isLoading,
      currentPage,
      totalNumberOfPages,
      totalNumberOfResults,
      jobItemsSortedAndSliced,
      handlePageChange,
      handleSortByChange,
      sortBy,
    }),
    [
      jobItems,
      isLoading,
      currentPage,
      totalNumberOfPages,
      totalNumberOfResults,
      jobItemsSortedAndSliced,
      handlePageChange,
      handleSortByChange,
      sortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
