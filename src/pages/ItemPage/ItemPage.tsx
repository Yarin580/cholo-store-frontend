import Tabs from "../../components/Tabs/Tabs";
import { useParams } from "react-router-dom";
import { useGetProduct } from "../../hooks/useProducts";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { CartItem } from "../../context/cartProvider";
import { useCart } from "../../hooks/useCart";
import { Product } from "../../api/products";
import SizeBox from "../../components/ItemCard/SizeBox";

const ItemPage: React.FC = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { addToCart } = useCart();

  const { product } = useGetProduct(id);
  console.log(product);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  function handleAddToCart(product: Product): void {
    if (!selectedSize) {
      alert("אנא בחר מידה");
      return;
    }
    const finalPrice =
      product.original_price === product.sale_price
        ? product.original_price
        : product.sale_price;
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      price: finalPrice,
      quantity: quantity,
      size: selectedSize,
    };
    addToCart(newItem);
  }

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* תמונת המוצר */}
            <div className="relative aspect-square">
              <img
                src={`https://cholo-store.s3.eu-north-1.amazonaws.com/${
                  import.meta.env.VITE_APP_ENV
                }/collections/${product?.category_id}/${product?.id}.jpg`}
                alt="תמונת המוצר"
                className="w-full h-full object-cover"
              />
            </div>

            {/* פרטי המוצר */}
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product?.name}
                </h1>
              </div>

              <div className="flex items-baseline">
                {product?.original_price === product?.sale_price ? (
                  <>
                    <span className="text-xl font-bold text-gray-900">
                      ₪{product?.original_price}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl font-bold text-gray-900 ml-5">
                      ₪{product?.sale_price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₪{product?.original_price}
                    </span>
                  </>
                )}
              </div>

              {/* מידות המוצר */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-3">פרטים על המוצר:</h3>
                <div className="">{product?.description}</div>
              </div>
              {/* בחירת מידה */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">בחר מידה:</h3>
                <div className="flex flex-wrap gap-3">
                  {product?.sizes.map((size) => (
                    <SizeBox
                      size={size}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                    />
                  ))}
                </div>
                {/* טבלת מידות */}
                <button
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                  onClick={() => {
                    /* להוסיף פונקציונליות לפתיחת טבלת מידות */
                  }}
                >
                  מדריך מידות
                </button>
              </div>

              {/* בחירת כמות */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-lg font-medium">כמות:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* כפתור הוספה לעגלה */}
              <button
                className="w-full py-4 px-6 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => handleAddToCart(product!)}
              >
                <ShoppingCart className="ml-2" />
                הוסף לעגלת הקניות
              </button>

              {/* מידע נוסף */}
              <div className="space-y-4 text-gray-600">
                <Tabs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
