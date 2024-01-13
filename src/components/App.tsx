import {
  Background,
  BookmarksButton,
  Container,
  Footer,
  Header,
  HeaderTop,
  JobItemContent,
  JobListSearch,
  Logo,
  PaginationControls,
  ResultsCount,
  SearchForm,
  Sidebar,
  SidebarTop,
  SortingControls,
} from "@/components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControls />
          </SidebarTop>

          <JobListSearch />

          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
