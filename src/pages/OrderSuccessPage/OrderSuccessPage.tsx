import {
  CheckCircle,
  Package,
  Truck,
  Calendar,
  ChevronLeft,
} from "lucide-react";
import LoadingOverlay from "../../components/Loading/LoadingOverlay";
import { useGetOrderByOrderNumber } from "../../hooks/useOrder";
import { useSearchParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams(); // Get query parameters
  const order_number = searchParams.get("order_number");
  console.log(order_number);
  const getOrderMutation = useGetOrderByOrderNumber(order_number);

  if (getOrderMutation.isError) return <NotFoundPage />;

  const steps = [
    { icon: CheckCircle, text: "ההזמנה התקבלה", status: "completed" },
    { icon: Package, text: "אריזת המוצרים", status: "current" },
    { icon: Truck, text: "בדרך אליך", status: "upcoming" },
    { icon: Calendar, text: "נמסר ללקוח", status: "upcoming" },
  ];

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <LoadingOverlay isLoading={getOrderMutation.isLoading} />
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            תודה על הזמנתך!
          </h1>
          <p className="text-lg text-gray-600">
            הזמנה מספר {getOrderMutation.order?.order_number} בוצעה בהצלחה
          </p>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            מעקב הזמנה
          </h2>
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
                    ${
                      step.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : step.status === "current"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-gray-600 text-center">
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            פרטי משלוח
          </h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Truck className="w-5 h-5 ml-2" />
              <span>משלוח עד </span>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-blue-700">
              אנו נשלח לך עדכון במייל כאשר ההזמנה תצא למשלוח
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            סיכום הזמנה
          </h2>
          <div className="divide-y divide-gray-200">
            {getOrderMutation.order?.order_items.map((item) => (
              <div key={item.id} className="py-4 flex justify-between">
                <div>
                  <span className="text-gray-800">{item.product.name}</span>
                  <span className="text-gray-500 mr-2">x{item.quantity}</span>
                </div>
                <span className="text-gray-800">₪{item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="py-4 flex justify-between font-semibold">
              <span>סה"כ</span>
              <span>₪{getOrderMutation.order?.total_price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center">
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <span>המשך בקנייה</span>
            <ChevronLeft className="w-5 h-5 mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
