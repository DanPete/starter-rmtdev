// import { QueryClient, QueryClientProvider } from "react-query";
// import {
//   BookmarksContextProvider,
//   ActiveIdContextProvider,
//   SearchTermContextProvider,
//   JobItemsContextProvider,
// } from "@/contexts";
// const queryClient = new QueryClient();

// type AppProvidersProps = {
//   children: React.ReactNode;
// };

// export function AppProviders({ children }: AppProvidersProps) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BookmarksContextProvider>
//         <ActiveIdContextProvider>
//           <SearchTermContextProvider>
//             <JobItemsContextProvider>{children}</JobItemsContextProvider>
//           </SearchTermContextProvider>
//         </ActiveIdContextProvider>
//       </BookmarksContextProvider>
//     </QueryClientProvider>
//   );
// }
