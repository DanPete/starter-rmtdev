import { useEffect, useState } from "react";
import { JobItem } from "./types";

export function useJobItems(searchTerm: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchTerm}`
        );
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

  return { jobItems, isLoading };
}
