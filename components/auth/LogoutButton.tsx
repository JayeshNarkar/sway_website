"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

function LoginButton() {
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      Logout
    </Button>
  );
}

export default LoginButton;
