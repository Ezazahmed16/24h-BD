"use client";

import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  SuccessToast,
} from "@/Utility/FromHandler";
import SubmitButton from "@/Utility/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Toaster } from "react-hot-toast";
const RegisterForm = () => {
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const inputChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const fromSubmit = async () => {
    if (IsEmpty(data.firstName)) {
      ErrorToast("first Name is Required");
    } else if (IsEmpty(data.lastName)) {
      ErrorToast("last name is Required");
    } else if (IsEmpty(data.mobile)) {
      ErrorToast("mobile Number is Required");
    } else if (IsEmail(data.email)) {
      ErrorToast("valid email Address is Required");
    } else if (IsEmpty(data.password)) {
      ErrorToast("password is Required");
    } else {
      setSubmit(true);
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let res = await fetch("/api/user/registration", options);
      let ResJson = await res.json();
      if (ResJson["status"] === "success") {
        SuccessToast("Registration Success");
        router.push("/user/login");
      } else {
        setSubmit(false);
        ErrorToast("Request Fail");
      }
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="max-w-2xl mx-auto py-6 px-8 mt-5 mb-5 bg-white rounded shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-6">
            User Registration
          </h1>
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block text-gray-800 font-bold"
            >
              First Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              onChange={(e) => inputChange("firstName", e.target.value)}
              placeholder="First Name"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="lastName" className="block text-gray-800 font-bold">
              Last Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              onChange={(e) => inputChange("lastName", e.target.value)}
              placeholder="Last Name"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="mobile" className="block text-gray-800 font-bold">
              Mobile: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="mobile"
              onChange={(e) => inputChange("mobile", e.target.value)}
              placeholder="Mobile"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-bold">
              Email: <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => inputChange("email", e.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-bold">
              Password: <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => inputChange("password", e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>
          <SubmitButton
            submit={submit}
            onClick={fromSubmit}
            className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            text="Register"
          />
          <div className="flex justify-around">
            <p class="text-center mt-2 text-sm text-gray-500">
              You have an account?
              <Link
                href={"/user/login"}
                class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Login
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <Toaster />
    </Fragment>
  );
};

export default RegisterForm;
