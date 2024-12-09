import axiosInstance from "./axiosInstance";
import { Product } from "./products";

export interface BuyerCreate {
  name: string;
  email: string;
  phone: string;
}
export interface BuyerResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface OrderItemCreate {
  product_id: string;
  quantity: number;
  size: string;
  price: number;
}
export interface OrderItemResponse {
  id: number;
  product: Product;
  quantity: number;
  size: string;
  price: number;
}

export interface OrderCreateRequest {
  total_price: number;
  recipient_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  shipping_method: string;
  order_number: string;
  order_items: OrderItemCreate[];
  buyer: BuyerCreate;
}

export interface OrderResponse {
  id: number;
  total_price: number;
  status: string;
  recipient_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  shipping_method: string;
  order_number: string;
  order_items: OrderItemResponse[];
  buyer: BuyerResponse;
}

export interface OrderGetRequest {
  ordernumber?: string;
}

export const createOrder = async (
  orderToCreate: OrderCreateRequest
): Promise<OrderResponse> => {
  try {
    const res = await axiosInstance.post("/orders/", orderToCreate);
    return res.data;
  } catch {
    throw new Error("Cannot create order. please contact us");
  }
};

export const getOrderByOrderNumber = async (
  order_number: string
): Promise<OrderResponse> => {
  try {
    const res = await axiosInstance.get(
      `/orders/?order_number=${order_number}`
    );
    console.log(res.data[0]);
    return res.data[0];
  } catch {
    throw new Error("Error While trying to get order");
  }
};
