import CommentList from "@/components/CommentList";
import PlainLayout from "@/components/Master/PlainLayout";
import NewsDetails from "@/components/NewsDetails";
import PopularNewsList from "@/components/PopularNewsList";

const getData = async (id) => {
  const details = (
    await (
      await fetch(`${process.env.HOST}/api/news/details?id=${id}`, {
        cache: "no-store",
      })
    ).json()
  )["data"];
  const popular = (
    await (
      await fetch(`${process.env.HOST}/api/news/type?type=Popular`, {
        cache: "no-store",
      })
    ).json()
  )["data"];
  const comments = (
    await (
      await fetch(`${process.env.HOST}/api/comments/news?postID=${id}`, {
        next: {
          revalidate: 1,
        },
      })
    ).json()
  )["data"];

  return { details: details, popular: popular, comments: comments };
};

const page = async (props) => {
  let id = props.searchParams["id"];
  const { details, popular, comments } = await getData(id);
  return (
    <PlainLayout>
      <div className="container py-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="md:w-3/4 mb-4 md:mb-0">
            <NewsDetails details={details} />
            <CommentList postID={id} comments={comments} />
          </div>
          <div className="md:w-1/4">
            <PopularNewsList popular={popular} />
          </div>
        </div>
      </div>
    </PlainLayout>
  );
};

export default page;
