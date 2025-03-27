"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShootingStars } from "../../components/ui/shooting-stars";
import { StarsBackground } from "../../components/ui/stars-background";
import { ButtonsCard } from "../../components/ui/tailwindcss-buttons"; 

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!username.trim()) return alert("Please enter a username");
    router.push(`/verify?username=${encodeURIComponent(username)}`);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <StarsBackground />
      
      <div className="absolute inset-0 pointer-events-none">
        <ShootingStars />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-lg space-y-6">
        
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500 mb-8">
          Fake Profile Detection
        </h1>
        
        <div className="flex items-center space-x-3 w-full max-w-lg">
        <input
  type="text"
  placeholder="Enter your username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-[70%] px-3 py-2 border border-neutral-200 dark:border-white/[0.1] rounded-xl bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 text-base font-light"
/>


  <ButtonsCard 
    onClick={handleSubmit} 
    className="flex-[1] h-10 px-4 text-sm font-semibold flex items-center justify-center"
  >
    Next
  </ButtonsCard>
</div>


      </div>
    </div>
  );
}
