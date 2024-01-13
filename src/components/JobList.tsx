import { JobListItem, Spinner } from "@/components";
import { useActiveIdContext, useJobItemContext } from "@/lib/hooks";

export function JobList() {
  const { activeId } = useActiveIdContext();
  const { jobItemsSortedAndSliced, isLoading } = useJobItemContext();

  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItemsSortedAndSliced.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))}
    </ul>
  );
}

export default JobList;
