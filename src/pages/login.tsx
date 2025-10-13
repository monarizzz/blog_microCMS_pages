import React from "react";
import { useSession } from "next-auth/react";
import { NextPage } from "next";
import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import LoginPageMain from "@/features/login/LoginPageMain";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <Commonlayout session={session}>
        <p>Loading...</p>
      </Commonlayout>
    );
  }
  return (
    <>
      {session ? (
        <Commonlayout session={session}>
          <LoginPageMain session={session} />
        </Commonlayout>
      ) : (
        <LoginPageMain session={session} />
      )}
    </>
  );
};

export default Login;
