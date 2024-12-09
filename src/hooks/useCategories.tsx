import { useQuery } from "@tanstack/react-query";
import { Category, getAllCategories, getCategory } from "../api/categories";

export const useGetCategories = () => {
  // Using the `useQuery` hook to fetch products data
  const { data, error, isLoading, isError } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return {
    categories: data, // Products data from the API
    error, // Any error encountered during fetching
    isLoading, // Loading state
    isError, // Error state
  };
};

export const useGetCategory = (category_id: number) => {
  const { data, error, isLoading, isError } = useQuery<Category, Error>({
    queryKey: ["category", category_id],
    queryFn: () => getCategory(category_id!),
  });

  return {
    category: data, // Products data from the API
    error, // Any error encountered during fetching
    isLoading, // Loading state
    isError, // Error state
  };
};
