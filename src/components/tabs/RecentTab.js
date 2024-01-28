import Image from "next/image";
import Link from "next/link";

const RecentTab = (props) => {
  const { latest } = props;
  return (
    <div className="h-96 overflow-y-scroll">
      {latest?.map((item, i) => (
        <Link
          key={i}
          href={`/news?id=${item["id"]}`}
          className="col-span-1 py-1 px-0"
        >
          <div className=" border-b-2 mb-2 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 hover:text-blue-500 ease-in-out transition-all duration-300">
              <div className="col-span-1 md:col-span-1 lg:col-span-1">
                <Image
                  className="w-full"
                  src={item["img1"]}
                  width={1920}
                  height={1080}
                  priority={true}
                  alt={item["title"]}
                />
              </div>
              <div className="col-span-1 md:col-span-1 lg:col-span-1 p-3">
                <h6>{item.title}</h6>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentTab;
