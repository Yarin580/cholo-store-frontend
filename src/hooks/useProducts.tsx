import { useQuery } from "@tanstack/react-query";
import {
  getAllProducts,
  getProduct,
  getProductByCategory,
  Product,
} from "../api/products";

export const useGetProducts = () => {
  // Using the `useQuery` hook to fetch products data
  const { data, error, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return {
    products: data, // Products data from the API
    error, // Any error encountered during fetching
    isLoading, // Loading state
    isError, // Error state
  };
};

export const useGetProduct = (id: string | undefined) => {
  // Using the `useQuery` hook to fetch products data
  const { data, error, isLoading, isError } = useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });

  return {
    product: data, // Products data from the API
    error, // Any error encountered during fetching
    isLoading, // Loading state
    isError, // Error state
  };
};

export const useGetProductsByCategory = (category_id: number) => {
  const { data, error, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ["products", category_id],
    queryFn: () => getProductByCategory(category_id!),
    enabled: !!category_id,
  });

  return {
    products: data, // Products data from the API
    error, // Any error encountered during fetching
    isLoading, // Loading state
    isError, // Error state
  };
};
