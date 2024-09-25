import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="p-2 border rounded w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="p-2 border rounded w-full"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex w-full">
              <button
                disabled={isLoading}
                type="submit"
                className={`bg-blue-500 text-black px-4 py-2 w-full rounded cursor-pointer my-[1rem] transition duration-300 ease-in-out ${
                  isLoading
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-blue-600 active:bg-green-500"
                }`}
              >
                <div className="text-white flex w-full justify-center items-center">
                  {isLoading ? "Signing In..." : "Sign In"}
                </div>
              </button>
            </div>

            <div className="flex w-full justify-center">
              {isLoading && <Loader />}
            </div>
          </form>

          <div className="flex w-full justify-center">
            <div className="mt-4">
              <p className="text-black">
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="text-blue-500 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        <img
          src="https://scontent.fhan4-5.fna.fbcdn.net/v/t39.30808-6/306146219_417669420451370_5895257390393900076_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=s28dYEPMJBQQ7kNvgFovm_y&_nc_ht=scontent.fhan4-5.fna&oh=00_AYCjIHbEDviY4kkD5tnwtCcknsPgNDHHiyiS93celRMO3w&oe=66F92DEC"
          alt=""
          className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    </div>
  );
};

export default Login;
