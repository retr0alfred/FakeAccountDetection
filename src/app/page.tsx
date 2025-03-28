"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShootingStars } from "../../components/ui/shooting-stars";
import { StarsBackground } from "../../components/ui/stars-background";
import { MultiStepLoader as Loader } from "../../components/ui/multi-step-loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
  { text: "Checking username authenticity..." },
  { text: "Analyzing profile metadata..." },
  { text: "Evaluating activity patterns..." },
  { text: "Verifying content authenticity..." },
  { text: "Compiling results..." },
];

export default function Home() {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("Select Platform");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!username.trim()) return alert("Please enter a username");
    if (platform === "Select Platform") return alert("Please select a platform");

    setLoading(true);

    setTimeout(() => {
      router.push(`/report?username=${encodeURIComponent(username)}&platform=${encodeURIComponent(platform)}`);
    }, loadingStates.length * 2000); // Animation duration before redirecting
  };

  const getPlaceholder = () => {
    switch (platform) {
      case "Instagram":
        return "Enter Instagram user ID";
      case "Twitter (X)":
        return "Enter Twitter (X) username";
      case "Facebook":
        return "Enter Facebook profile ID";
      case "Reddit":
        return "Enter Reddit username";
      default:
        return "Enter your username";
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 overflow-hidden">
      <StarsBackground />
      <div className="absolute inset-0 pointer-events-none">
        <ShootingStars />
      </div>

      {/* Background Blur Effect (Synced with Loader) */}
      <motion.div
        initial={{ backdropFilter: "blur(0px)", opacity: 1 }}
        animate={loading ? { backdropFilter: "blur(20px)", opacity: 0.7 } : { backdropFilter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 z-[5] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-lg space-y-6">
        <motion.h1
          initial={{ y: 0, opacity: 1 }}
          animate={loading ? { y: -100, opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } } : {}}
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500 mb-6"
        >
          Fake Profile Detection
        </motion.h1>

        <AnimatePresence>
          {!loading && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, transition: { duration: 1.2, ease: "easeInOut" } }}
              className="flex flex-col items-center w-full max-w-lg space-y-4"
            >
              <div className="flex justify-center items-center space-x-3 w-full">
                <input
                  type="text"
                  placeholder={getPlaceholder()}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-[70%] h-10 px-3 py-2 border border-white rounded-xl bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 text-base font-light"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-[30%] h-10 px-3 py-2 border border-white rounded-xl bg-transparent text-white text-sm font-light focus:outline-none flex items-center justify-center hover:bg-white/10">
                    {platform}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[30%] bg-black border border-white">
                    {["Instagram", "Twitter (X)", "Facebook", "Reddit"].map((plat) => (
                      <DropdownMenuItem
                        key={plat}
                        className="text-white hover:bg-white/10"
                        onClick={() => setPlatform(plat)}
                      >
                        {plat}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Transparent Start Analysis Button */}
              <button
                onClick={handleSubmit}
                className="bg-transparent border border-white text-white text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center hover:bg-white/10"
                style={{
                  boxShadow: "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
                }}
              >
                Start Analysis
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Animation (Now Completely Synced) */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeInOut" } }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 1.2, ease: "easeInOut" } }}
            className="w-full flex justify-center"
          >
            <Loader
              loadingStates={loadingStates}
              loading={loading}
              duration={2000} // Ensuring stable width for all text
            />
          </motion.div>
        )}

        {loading && (
          <button
            className="bg-transparent border-white text-white text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center hover:bg-white/10"
            onClick={() => setLoading(false)}
          >
          </button>
        )}

      </div>
    </div>
  );
}
