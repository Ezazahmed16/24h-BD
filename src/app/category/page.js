import PlainLayout from "@/components/Master/PlainLayout";
import NewsList from "@/components/NewsList";
import PopularNewsList from "@/components/PopularNewsList";

const getData = async (id) => {
  const popular = (
    await (
      await fetch(`${process.env.HOST}/api/news/type?type=Popular`, {
        cache: "no-store",
      })
    ).json()
  )["data"];
  let latest = (
    await (
      await fetch(`${process.env.HOST}/api/news/category?catID=${id}`, {
        cache: "no-store",
      })
    ).json()
  )["data"];

  return { popular: popular, latest: latest };
};

const page = async (props) => {
  let id = props.searchParams["id"];
  const { popular, latest } = await getData(id);
  return (
    <PlainLayout>
      <div className="container">
        <div className="py-5">
          <h5 className="text-xl font-bold mb-2">LATEST</h5>
          <hr className="border-b border-gray-300 mb-4" />
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="md:w-3/4 mb-4 md:mb-0">
              <NewsList latest={latest} />
            </div>
            <div className="md:w-1/4">
              <PopularNewsList popular={popular} />
            </div>
          </div>
        </div>
      </div>
    </PlainLayout>
  );
};

export default page;
