import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
  useUploadProductCodeMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [code, setCode] = useState(null);
  const [codeUrl, setCodeUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [uploadProductCode] = useUploadProductCodeMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory(categories[0]._id);
    }
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image === "") {
      toast.error("Please select an image", toastOptions);
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      productData.append("code", code);

      console.log('image:', image);
      console.log('name:', name);
      console.log('description:', description);
      console.log('price:', price);
      console.log('category:', category);
      console.log('quantity:', quantity);
      console.log('brand:', brand);
      console.log('stock:', stock);
      console.log('code:', code);

      const { data } = await createProduct(productData);

      if (data.error) {
        console.error(data.error);
        toast.error(data.error, toastOptions);
      } else {
        toast.success(`${data.name} is created`, toastOptions);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.", toastOptions);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message, toastOptions);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error, toastOptions);
    }
  };

  const uploadCodeHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file.type);
    if (file && file.type === "application/x-zip-compressed") {
      const formData = new FormData();
      formData.append("code", file);

      try {
        const res = await uploadProductCode(formData).unwrap();
        toast.success(res.message, toastOptions);
        setCode(res.code);
        setCodeUrl(res.code);
      } catch (error) {
        toast.error(error?.data?.message || error.error, toastOptions);
      }
    } else {
      toast.error("Please upload a valid ZIP file.", toastOptions);
    }
  };

  const inputBoxStyle = "p-4 mb-3 w-[30rem] border rounded-lg bg-[#fff] text-black";
  const toastOptions = {
    position: "bottom-right",
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <h1>Create Product</h1>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {code ? code.name : "Upload Code"}

              <input
                type="file"
                name="code"
                accept=".zip"
                onChange={uploadCodeHandler}
                className={!code ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap justify-between gap-5">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className={inputBoxStyle}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className={inputBoxStyle}
                  value={price}
                  min={0}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-5">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className={inputBoxStyle}
                  value={quantity}
                  min={0}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className={inputBoxStyle}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="w-full p-2 mb-3 bg-[#fff] border rounded-lg text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between gap-5">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className={inputBoxStyle}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className={inputBoxStyle}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 confirm"
            >
              <p>
                Submit
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;