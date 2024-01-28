import PlainLayout from "@/components/Master/PlainLayout";
import HTMLReactParser from "html-react-parser";

async function getData() {
  let privacy = (
    await (
      await fetch(`${process.env.HOST}/api/policy?type=privacy`, {
        next: { revalidate: 1 },
      })
    ).json()
  )["data"];
  return { privacy: privacy };
}
const page = async () => {
  const { privacy } = await getData();

  return (
    <PlainLayout>
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <div className="py-4">
            <div className="prose">
              {HTMLReactParser(privacy[0]["long_des"])}
            </div>
          </div>
        </div>
      </div>
    </PlainLayout>
  );
};

export default page;
