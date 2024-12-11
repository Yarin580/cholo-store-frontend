import Card from "../../components/ItemCard/Card";
import { CardItem } from "../../components/ItemCard/types";
import { useGetCategory } from "../../hooks/useCategories";
import { useGetProductsByCategory } from "../../hooks/useProducts";
import "./CategoryPage.css";

type CategoryPageProps = {
  category_id?: number;
};

const CategoryPage: React.FC<CategoryPageProps> = ({ category_id }) => {
  const url = window.location.pathname; // Get the current path
  const lastSegment = Number(url.substring(url.lastIndexOf("/") + 1)); // Extract after the last '/'
  const { category } = useGetCategory(category_id ? category_id : lastSegment);
  const { products } = useGetProductsByCategory(
    category_id ? category_id : lastSegment
  );

  return (
    <>
      <div className=" relative image-div-category text-white z-10 h-20 ">
        <div
          className={`absolute inset-0 flex items-center justify-center text-white flex-col transition-all duration-700`}
        >
          <span className="text-4xl">{category?.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* רשימת המוצרים */}
        <div className="flex justify-center items-center" dir="rtl">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product, key) => {
              const cardItem: CardItem = {
                id: product.id,
                name: product.name,
                description: product.description,
                sale_price: product.sale_price,
                category_id: product.category_id,
                original_price: product.original_price,
              };

              // Add a class for card size adjustment
              return (
                <div className="transform scale-90">
                  <Card key={key} cardItem={cardItem} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
