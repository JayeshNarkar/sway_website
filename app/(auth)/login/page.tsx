import authOptions from "@/lib/authOptions";
import GoogleSigninButton from "@/components/auth/GoogleSigninButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="w-full flex flex-1 justify-center content-center items-center">
      <GoogleSigninButton />
    </div>
  );
}
