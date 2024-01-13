import { useBookmarksContext } from "@/lib/hooks";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import type { MouseEvent } from "react";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  const handleBookmarkClick = (
    e: MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    e.preventDefault();
    handleToggleBookmark(id);
  };

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => handleBookmarkClick(e, id)}
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
