import moment from "moment";
import Link from "next/link";
import {
  FaClock,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

const AppTopNav = (props) => {
  const { socialLinks } = props;
  return (
    <div className="bg-slate-900">
      <div className="container flex justify-between items-center text-white py-2">
        <div className="text-sm">
          <span className="flex items-center">
            <FaClock className="mr-1" />
            {moment().format("LL")} {","} {moment().format("LT")}
          </span>
        </div>
        <div className="flex gap-3 justify-around items-center">
          <Link href={socialLinks[0]["facebook"]} target="_blank">
            <FaFacebookSquare className="text-xl hover:text-blue-600" />
          </Link>
          <Link href={socialLinks[0]["youtube"]} target="_blank">
            <FaYoutubeSquare className="text-xl hover:text-red-500" />
          </Link>
          <Link href={socialLinks[0]["twitter"]} target="_blank">
            <FaTwitterSquare className="text-xl hover:text-blue-400" />
          </Link>
          <Link href={socialLinks[0]["linkedin"]} target="_blank">
            <FaLinkedin className="text-xl hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppTopNav;
