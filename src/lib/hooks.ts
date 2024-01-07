import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

export function useJobItems(searchTerm: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);
  const totalNumberOfResults = jobItems.length;

  useEffect(() => {
    if (!searchTerm) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}?search=${searchTerm}`);
        if (!res.ok) throw new Error("Something went wrong");
        const { jobItems } = await res.json();
        setJobItems(jobItems);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchTerm]);

  return { jobItemsSliced, isLoading, totalNumberOfResults } as const;
}

export const useJobItem = (id: number | null) => {
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/${id}`);
        if (!res.ok) throw new Error("Something went wrong");
        const { jobItem } = await res.json();
        setJobItem(jobItem);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { jobItem, isLoading } as const;
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
