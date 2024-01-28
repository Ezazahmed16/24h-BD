"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

const AppNavBar = (props) => {
  const { categories } = props;
  const [searchKey, setSearchKey] = useState("0");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  let pathName = usePathname();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    setMobileMenuOpen(false);
  }, [pathName]);
  return (
    <nav className={`shadow-md bg-slate-50`}>
      <div className="container flex justify-between items-center text-white py-2">
        <Link href={"/"}>
          <Image
            src={"/images/logo.svg"}
            alt="logo"
            width={150}
            height={40}
            priority={true}
          />
        </Link>
        <div className="md:hidden">
          <button
            className="text-gray-900 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`md:flex gap-8 items-center hidden ${
            isMobileMenuOpen ? "md:hidden" : ""
          }`}
        >
          <li className="inline-block">
            <Link
              href={"/"}
              className="text-gray-900 hover:text-teal-600 font-medium text-sm"
            >
              Home
            </Link>
          </li>
          {categories.map((category, i) => (
            <li className="inline-block" key={i}>
              <Link
                href={`/category?id=${category.id}`}
                className={`text-gray-900 hover:text-teal-600 font-medium text-sm ${
                  pathName === `/category/${category.id}` ? "text-teal-600" : ""
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
          <li className="inline-block">
            <div className="flex items-center">
              <input
                type="text"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                placeholder="Search"
                className="px-4 py-2 text-black border-[1px] w-52 border-slate-900 rounded-l-lg focus:border-slate-900 "
              />
              <Link
                href={`/search?keyword=${searchKey}`}
                className="bg-slate-900 px-4 py-[13px] text-white rounded-r-lg focus:outline-none hover:bg-green-500 focus:border-transparent"
              >
                <RiSearchLine />
              </Link>
            </div>
          </li>
          <li className="inline-block">
            {login ? (
              <Link href={"/dashboard"}>
                <Image
                  src={"/images/profile.png"}
                  width={40}
                  height={40}
                  priority={true}
                  alt="user"
                />
              </Link>
            ) : (
              <Link
                href={"/user/login"}
                className="text-gray-900 hover:text-teal-600 font-medium text-base px-4 py-2 border-[1px] border-[#20B15A] hover:border-green-600 transition-all ease-in"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
      {/* Responsive menu for mobile */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } transition-all ease-in-out duration-300`}
      >
        <ul className="flex flex-col items-center py-8 space-y-4 mt-4 bg-[#D7F5DC] shadow">
          <li className="inline-block">
            <Link
              href={"/"}
              className="text-gray-900 hover:text-teal-600 font-medium text-sm"
            >
              Home
            </Link>
          </li>
          {categories.map((category, i) => (
            <li className="inline-block" key={i}>
              <Link
                href={`/category?id=${category.id}`}
                className={`text-gray-900 hover:text-teal-600 font-medium text-sm ${
                  pathName === `/category/${category.id}` ? "text-teal-600" : ""
                }`}
              >
                {category.name}
              </Link>
            </li>
          ))}
          <li className="inline-block">
            <div className="flex items-center mb-4 md:mb-0 lg:mb-0">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 border-[1px] border-[#20B15A] rounded-l-lg focus:outline-none "
              />
              <Link
                href={"#"}
                className="bg-[#20B15A] px-4 py-[13px] text-white rounded-r-lg focus:outline-none hover:bg-green-500 focus:border-transparent"
              >
                <RiSearchLine />
              </Link>
            </div>
          </li>
          <li className="inline-block">
            <Link
              href={"#"}
              className="text-gray-900 hover:text-teal-600 font-medium text-base px-8 p-3 border-[1px] border-[#20B15A] hover:border-green-600 transition-all ease-in"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppNavBar;
