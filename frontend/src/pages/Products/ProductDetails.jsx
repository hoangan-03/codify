import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="pt-[50px] w-screen h-auto flex flex-col px-24">
      <div>
        <Link
          to="/"
          className="text-black text-xl font-semibold hover:underline"
        >
          Back to shop
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[30rem] lg:w-[15rem] md:w-[10rem] mr-[2rem] rounded-2xl"
              />

              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[55rem] md:w-[50rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl mb-6 font-extrabold">$ {product.price}</p>

              <div className="flex items-center justify-between w-full">
                <div className="one flex flex-col gap-8">
                  <h1 className="flex items-center">
                    <FaStore className="mr-2 text-black" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center w-[20rem]">
                    <FaClock className="mr-2 text-black" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center">
                    <FaStar className="mr-2 text-black" />  Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two flex flex-col gap-8">
                  <h1 className="flex items-center">
                    <FaStar className="mr-2 text-black" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center">
                    <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-centerw-[10rem]">
                    <FaBox className="mr-2 text-black" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between mt-10 flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews `}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-sky-600 text-white py-2 px-8 rounded-2xl mt-6"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            {/* <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
