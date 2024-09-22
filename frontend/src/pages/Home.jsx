import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* {!keyword ? <Header /> : null} */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <div className="flex flex-col gap-4 px-[15rem] pt-[5rem]">
          <div className="flex justify-between flex-row items-center">
            <h1 className="text-white font-bold text-3xl">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 hover:bg-pink-500 font-bold rounded-full py-2 px-10 "
            >
              Shop
            </Link>
          </div>

          <div className="flex justify-center w-full  flex-wrap ">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
