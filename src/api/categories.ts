import axiosInstance from "./axiosInstance";

export interface Category {
  id: string;
  name: string;
}

export interface ProductSize {
  size: string;
  quantity_in_stock: string;
}

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get("/categories");
    return res.data;
  } catch {
    throw new Error("Error while fetching categories");
  }
};

export const getCategory = async (id: number): Promise<Category> => {
  try {
    const res = await axiosInstance.get(`/categories/${id}`);
    return res.data;
  } catch {
    throw new Error("Error while fetching category with id: " + id);
  }
};
