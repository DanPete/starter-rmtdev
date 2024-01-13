import { JobList } from "@/components";
import { useJobItemContext } from "@/lib/hooks";

function JobListSearch() {
  const { jobItemsSortedAndSliced: jobItems, isLoading } = useJobItemContext();

  return <JobList jobItems={jobItems} isLoading={isLoading} />;
}

export default JobListSearch;
