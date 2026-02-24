import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoria, getProducts } from "../services/productService";
import { Spinner } from "../components/loader/Spinner";

const ProductContext = createContext();

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("No hay contexto de productos");
  return context;
};

const ProductProvider = ({ children }) => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchType: "active",
  });
  const {
    data: categoria,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categoria"],
    queryFn: getCategoria,
    refetchType: "active",
  });

  if (isLoading) return <Spinner />;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ProductContext.Provider value={{ products, categoria }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, useProductContext };
