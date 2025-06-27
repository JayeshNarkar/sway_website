import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import DefaultUser from "@/public/default_user.png";
import Link from "next/link";

async function UserStatus() {
  const session = await getServerSession(authOptions);
  if (session)
    return (
      <Link href={"/profile"}>
        <Image
          src={session?.user?.image as string}
          alt="User Image"
          className={`w-12 h-12 mx-2 rounded-full`}
          width={48}
          height={48}
        />
      </Link>
    );
  return (
    <Link href={"/login"}>
      <Image
        src={DefaultUser}
        alt="Default User Image"
        width={48}
        height={48}
        className="w-12 h-12 mx-2 border border-gray-400 rounded-full"
      />
    </Link>
  );
}

export default UserStatus;
