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
    placeholderData: (prev) => prev, // ← mantiene los datos anteriores mientras refetchea
    notifyOnChangeProps: ["data"],
  });

  const {
    data: categoria,
    isLoading: isLoadingCategoria,
    isError: isErrorCategoria,
    error: errorCategoria,
  } = useQuery({
    queryKey: ["categoria"],
    queryFn: getCategoria,
    placeholderData: (prev) => prev,
    notifyOnChangeProps: ["data"],
  });

  if (isLoadingProducts || isLoadingCategoria) return <Spinner />;

  if (isErrorProducts) return <p>Error: {errorProducts.message}</p>;
  if (isErrorCategoria) return <p>Error: {errorCategoria.message}</p>;

  return (
    <ProductContext.Provider value={{ products, categoria }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, useProductContext };
