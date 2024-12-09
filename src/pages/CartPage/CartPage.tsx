import { Truck, Clock } from "lucide-react";
import { useCart } from "../../hooks/useCart";

import CartItemCard from "../../components/ItemCard/CartItemCard";
import OrderSummary from "../../components/Order/OrderSummary";

const ShippingInfo = () => (
  <div className="grid grid-cols-2 gap-4 mb-6">
    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
      <Truck className="text-blue-600" />
      <div>
        <h4 className="font-medium text-sm">משלוח חינם</h4>
        <p className="text-sm text-gray-600">לזמן מוגבל</p>
      </div>
    </div>
    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
      <Clock className="text-green-600" />
      <div>
        <h4 className="font-medium text-sm">משלוח מהיר</h4>
        <p className="text-sm text-gray-600">תוך 3-5 ימי עסקים</p>
      </div>
    </div>
  </div>
);

const CartPage: React.FC = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;

  return (
    <div className="min-h-screen " dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">עגלת הקניות שלך</h1>
          <span className="mr-3 text-gray-500">({cart?.length} פריטים)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ShippingInfo />

            <div className="space-y-4">
              {cart?.map((cartItem, key) => (
                <CartItemCard key={key} cartItem={cartItem} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary shippingPrice={shipping} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
