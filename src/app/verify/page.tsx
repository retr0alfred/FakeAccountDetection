"use client";

import { useSearchParams } from "next/navigation";
import { StarsBackground } from "../../../components/ui/stars-background"; // Ensure correct path
import { ShootingStars } from "../../../components/ui/shooting-stars"; // Ensure correct path

export default function Verify() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <StarsBackground />
      <ShootingStars />
      <div className="relative z-10 text-center">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Verifying {username}...
        </h1>
      </div>
    </div>
  );
}
