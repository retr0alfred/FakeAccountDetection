"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ShootingStars } from "../../components/ui/shooting-stars"
import { StarsBackground } from "../../components/ui/stars-background"
import { MultiStepLoader as Loader } from "../../components/ui/multi-step-loader"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import alitheiaLogo from "../../components/ui/alitheia.png"

const loadingStates = [
  { text: "Checking username authenticity..." },
  { text: "Analyzing profile metadata..." },
  { text: "Evaluating activity patterns..." },
  { text: "Verifying content authenticity..." },
  { text: "Compiling results..." },
]

export default function Home() {
  const [username, setUsername] = useState("")
  const [platform, setPlatform] = useState("Select Platform")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const containerRef = useRef(null)

  const handleSubmit = () => {
    if (!username.trim()) return alert("Please enter a username")
    if (platform === "Select Platform") return alert("Please select a platform")

    setLoading(true)

    setTimeout(() => {
      router.push(`/report?username=${encodeURIComponent(username)}&platform=${encodeURIComponent(platform)}`)
    }, loadingStates.length * 2000)
  }

  const getPlaceholder = () => {
    switch (platform) {
      case "Instagram":
        return "Enter Instagram user ID"
      case "Twitter (X)":
        return "Enter Twitter (X) username"
      case "Facebook":
        return "Enter Facebook profile ID"
      case "Reddit":
        return "Enter Reddit username"
      default:
        return "Enter your username"
    }
  }

  return (
    <>
      <Head>
        <title>Alitheia - Find Fake Profiles</title>
      </Head>

      <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 overflow-hidden">
        <StarsBackground />
        <div className="absolute inset-0 pointer-events-none">
          <ShootingStars />
        </div>

        <motion.div
          initial={{ backdropFilter: "blur(0px)", opacity: 1 }}
          animate={
            loading ? { backdropFilter: "blur(20px)", opacity: 0.7 } : { backdropFilter: "blur(0px)", opacity: 1 }
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-[5] pointer-events-none"
        />

        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={loading ? { y: -40, opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } } : {}}
          className="absolute top-1 left-1 z-10"
        >
          <Image src={alitheiaLogo || "/placeholder.svg"} alt="Alitheia Logo" width={100} height={100} />
        </motion.div>

        <div ref={containerRef} className="relative z-10 flex flex-col items-center text-center w-full max-w-lg">
          <motion.h1
            initial={{ opacity: 1, scale: 1, y: 25 }}
            animate={loading ? { opacity: 0, scale: 0.9, transition: { duration: 1.2, ease: "easeInOut" } } : {}}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500 md-0"
          >
            Fake Profile Detection
          </motion.h1>

          <div className="w-full relative flex items-center justify-center" style={{ minHeight: "180px" }}>
            <AnimatePresence mode="wait">
              {!loading ? (
                <motion.div
                  key="input-form"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: -50,
                    transition: {
                      duration: 0.7,
                      ease: [0.4, 0.0, 0.2, 1],
                    },
                  }}
                  className="absolute flex flex-col items-center w-full max-w-lg space-y-4"
                >
                  <div className="flex justify-center items-center space-x-3 w-full">
                    <input
                      type="text"
                      placeholder={getPlaceholder()}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-[70%] h-10 px-3 py-2 border border-white rounded-xl bg-transparent text-white 
                              placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 
                              text-sm md:text-base font-medium transition-all duration-300"
                    />

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="w-[30%] h-10 px-3 py-2 border border-white rounded-xl bg-transparent 
                                text-white text-sm md:text-base font-medium focus:outline-none 
                                flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                      >
                        {platform}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[30%] bg-black border border-white">
                        {["Instagram", "Twitter (X)", "Facebook", "Reddit"].map((plat) => (
                          <DropdownMenuItem
                            key={plat}
                            className="text-white text-sm md:text-base font-medium hover:bg-white/10 transition-all duration-300"
                            onClick={() => setPlatform(plat)}
                          >
                            {plat}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="bg-transparent border border-white text-white text-sm md:text-base font-medium 
                            transition duration-300 h-10 rounded-lg px-8 flex items-center justify-center 
                            hover:bg-white/10"
                    style={{
                      boxShadow: "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
                    }}
                  >
                    Start Analysis
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="loader-container"
                  className="absolute flex flex-col items-center justify-center w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 10,
                    transition: {
                      duration: 0.8,
                      ease: [0.4, 0.0, 0.2, 1],
                      delay: 0.4, 
                    },
                  }}
                >
                  <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

