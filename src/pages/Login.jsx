import React, { useState } from "react";
import { login } from "../assets/data";
import { useFormik } from "formik";
import axios from "axios";
import {useNavigate} from 'react-router'

const Login = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {debugger;
      try {
        const response = await axios.post(
          "https://evolveai-4.onrender.com/api/auth/login",
          values
        );
        const token = response.data.token

        if (response.status === 200) {
          localStorage.setItem("token",token);
          navigate('/chatbot')
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Login error", error.response?.data || error.message);
      }

      resetForm();
    },
  });

  return (
    <>
      <section className="justify-center flex items-center h-screen bg-white">
        <div className="md:w-[50%] w-[90%] flex md:flex-row flex-col justify-center  items-center bg-white rounded-2xl gap-[10px] shadow-2xl">
          <div className="md:basis-[50%] md:block hidden  ">
            <img
              src={login}
              alt="login"
              className="rounded-2xl h-full object-cover"
            />
          </div>
          <div className="md:basis-[50%] basis-[40%]  w-full  p-[20px] flex flex-col justify-center h-[100%]">
            <h1 className="text-center text-2xl font-bold mb-5">
              Welcome Back!
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label className="">UserName</label>
                <input
                  type="text"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="bg-[#F3F1FF] outline-none rounded-[5px] w-full p-[10px] mt-3 mb-3"
                />
              </div>
              <div>
                <label className="mt-3">Password</label>
                <input
                  type="text"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="bg-[#F3F1FF] outline-none rounded-[5px] w-full p-[10px] mt-3 mb-3"
                />
              </div>
              <button
                type="submit"
                className="bg-[#553EEE] rounded-4xl w-full text-white p-[10px] mt-5 cursor-pointer"
              >
                Login Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
