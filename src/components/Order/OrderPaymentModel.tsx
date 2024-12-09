import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Form, { FormField } from "../Form/Form";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "../../hooks/useOrder";
import {
  OrderCreateRequest,
  OrderItemCreate,
  OrderResponse,
} from "../../api/order";
import { toast } from "react-toastify";

type OrderPaymentModelProps = {
  isOpen: boolean;
  totalPrice: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const OrderPaymentModel: React.FC<OrderPaymentModelProps> = (props) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { cart, clearCart } = useCart();

  const navigate = useNavigate();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "buyer_name":
        return !value.trim() ? "נא להזין שם מלא" : "";
      case "shipping_postal_code":
        return !/^\d{5,7}$/.test(value) ? "נא להזין מיקוד תקין" : "";
      case "buyer_phone":
        return !/^05\d{8}$/.test(value) ? "נא להזין מספר טלפון נייד תקין" : "";
      case "buyer_email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "נא להזין כתובת אימייל תקינה"
          : "";
      default:
        return "";
    }
  };
  const formFields: FormField[] = [
    {
      name: "buyer_name",
      label: "שם מלא",
      type: "text",
      required: true,
    },
    {
      name: "buyer_phone",
      label: "מספר טלפון",
      type: "number",
      required: true,
    },
    {
      name: "buyer_email",
      label: "מייל",
      type: "text",
      required: true,
      fullWidth: true,
    },

    {
      name: "shipping_address",
      label: "כתובת",
      type: "text",
      required: true,
      fullWidth: true,
    },
    {
      name: "shipping_city",
      label: "עיר",
      type: "text",
      required: true,
    },
    {
      name: "shipping_postal_code",
      label: "מיקוד",
      type: "text",
      required: true,
    },
    {
      name: "shipping_method",
      label: "שיטת משלוח",
      type: "text",
      required: true,
      fullWidth: true,
    },
  ];

  useEffect(() => {
    if (props.isOpen) {
      setIsAnimating(true);
    }
  }, [props.isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    // Wait for animation to complete before closing
    setTimeout(() => props.setIsOpen(false), 200);
  };

  const handleSuccess = (orderRes: OrderResponse) => {
    clearCart();
    navigate(`/order/success?order_number=${orderRes.order_number}`, {
      replace: true,
    });
  };

  const handleError = (error: any) => {
    console.log(error);
    console.log("dasdasdassada");
    toast.error("יצירת הזמנה נכשלה. אנא צור קשר");
  };

  const createOrderMutation = useCreateOrder(handleSuccess, handleError);

  const handleOnSubmit = async (formData: {
    buyer_email: string;
    buyer_name: string;
    buyer_phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_method: string;
    shipping_postal_code: string;
  }) => {
    console.log(formData);
    const orderItems: OrderItemCreate[] = [];
    cart.forEach((cartItem) => {
      orderItems.push({
        product_id: cartItem.id,
        price: cartItem.price,
        quantity: cartItem.quantity,
        size: cartItem.size,
      });
    });
    const orderToCreate: OrderCreateRequest = {
      recipient_name: formData.buyer_name,
      shipping_address: formData.shipping_address,
      shipping_city: formData.shipping_city,
      shipping_country: "ישראל",
      shipping_method: formData.shipping_method,
      shipping_postal_code: formData.shipping_postal_code,
      total_price: props.totalPrice,
      order_number: "ORD-" + Math.random() * 1000,
      buyer: {
        name: formData.buyer_name,
        email: formData.buyer_email,
        phone: formData.buyer_phone,
      },
      order_items: orderItems,
    };
    console.log(orderToCreate);
    createOrderMutation.mutate(orderToCreate);
  };
  return (
    <>
      {props.isOpen ? (
        <div
          className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-200 
          ${isAnimating ? "opacity-100" : "opacity-0"}`}
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-gray-500 transition-opacity duration-200
            ${isAnimating ? "bg-opacity-75" : "bg-opacity-0"}`}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className={`relative max-w-2xl w-full bg-white rounded-xl shadow-lg transform transition-all duration-200
              ${
                isAnimating
                  ? "scale-100 translate-y-0"
                  : "scale-95 translate-y-4"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="text-2xl">&times;</span>
              </button>

              <div className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">
                    פרטי משלוח
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    נא למלא את כל השדות הנדרשים
                  </p>
                </div>

                <Form
                  fields={formFields}
                  onSubmit={handleOnSubmit}
                  validateField={validateField}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OrderPaymentModel;
