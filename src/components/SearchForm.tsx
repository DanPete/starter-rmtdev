import { useSearchTermContext } from "@/lib/hooks";
import type { ChangeEvent, FormEvent } from "react";

export default function SearchForm() {
  const { searchTerm, handleChangeSearchTerm } = useSearchTermContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    handleChangeSearchTerm(newSearchTerm);
  };

  return (
    <form action="#" className="search" onSubmit={handleSubmit}>
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}
