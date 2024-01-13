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

          <JobList />

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
