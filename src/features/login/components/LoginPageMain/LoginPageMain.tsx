import { Session } from "@/infra/auth/google/session";
import { NextPage } from "next";
import styles from "./LoginPageMain.module.scss";
import { signIn, signOut } from "next-auth/react";

type Props = {
  session: Session | null;
};

const LoginPageMain: NextPage<Props> = ({ session }) => {
  return (
    <div className={styles.loginPageMainRoot}>
      {!session ? (
        <div className={styles.signin}>
          <div>
            <button className={styles.button} onClick={() => signIn("google")}>
              Googleでログイン
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.signOut}>
          <h1>{session.user && session.user.email}さん</h1>
          <button onClick={() => signOut()}>ログアウト</button>
        </div>
      )}
    </div>
  );
};

export default LoginPageMain;
