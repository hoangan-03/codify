import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
const Product = ({ product }) => {
  return (
    <div className="w-[300px] h-auto ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[250px] h-auto rounded-xl"
        />
        <HeartIcon product={product} />
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              {console.log(product)}
              <div>
                <Ratings
                  value={product.rating}
                />
                <div className="text-lg">{product.name}</div>
              </div>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
