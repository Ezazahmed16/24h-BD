"use client";

import { ErrorToast, IsEmail, SuccessToast } from "@/Utility/FromHandler";
import SubmitButton from "@/Utility/SubmitButton";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const Subscribe = () => {
  const [data, setData] = useState({ email: "" });
  const [submit, setSubmit] = useState(false);
  const inputChange = (name, value) => {
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const fromSubmit = async () => {
    if (IsEmail(data.email)) {
      ErrorToast("Valid Email Address Required");
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
      let res = await fetch("/api/subscriber", options);
      let resJson = await res.json();
      setSubmit(false);
      setData({ email: "" });
      if (resJson["status"] === "success") {
        SuccessToast("Request Success");
      } else {
        ErrorToast("Request Failed");
      }
    }
  };

  return (
    <div className="grid grid-cols-1">
      <div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <p className="text-gray-500 text-sm">
            Subscribe to our newsletter to get the latest news in your inbox.
          </p>
          <Toaster />
          <div className="mt-4">
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={(e) => {
                inputChange("email", e.target.value);
              }}
              className="px-4 py-2 rounded border text-gray-800 border-gray-200 bg-white"
              placeholder="Email Address"
            />
            <SubmitButton
              onClick={fromSubmit}
              submit={submit}
              className="px-4 py-2 mt-4 w-full rounded bg-gray-800 text-white font-bold p-4 uppercase border-gray-800 hover:bg-gray-700 hover:text-white transition duration-500 ease-in-out"
              text="Subscribe"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
