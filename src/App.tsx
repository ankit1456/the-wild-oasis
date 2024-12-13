import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeContextProvider from "./context/ThemeContext";
import Router from "./Router";
import Toaster from "./ui/Toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      // 1m
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeContextProvider>
        <Router />
        <Toaster />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

export default App;
