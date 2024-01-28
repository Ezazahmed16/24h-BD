import PlainLayout from "@/components/Master/PlainLayout";
import HTMLReactParser from "html-react-parser";

async function getData() {
  let terms = (
    await (
      await fetch(`${process.env.HOST}/api/policy?type=terms`, {
        next: { revalidate: 1 },
      })
    ).json()
  )["data"];
  return { terms: terms };
}
const page = async () => {
  const { terms } = await getData();

  return (
    <PlainLayout>
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
          <div className="py-4">
            <div className="prose">{HTMLReactParser(terms[0]["long_des"])}</div>
          </div>
        </div>
      </div>
    </PlainLayout>
  );
};

export default page;
