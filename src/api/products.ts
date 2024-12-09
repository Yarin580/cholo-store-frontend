import axiosInstance from "./axiosInstance";

export interface Product {
  id: string;
  name: string;
  description: string;
  original_price: number;
  sale_price: number;
  sizes: ProductSize[] | [];
}

export interface ProductSize {
  size: string;
  quantity_in_stock: number;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await axiosInstance.get("/products");
    return res.data;
  } catch {
    throw new Error("Error while fetching products");
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  } catch {
    throw new Error("Error while fetching product with id: " + id);
  }
};

export const getProductByCategory = async (
  category_id: number
): Promise<Product[]> => {
  try {
    const res = await axiosInstance.get(`/categories/${category_id}/products`);
    return res.data;
  } catch {
    throw new Error("Error while fetching products");
  }
};
