import { ProductSize } from "../../api/products";

interface SizeBoxProps {
  size: ProductSize;
  setSelectedSize: (size: string) => void;
  selectedSize: string;
}

const SizeBox: React.FC<SizeBoxProps> = ({
  size,
  setSelectedSize,
  selectedSize,
}) => {
  const isAvailable = () => size.quantity_in_stock > 0;
  return (
    <button
      key={size.size}
      onClick={() => isAvailable() && setSelectedSize(size.size)}
      disabled={!isAvailable}
      className={`
      px-4 py-2 rounded-lg border relative
      ${
        selectedSize === size.size
          ? "border-blue-600 bg-blue-50 text-blue-600"
          : isAvailable()
          ? "border-gray-300 hover:border-gray-400"
          : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
      }
      ${!isAvailable ? "overflow-hidden" : ""}
      transition-colors
    `}
    >
      {size.size}
      {!isAvailable && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[150%] h-px bg-gray-300 absolute transform rotate-45"></div>
        </div>
      )}
    </button>
  );
};

export default SizeBox;
