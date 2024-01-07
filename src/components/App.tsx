import {
  Background,
  BookmarksButton,
  Container,
  Footer,
  Header,
  HeaderTop,
  JobItemContent,
  JobList,
  Logo,
  PaginationControls,
  ResultsCount,
  SearchForm,
  Sidebar,
  SidebarTop,
  SortingControls,
} from "@/components";
import { useState } from "react";
import { useDebounce, useJobItems } from "@/lib/hooks";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 250);
  const { jobItemsSliced, isLoading, totalNumberOfResults } =
    useJobItems(debouncedSearchTerm);

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
