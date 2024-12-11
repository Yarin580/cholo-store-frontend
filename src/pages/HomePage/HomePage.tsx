import { useState, useEffect } from "react";
import Card from "../../components/ItemCard/Card";
import "./HomePage.css";
import { useGetProducts } from "../../hooks/useProducts";
import { CardItem } from "../../components/ItemCard/types";
const HomePage: React.FC = () => {
  const [scrollingUp, setScrollingUp] = useState(true);

  const { products } = useGetProducts();

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll < lastScrollTop) {
        // Scrolling up
        setScrollingUp(true);
      } else {
        // Scrolling down
        setScrollingUp(false);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className=" relative image-div text-white z-10 ">
        <video
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/assets/10677461-uhd_4096_2160_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div
          className={`absolute inset-0 flex items-center justify-center text-white flex-col transition-all duration-700 ${
            scrollingUp ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-2xl md:text-6xl">Be Uniqe Be Cholo</span>
        </div>
      </div>

      <div className="mt-5 w-ful flex justify-center">
        <div className="container">
          <div className="flex items-center justify-center">
            <span className="text-3xl text-gray-400">כל המוצרים</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5" dir="rtl">
            {products?.map((product, key) => {
              const cardItem: CardItem = {
                id: product.id,
                name: product.name,
                category_id: product.category_id,
                description: product.description,
                sale_price: product.sale_price,
                original_price: product.original_price,
              };
              return <Card key={key} cardItem={cardItem} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
