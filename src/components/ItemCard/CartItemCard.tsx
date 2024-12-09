// import SizeBox from "./SizeBox";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../context/cartProvider";
import React from "react";

import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CartCardProps {
  cartItem: CartItem;
}

const CartItemCard: React.FC<CartCardProps> = ({ cartItem }) => {
  const { removeFromCart, addToCart, removeQuantityFromItem } = useCart();
  const navigate = useNavigate();
  return (
    <div key={cartItem.id} className="p-4">
      <div className="flex gap-4">
        <img
          src={`/assets/shirts/${cartItem.id}.jpg`}
          onClick={() =>
            navigate(`/collections/shirts/${cartItem.id}`, { replace: true })
          }
          alt={cartItem.name}
          className="w-24 h-24 object-cover rounded-lg hover:cursor-pointer"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{cartItem.name}</h3>

            <Button
              variant="outlined"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => {
                removeFromCart(cartItem.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-2 space-y-2">
            <div className="flex gap-4 text-sm text-gray-500">
              <span>מידה: {cartItem.size}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button
                  className="h-8 w-8"
                  onClick={() => removeQuantityFromItem(cartItem.id)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{cartItem.quantity}</span>
                <button
                  className="h-8 w-8"
                  onClick={() => {
                    cartItem = { ...cartItem, quantity: 1 };
                    addToCart(cartItem);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="text-left">
                <div className="font-medium">
                  ₪{(cartItem.price * cartItem.quantity).toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  ₪{cartItem.price.toFixed(2)} ליחידה
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
