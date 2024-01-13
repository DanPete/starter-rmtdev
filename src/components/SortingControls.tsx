import { useJobItemContext } from "@/lib/hooks";

export default function SortingControls() {
  const { sortBy, handleSortByChange } = useJobItemContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        isActive={sortBy === "relevant"}
        onClick={() => handleSortByChange("relevant")}
      >
        Relevant
      </SortingButton>
      <SortingButton
        isActive={sortBy === "recent"}
        onClick={() => handleSortByChange("recent")}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: string;
};

function SortingButton({ isActive, onClick, children }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button ${isActive ? "sorting__button--active" : ""}`}
    >
      {children}
    </button>
  );
}
