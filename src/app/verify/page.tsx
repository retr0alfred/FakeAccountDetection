"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/report"); // Navigate after 10 seconds
    }, 10000);

    return () => clearTimeout(timer); // Cleanup in case component unmounts
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Verification Page</h1>
      <p className="text-lg">Redirecting to image display in 10 seconds...</p>
    </div>
  );
}
