import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import {
  createOrder,
  getOrderByOrderNumber,
  OrderCreateRequest,
  OrderResponse,
} from "../api/order";

export const useCreateOrder = (
  onSuccess: (data: OrderResponse) => void,
  onError?: (error: any) => void
): UseMutationResult<
  OrderResponse | undefined,
  any,
  OrderCreateRequest,
  unknown
> => {
  const createOrderMutation = useMutation({
    mutationFn: (req: OrderCreateRequest) => createOrder(req),
    onSuccess: onSuccess,
    onError: onError,
  });

  return createOrderMutation;
};

export const useGetOrderByOrderNumber = (order_number: string | null) => {
  // Using the `useQuery` hook to fetch products data
  const { data, error, isLoading, isError } = useQuery<OrderResponse, Error>({
    queryKey: ["order", order_number],
    queryFn: () => getOrderByOrderNumber(order_number!),
    enabled: !!order_number,
  });

  return {
    order: data, // Products data from the API
    error, // Any error encountered during fetching
    isLoading, // Loading state
    isError, // Error state
  };
};
