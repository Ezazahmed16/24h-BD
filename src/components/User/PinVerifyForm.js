"use client";
import { ErrorToast, IsEmpty, SuccessToast } from "@/Utility/FromHandler";
import SubmitButton from "@/Utility/SubmitButton";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Toaster } from "react-hot-toast";

const PinVerifyForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: sessionStorage.getItem("email"),
    otp: "",
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
    if (IsEmpty(data.otp)) {
      ErrorToast("OTP Is Required");
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

      let res = await fetch("/api/user/recover/verifyOTP", options);
      let ResJson = await res.json();
      setSubmit(false);
      if (ResJson["status"] === "success") {
        SuccessToast("Verification Success");
        sessionStorage.setItem("otp", data.otp);
        router.push("/user/resetPassword");
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
            Verify Your OTP Code Here !
          </h1>
          <div className="mb-6">
            <label htmlFor="OtpCode" className="block text-gray-800 font-bold">
              OtpCode: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="OtpCode"
              onChange={(e) => inputChange("otp", e.target.value)}
              placeholder="Enter Your 6 digit Otp Code"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
            <small>6 digit Otp Code</small>
          </div>
          <SubmitButton
            submit={submit}
            onClick={fromSubmit}
            className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            text="otpVerify"
          />
        </div>
      </div>
      <Toaster />
    </Fragment>
  );
};

export default PinVerifyForm;
