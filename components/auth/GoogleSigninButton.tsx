"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

function GoogleSigninButton() {
  return (
    <Button
      variant={"outline"}
      onClick={() => signIn("google")}
      className="text-black"
    >
      <Image src="/Google.png" alt="Google Logo" width={20} height={20} />
      Login With Google
    </Button>
  );
}

export default GoogleSigninButton;
