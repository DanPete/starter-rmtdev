import type { ChangeEvent, FormEvent } from "react";

type SearchFormProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export default function SearchForm({
  searchTerm,
  setSearchTerm,
}: SearchFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTerm);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
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
