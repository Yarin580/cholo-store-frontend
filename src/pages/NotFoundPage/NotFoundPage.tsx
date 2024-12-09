import { Home } from "lucide-react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        {/* Animated Element */}
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-bold text-blue-500">4</span>
            <div className="animate-bounce">
              <span className="text-8xl font-bold text-blue-500">0</span>
            </div>
            <span className="text-8xl font-bold text-blue-500">4</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            אופס! העמוד לא נמצא
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            מצטערים, אבל העמוד שחיפשת לא קיים. יתכן שהוא הוסר או שהכתובת שגויה
          </p>
        </div>

        {/* Button */}
        <button
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => (window.location.href = "/")}
          dir="rtl"
        >
          <Home className="w-5 h-5 ml-2" />
          חזרה לדף הבית
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
