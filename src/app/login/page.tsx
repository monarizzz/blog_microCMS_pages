import { getServerSession } from "next-auth";
import LoginPageMain from "@/features/login/components/LoginPageMain/LoginPageMain";
import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { authOptions } from "@/infra/auth/authOptions";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  return (
    <LayoutMain session={session}>
      <LoginPageMain session={session} />
    </LayoutMain>
  );
}
