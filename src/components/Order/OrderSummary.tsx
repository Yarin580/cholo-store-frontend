import { CreditCard, Shield } from "lucide-react";
import { Button } from "@mui/material";
import { useState } from "react";
import OrderPaymentModel from "./OrderPaymentModel";

type OrderSummeryProps = {
  subtotal: number;
  shippingPrice: number;
};

const OrderSummary: React.FC<OrderSummeryProps> = ({
  subtotal,
  shippingPrice,
}) => {
  const [isOrderPaymentOpen, setIsOrderPaymentOpen] = useState<boolean>(false);
  const totalOrderPrice = subtotal + shippingPrice;
  return (
    <>
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">סיכום הזמנה</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">סכום ביניים</span>
            <span>₪{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">משלוח</span>
            <span>
              {shippingPrice === 0 ? "חינם" : `₪${shippingPrice.toFixed(2)}`}
            </span>
          </div>
          <div className="pt-3 border-t">
            <div className="flex justify-between font-medium text-lg">
              <span>סה"כ לתשלום</span>
              <span>₪{totalOrderPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">כולל מע"מ</p>
          </div>
        </div>

        <Button
          variant="contained"
          className="w-full"
          sx={{ marginTop: "1.5rem" }}
          onClick={() => setIsOrderPaymentOpen(true)}
          disabled={totalOrderPrice <= 0}
        >
          <CreditCard className="ml-2 h-4 w-4" />
          מעבר לתשלום
        </Button>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            תשלום מאובטח
          </div>
        </div>
      </div>

      <OrderPaymentModel
        isOpen={isOrderPaymentOpen}
        totalPrice={totalOrderPrice}
        setIsOpen={setIsOrderPaymentOpen}
      />
    </>
  );
};

export default OrderSummary;
