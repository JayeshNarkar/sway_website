"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function LoginNavButton() {
  const router = useRouter();
  return (
    <Button variant={"outline"} onClick={() => router.push("/login")}>
      Login Now!
    </Button>
  );
}

export default LoginNavButton;
