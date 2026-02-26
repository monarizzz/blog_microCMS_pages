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
        <button
          className="rounded-2xl border border-slate-700 bg-slate-600 p-3 font-bold text-white"
          onClick={() => signIn("google")}
        >
          Googleでログイン
        </button>
      ) : (
        <div>
          <h1>{session.user && session.user.email}さん</h1>
          <button onClick={() => signOut()}>ログアウト</button>
        </div>
      )}
    </div>
  );
};

export default LoginPageMain;
