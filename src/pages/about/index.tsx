import Header from "@/commons/layout/components/Header/Header";
import AboutPageMain from "@/features/about/components/AboutPageMain/AboutPageMain";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const AboutPage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Header session={session} />
      <AboutPageMain />
    </>
  );
};

export default AboutPage;
