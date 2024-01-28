"use client";
import { ErrorToast, IsEmpty, SuccessToast } from "@/Utility/FromHandler";
import SubmitButton from "@/Utility/SubmitButton";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Toaster } from "react-hot-toast";

const SetPasswordFrom = () => {
  const router = useRouter();
  const [data, setData] = useState({
    password: "",
    c_password: "",
    email: sessionStorage.getItem("email"),
    otp: sessionStorage.getItem("otp"),
  });
  const [submit, setSubmit] = useState(false);
  const inputChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const fromSubmit = async (e) => {
    e.preventDefault();
    if (IsEmpty(data.password)) {
      ErrorToast("password Is Required");
    } else if (IsEmpty(data.c_password)) {
      ErrorToast("Confirm password Is Required");
    } else if (data.c_password !== data.password) {
      ErrorToast("password and Confirm password Should be Same");
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
      const res = await fetch("/api/user/recover/resetPassword", options);
      const ResJson = await res.json();
      setSubmit(false);
      if (ResJson["status"] === "success") {
        SuccessToast("Password Reset Success");
        sessionStorage.clear(); // for  email @ opt remove from otp
        router.push("/user/login");
      } else {
        ErrorToast("request Fail");
        setSubmit(false);
      }
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="max-w-2xl mx-auto py-6 px-8 mt-5 mb-5 bg-white rounded shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-6">
            Reset Your Password Here !
          </h1>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-bold">
              Password: <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => inputChange("password", e.target.value)}
              placeholder="Enter Your New Password"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="c_password"
              className="block text-gray-800 font-bold"
            >
              Confirm Password: <span className="text-red-500">*</span>
            </label>
            <input
              type="c_password"
              id="c_password"
              onChange={(e) => inputChange("c_password", e.target.value)}
              placeholder="Confirm Your Password"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>
          <SubmitButton
            submit={submit}
            onClick={fromSubmit}
            className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            text="Reset Password"
          />
        </div>
      </div>
      <Toaster />
    </Fragment>
  );
};

export default SetPasswordFrom;
