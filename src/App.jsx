import { Spinner } from "./components/loader/Spinner";
import { useAuthContext } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { AppRoutes } from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  const { loadingAuth } = useAuthContext();
  if (loadingAuth) {
    return <Spinner />;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <AppRoutes />
        </ProductProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
