"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const UserDropDown = () => {
  const router = useRouter();
  const logout = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/logout");
    if (res.ok) {
      router.push("/user/login");
    } else {
      router.push("/user/login");
    }
  };
  return (
    <div className="bg-white px-4 py-2 p-2 shadow-lg rounded">
      <ul className="flex gap-8 items-center">
        <li className="inline-block">
          <Link
            href={"/dashboard"}
            className="text-gray-900 hover:text-teal-600 font-medium text-sm"
          >
            Dashboard
          </Link>
        </li>
        <li className="inline-block">
          <Link
            href={"/profile"}
            className="text-gray-900 hover:text-teal-600 font-medium text-sm"
          >
            Profile
          </Link>
        </li>
        <li className="inline-block">
          <Link
            href={"#"}
            onClick={logout}
            className="text-gray-900 hover:text-teal-600 font-medium text-sm"
          >
            LogOut
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDropDown;
