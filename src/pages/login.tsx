import React from "react";
import { useSession } from "next-auth/react";
import { NextPage } from "next";
import LoginPageMain from "@/features/login/components/LoginPageMain/LoginPageMain";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <LayoutMain session={session}>
        <p>Loading...</p>
      </LayoutMain>
    );
  }
  return (
    <>
      {session ? (
        <LayoutMain session={session}>
          <LoginPageMain session={session} />
        </LayoutMain>
      ) : (
        <LoginPageMain session={session} />
      )}
    </>
  );
};

export default Login;
