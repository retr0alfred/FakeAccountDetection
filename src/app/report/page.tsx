/*"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "../../../components/ui/layout-grid";

export default function ReportPage() {
    return (
        <div className="h-screen py-20 w-full">
          <LayoutGrid cards={cards} />
        </div>
      );
  }
  

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House in the woods
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House above the clouds
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Greens all over
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Rivers are serene
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];*/
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StarsBackground } from "../../../components/ui/stars-background";
import { ShootingStars } from "../../../components/ui/shooting-stars";

// Define TypeScript types for API response
interface FeatureContributions {
  "#followers": number;
  "#follows": number;
  "#posts": number;
  "description length": number;
  "external URL": number;
  "fullname words": number;
  "name==username": number;
  "nums/length fullname": number;
  "nums/length username": number;
  "private": number;
  "profile pic": number;
}

interface ApiResponse {
  fake_score: number;
  feature_contributions: FeatureContributions;
  username: string;
}

export default function Verify() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/predict?username=${encodeURIComponent(username)}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result: ApiResponse = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to fetch account details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <StarsBackground />
      <ShootingStars />
      
      <div className="relative z-10 text-center">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Verifying {username}...
        </h1>

        {loading && <p className="text-gray-400">Loading analysis...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {data && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-yellow-300">
              Fake Score: {data.fake_score.toFixed(2)}%
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Breakdown of feature contributions:
            </p>
            <ul className="mt-2 text-gray-400 text-sm">
              {Object.entries(data.feature_contributions).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span>{key.replace(/_/g, " ")}</span>
                  <span className="text-yellow-300">{value.toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}