import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemContext } from "@/lib/hooks";

export default function PaginationControls() {
  const { currentPage, handlePageChange, totalNumberOfPages } =
    useJobItemContext();

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return (
    <section className="pagination">
      {prevPage > 0 && (
        <PaginationButton
          direction="prev"
          page={prevPage}
          onClick={() => handlePageChange("prev")}
        />
      )}

      {nextPage < totalNumberOfPages && (
        <PaginationButton
          direction="next"
          page={nextPage}
          onClick={() => handlePageChange("next")}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "prev" | "next";
  page: number;
  onClick: () => void;
};

function PaginationButton({ direction, page, onClick }: PaginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={onClick}
    >
      {direction === "prev" && <ArrowLeftIcon />}
      Page {page}
      {direction === "next" && <ArrowRightIcon />}
    </button>
  );
}
