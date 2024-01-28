import Link from "next/link";
import {
  FaArrowRight,
  FaFacebookF,
  FaLinkedin,
  FaMobile,
  FaSearchLocation,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
const AppFooterBar = (props) => {
  const { socialLinks, categories } = props;
  return (
    <>
      <div className="w-full bg-black pt-20">
        <div className="flex flex-col max-w-screen-xl mx-auto px-4 lg:flex-row justify-between gap-4">
          <div>
            <span className="text-orange-600 text-4xl font-bold">About</span>{" "}
            <span className="text-white text-4xl font-bold">Us</span>
            <div className="lg:w-80 pt-4 text-white text-base font-normal ">
              {socialLinks[0]?.about}
            </div>
            <div className="mt-4 ">
              <div className="flex gap-3">
                <Link
                  href={socialLinks[0]["facebook"]}
                  target="_blank"
                  className="bg-green-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-600 transition-all ease-in duration-500"
                >
                  <FaFacebookF className="text-base text-white" />
                </Link>
                <Link
                  href={socialLinks[0]["twitter"]}
                  target="_blank"
                  className="bg-green-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-600 transition-all ease-in duration-500"
                >
                  <FaTwitter className="text-base text-white" />
                </Link>
                <Link
                  href={socialLinks[0]["linkedin"]}
                  target="_blank"
                  className="bg-green-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-600 transition-all ease-in duration-500"
                >
                  <FaLinkedin className="text-base text-white" />
                </Link>
                <Link
                  href={socialLinks[0]["youtube"]}
                  target="_blank"
                  className="bg-green-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-teal-600 transition-all ease-in duration-500"
                >
                  <FaYoutube className="text-base text-white" />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white mb-4 font-semibold text-xl">
              Quick Links
            </h3>
            <ul className="text-white text-base font-normal ">
              {categories?.map((category, i) => {
                if (i < 4) {
                  return (
                    <li
                      key={i}
                      className="py-1 flex items-center gap-1 hover:text-teal-600 transition-all ease-in duration-500"
                    >
                      <FaArrowRight />{" "}
                      <Link
                        href={`/category?id=${category["id"]}`}
                        className="hover:text-teal-600 transition-all ease-in duration-500"
                      >
                        {category["name"]}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-white mb-4 font-semibold text-xl">
              Important Links
            </h3>
            <ul className="text-white text-base font-normal ">
              <li className="py-1 flex items-center gap-1 hover:text-teal-600 transition-all ease-in duration-500">
                <FaArrowRight />{" "}
                <Link
                  href={"/privacy"}
                  className="hover:text-teal-600 transition-all ease-in duration-500"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="py-1 flex items-center gap-1 hover:text-teal-600 transition-all ease-in duration-500">
                <FaArrowRight />{" "}
                <Link
                  href={"/terms"}
                  className="hover:text-teal-600 transition-all ease-in duration-500"
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white mb-4 font-semibold text-xl">Address</h3>
            <div className="text-white text-base font-medium ">
              <ul>
                <li className="py-1 flex items-center gap-1">
                  <FaSearchLocation /> {socialLinks[0]?.address}
                </li>
                <li className="py-1 flex items-center gap-1">
                  <FaMobile /> 1234567890
                </li>
                <li className="py-1 flex items-center gap-1">
                  <FaUser /> {socialLinks[0]?.about}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center text-white py-10">
          <span className="text-base">
            © News Portal {new Date().getFullYear().toString()}. All rights
            reserved.
          </span>
        </div>
        {/* <a className="fixed bottom-4 right-4">
          <ScrollToTop />
        </a> */}
      </div>
    </>
  );
};

export default AppFooterBar;
