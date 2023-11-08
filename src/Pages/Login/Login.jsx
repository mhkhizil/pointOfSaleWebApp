import React, { useState } from "react";

import { useLoginMutation } from "../../Feature/API/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../Feature/Service/authSlice";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("tth@gmail.com");
  const [password, setPassword] = useState("11223344");
  const [login] = useLoginMutation();
  const nav = useNavigate();

  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log([email,password]);
    // tth@gmail.com 11223344
    //tth123@gmail.com changed email 28.8.23
    try {
      const user = { email, password };
      const { data } = await login(user);
      console.log(data);
      dispatch(addUser({ user: data?.user?.email, token: data?.token }));

      if (data == undefined) {
        toast.error("Please enter a valid email !", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
        //nav("/login");
      } else {
        if (data?.message === "Login successfully") {
          toast.success("Login Successfully !", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,

            hideProgressBar: true,
            theme: "dark",
          });
          setIsLoading(false);
          nav("/");
        } else if (data?.message === "Username or password wrong") {
          toast.error("Either the email or the pasword is wrong !", {
            position: toast.POSITION.BOTTOM_CENTER,
            hideProgressBar: true,
            autoClose: 2000,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#161618] h-screen w-screen">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          className="flex rounded-lg shadow-lg w-full  lg:w-2/3 bg-[#202124] sm:mx-0"
          style={{ height: 550 }}
        >
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-3xl text-center font-thin">
                Welcome to MMS POS{" "}
              </h1>
              <div className="w-full mt-4">
                <form
                  className="form-horizontal w-3/4 mx-auto"
                  method="POST"
                  action="#"
                >
                  <div className="flex flex-col mt-4">
                    <input
                      id="email"
                      type="text"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password"
                    />
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="mr-2"
                    />{" "}
                    <label
                      htmlFor="remember"
                      className="text-sm text-grey-dark"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div className="flex flex-col mt-8">
                    <button
                      type="submit"
                      onClick={loginHandler}
                      className="bg-blue-500 tracking-wider  text-center hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                      {isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <span>Login</span>
                      )}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <a
                    className="no-underline hover:underline text-blue-dark text-xs"
                    href="#"
                  >
                    Forgot Your Password?
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden md:block md:w-1/2 rounded-r-lg"
            style={{
              background:
                'url("https://img.freepik.com/free-vector/self-checkout-concept-illustration_114360-2331.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
