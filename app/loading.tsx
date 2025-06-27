"use client";
import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex content-center justify-center items-center">
      <TailSpin color="#000000" height={80} width={80} />
    </div>
  );
}
