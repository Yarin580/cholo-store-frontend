// import SizeBox from "./SizeBox";
import { useNavigate } from "react-router-dom";
import { CardItem } from "./types";

interface CardProps {
  cardItem: CardItem;
}

const Card: React.FC<CardProps> = ({ cardItem }) => {
  const navigate = useNavigate();
  console.log(cardItem);
  return (
    <>
      <div
        key={cardItem.id}
        className="bg-white rounded-lg shadow-md shadow-gray-200 overflow-hidden hover:shadow-lg transition-shadow hover:cursor-pointer"
        dir="rtl"
        onClick={() => {
          navigate(`/collections/shirts/${cardItem.id}`);
          window.scroll(0, 0);
        }}
      >
        <div className="aspect-square relative">
          <img
            src={`https://cholo-store.s3.eu-north-1.amazonaws.com/${
              import.meta.env.VITE_APP_ENV
            }/collections/${cardItem.category_id}/${cardItem.id}.jpg`}
            alt={cardItem.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">{cardItem.name}</h3>
          <div className="flex items-baseline gap-2">
            {cardItem.original_price === cardItem.sale_price ? (
              <>
                <span className="text-xl font-bold text-gray-900">
                  ₪{cardItem.original_price}
                </span>
              </>
            ) : (
              <>
                <span className="text-xl font-bold text-gray-900">
                  ₪{cardItem.sale_price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₪{cardItem.original_price}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div
        className="h-[40vh]  m-5 hover:cursor-pointer"
        onClick={() => {
          navigate(`/collections/shirts/${cardItem.id}`);
          window.scrollTo(0, 0);
        }}
      >
        <div className=" h-[60%] w-[100%] m-2 bg-gray-200">
          <img
            src={`/assets/shirts/${cardItem.id}.jpg`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center mb-2 ">
          <span className="text-[20px] text-neutral-400">{cardItem.name}</span>
          <span className="text-[15px] text-neutral-400">
            {cardItem.original_price}₪
          </span>
        </div>
        <div className="mr-10 ml-10 flex justify-between ">
          {cardItem.sizes.map((size, key) => (
            <SizeBox key={key} size={size.size} />
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Card;
