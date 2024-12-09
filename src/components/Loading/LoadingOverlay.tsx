import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const LoadingOverlay = ({ isLoading = true }) => {
  const [showCheck, setShowCheck] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowCheck(true);
        setTimeout(() => {
          setShow(false);
        }, 2000);
      }, 300);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative">
        {isLoading ? (
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          showCheck && (
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]">
              <Check className="w-8 h-8 text-white" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
