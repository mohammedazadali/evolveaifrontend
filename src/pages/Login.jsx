import React, { useState } from "react";
import { login, logo } from "../assets/data";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const {setUser} = useAuth()
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate();
  const url =
    activeTab === "signin"
      ? "https://dantrendsapi-50029223867.development.catalystappsail.in/api/auth/login"
      : "https://dantrendsapi-50029223867.development.catalystappsail.in/api/auth/register";

const formik = useFormik({
  initialValues: {
    username: "",
    password: "",
    email: "",
  },
onSubmit: async (values, { resetForm, setFieldValue }) => {
  try {
    const payload = {
      username: values.username,
      password: values.password,
    };

    if (activeTab === "signup") {
      payload.email = values.email;
    }

    const response = await axios.post(url, payload);
    const token = response.data.token;
    const username = response.data?.user?.username || "Guest"; 
    const userId = response.data?.user?.id;

    if (response.status === 200) {
  toast.success("Login successful!", {
    position: "top-right",
    autoClose: 3000,
  });

  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("userId", userId);

  setUser({ token, username, userId });

  navigate("/");
}
    else if (response.status === 201) {
 
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 3000,
      });


      setActiveTab("signin");

      setFieldValue("username", values.username);
      setFieldValue("password", values.password);
    } 
    else {
      toast.error("Unexpected response from server.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Something went wrong. Try again.";
    toast.error(errMsg, {
      position: "top-right",
      autoClose: 3000,
    });
    console.error("Login error \n", error.response?.data || error.message);
  }


  if (activeTab === "signup") {
    setFieldValue("email", "");
  }
}

});


  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-[90%] xl:w-[60%] flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden p-[30px] gap-[20px]">
          <div className="hidden md:flex  w-full md:w-1/2 p-6 bg-[#A3B18C] rounded-3xl relative">
            <h1 className="text-white text-4xl font-bold">
              Wear the Trend Own the Moment! with DanTrend
            </h1>
            <img src={login} alt="" className="absolute bottom-0 w-[90%]" />
          </div>

          <div className="w-full md:w-1/2 p-2 py-8 flex flex-col justify-center">
            <div className="flex justify-center items-center">
              <img src={logo} alt="" className="w-[200px] " />
            </div>
            <h1 className="text-center text-3xl font-bold  mt-6">
             {activeTab === "signin" ? "Welcome Back!" : "Join Now"}
            </h1>
            <p className="text-center mb-6 font-extralight">
              {activeTab === "signin" ? "please login with your account" : "create your new account"}
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="example@1234"
                  className="bg-[#F3F4F6] rounded-md w-full p-3 mt-2 outline-none border border-gray-300 "
                />
              </div>

              {activeTab === "signup" && (
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="bg-[#F3F4F6] rounded-md w-full p-3 mt-2 outline-none border border-gray-300 "
                  />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="@*/$00"
                  className="bg-[#F3F4F6] rounded-md w-full p-3 mt-2 outline-none border border-gray-300 "
                />
              </div>

              <button
                type="submit"
                className="bg-[#A6C18F] cursor-pointer  transition duration-300 rounded-md w-full text-white p-3 mt-4 font-semibold"
              >
                {activeTab === "signin" ? "Login Now" : "Sign Up"}
              </button>
              <p className="text-center text-sm mt-4">
                {activeTab === "signin" ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("signup")}
                      className="text-[#A6C18F]  font-semibold"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("signin")}
                      className="text-[#A6C18F]  font-semibold"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
