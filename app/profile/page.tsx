import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col mt-[60px] mx-4">
      <p className="text-xl mb-4">Hello, {session.user.name}</p>
      <div>
        <p className="text-xl font-bold">Your Orders:</p>
        <div className=""></div>
      </div>
    </div>
  );
}

export default Profile;
