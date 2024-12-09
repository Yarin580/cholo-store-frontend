import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import ItemPage from "./pages/ItemPage/ItemPage";
import Footer from "./components/Footer/Footer";
import ContactPage from "./pages/ContactPage/ContactPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import CartPage from "./pages/CartPage/CartPage";
import { CartProvider } from "./context/cartProvider";
import SystemLoginPage from "./pages/System/SystemLoginPage/SystemLoginPage";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-full flex flex-col">
      <CartProvider>
        <NavBar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections/:categoryID" element={<CategoryPage />} />
            <Route path="/collections/shirts/:id" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/system/login" element={<SystemLoginPage />} />
            <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
