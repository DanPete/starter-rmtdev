import { createContext, useState } from "react";
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
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "recent") {
      return a.daysAgo - b.daysAgo;
    } else {
      return b.relevanceScore - a.relevanceScore;
    }
  });
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handlePageChange = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev") {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSortByChange = (newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <JobItemsContext.Provider
      value={{
        jobItems,
        isLoading,
        currentPage,
        totalNumberOfPages,
        totalNumberOfResults,
        jobItemsSortedAndSliced,
        handlePageChange,
        sortBy,
        handleSortByChange,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
