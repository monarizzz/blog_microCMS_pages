"use client";

import { Session } from "@/infra/auth/google/session";
import { signIn, signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

// TODO:スタイルを作成する
const LoginPageMain = ({ session }: Props) => {
  return (
    <div className="flex h-svh items-center justify-center">
      {!session ? (
        <div className="rounded-full bg-slate-200 p-3">
          <div>
            <button className="" onClick={() => signIn("google")}>
              Googleでログイン
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <h1>{session.user && session.user.email}さん</h1>
          <button onClick={() => signOut()}>ログアウト</button>
        </div>
      )}
    </div>
  );
};

export default LoginPageMain;
