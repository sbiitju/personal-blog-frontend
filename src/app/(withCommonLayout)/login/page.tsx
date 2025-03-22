"use client";

import Image from "next/image";
import loginImage from "./login.png";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleShowPassword = () => setShow(!show);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#c5c2ff]">
      <div className="max-w-5xl flex">
        <Image
          className="rounded-l-lg hidden md:block"
          src={loginImage}
          width={300}
          height={400}
          alt="login form image"
        />
        <div className="bg-white min-h-[500px] min-w-[360px] md:min-w-[400px] flex items-center rounded-lg md:rounded-l-none md:rounded-r-lg p-6">
          <form className="space-y-4 w-full">
            <h1 className="font-bold text-xl md:text-2xl">
              Login To Dashboard
            </h1>
            <div>
              <p className="mb-2">Enter Your Email</p>
              <input
                className="p-2 w-full outline-blue-500 border-2 rounded-lg"
                type="email"
                required
              />
            </div>
            <div className="relative">
              <p className="mb-2">Enter Your Password</p>
              <input
                className="p-2 w-full outline-blue-500 border-2 rounded-lg"
                type={show ? "text" : "password"}
                required
              />
              {show ? (
                <div
                  onClick={handleShowPassword}
                  className="absolute top-11 right-4 cursor-pointer"
                >
                  <FaEyeSlash className="text-xl " />
                </div>
              ) : (
                <div
                  onClick={handleShowPassword}
                  className="absolute top-11 right-4 cursor-pointer"
                >
                  <FaEye className="text-xl" />
                </div>
              )}
            </div>
            <div>
              <Link
                href={""}
                className="text-blue-700 underline hover:cursor-pointer"
              >
                forgot password?
              </Link>
            </div>
            <button className="bg-blue-600 hover:bg-gray-300 hover:text-black text-white font-bold uppercase rounded-lg py-2 text-center w-full cursor-pointer transition-all duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
