import { ErrorToast } from "@/Utility/FromHandler";
import AppFooterBar from "./AppFooterBar";
import AppNavBar from "./AppNavBar";
import AppTopNav from "./AppTopNav";

const getData = async () => {
  try {
    const socialLinks = (
      await (await fetch(`${process.env.HOST}/api/sociaals`)).json()
    )["data"];
    const categories = (
      await (
        await fetch(`${process.env.HOST}/api/categories`, {
          cache: "no-store",
        })
      ).json()
    )["data"];
    console.log(socialLinks)
    return { socialLinks: socialLinks, categories: categories };
  } catch (error) {
    ErrorToast(error.message);
  }
};


const PlainLayout = async (props) => {
  const data = await getData();
  return (
    <>
      <AppTopNav socialLinks={data?.socialLinks} />
      <AppNavBar categories={data?.categories} />
      {props.children}
      <AppFooterBar
        socialLinks={data?.socialLinks}
        categories={data?.categories}
      />
    </>
  );
};

export default PlainLayout;
