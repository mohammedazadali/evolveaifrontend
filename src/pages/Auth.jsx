import React, { useState } from "react";
import { login } from "../assets/data";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <>
      <section className="justify-center flex items-center h-screen bg-white">
        <div className="md:w-[60%] w-full flex justify-center  bg-white rounded-2xl gap-[10px] shadow-2xl">
          <div className="basis-[50%]  ">
            <img src={login} alt="login" className="rounded-2xl h-full object-cover" />
          </div>
          <div className="basis-[50%]  p-[20px] flex flex-col justify-center h-[100%] bg-green-300">
            <h1 className="text-center text-2xl font-bold mb-5">{activeTab === 'signin' ? 'Welcome Back!' : 'Join Now!'}</h1>
            <form>
                <div>
                    <label className="">UserName</label>
                    <input type="text" className="bg-[#F3F1FF] outline-none rounded-[5px] w-full p-[10px] mt-3 mb-3" />
                </div>
                {
                    activeTab === 'signup' && (
                        <div>
                    <label className="mt-3">Email</label>
                    <input type="text" className="bg-[#F3F1FF] outline-none rounded-[5px] w-full p-[10px] mt-3 mb-3" />
                </div>
                    )
                }
                <div>
                    <label className="mt-3">Password</label>
                    <input type="text" className="bg-[#F3F1FF] outline-none rounded-[5px] w-full p-[10px] mt-3 mb-3" />
                </div>
                <button className="bg-[#553EEE] w-full text-white p-[10px] mt-5">
                    {activeTab === 'signin' ? 'Login' : 'SignUp'}
                </button>
            </form>
            <div className={`bg-gray-100  rounded-full w-[250px] h-[50px] flex justify-center items-center gap-10 relative mt-5 m-auto`}>
              <div className={`absolute top-0 left-0 bg-[#553EEE]  w-1/2 h-full transition-all rounded-full duration-500 ease-in-out ${activeTab === 'signup' ? 'translate-x-full' : 'translate-x-0'} `}/>
              <button className={`cursor-pointer relative p-[10px] px-[20px] flex justify-center items-center ${activeTab === 'signup' ? 'text-black' : 'text-white'}`} onClick={()=>{setActiveTab('signin')}}>SignIn</button>
              <button className={`cursor-pointer relative p-[10px] px-[20px] flex justify-center items-center ${activeTab === 'signin' ? 'text-black' : 'text-white'}`} onClick={()=>{setActiveTab('signup')}}>SignUp</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
