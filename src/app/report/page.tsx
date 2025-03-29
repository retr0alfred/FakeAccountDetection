"use client";

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { ShootingStars } from "../../../components/ui/shooting-stars";
import { StarsBackground } from "../../../components/ui/stars-background";

const FakeAccountDashboard = () => {
  const featuresData = [
    { category: "Profile Indicators", features: [
      { name: "Profile Picture", value: 21.04 },
      { name: "Private", value: 21.04 },
      { name: "Description Length", value: 0.69 },
    ]},
    { category: "Username Patterns", features: [
      { name: "Fullname Words", value: 15.46 },
      { name: "Username", value: 94.87 },
      { name: "Length of Full Name", value: 21.04 },
      { name: "Length of Username", value: 0.69 },
    ]},
    { category: "Social Metrics", features: [
      { name: "Followers", value: 0.30 },
      { name: "Follows", value: 28.33 },
      { name: "Posts", value: 15.46 },
    ]},
  ];

  const radarData = [
    { subject: "Fullname Words", A: 15.46 },
    { subject: "Username", A: 94.87 },
    { subject: "Length Fullname", A: 21.04 },
    { subject: "Length Username", A: 0.69 },
  ];

  const barData = featuresData.flatMap(category =>
    category.features.map(feature => ({
      name: feature.name,
      value: feature.value,
      category: category.category,
    }))
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative p-6 space-y-6 bg-black min-h-screen flex flex-col items-center text-white font-sans">
      <StarsBackground />
      <div className="absolute inset-0 pointer-events-none">
        <ShootingStars />
      </div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } }}
        className="relative text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500 text-center"
      >
        Fake Account Detection Dashboard
      </motion.h1>

      <div className="relative text-center text-lg tracking-wide font-medium mt-[-20px] opacity-70">
  Fake Account Score: <span className="font-bold text-red-400">74.00%</span>
</div>


      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        <Card className="relative border border-gray-500 bg-transparent shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-white font-medium">Feature Contribution Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <BarChart width={500} height={300} data={barData}>
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                interval={0} 
                stroke="white" 
                style={{ fontSize: "14px", fontWeight: "500" }} 
              />
              <YAxis stroke="white" style={{ fontSize: "14px", fontWeight: "500" }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "14px", fontWeight: "500", color: "white" }} />
              <Bar dataKey="value" fill="#8884d8">
                {barData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </CardContent>
        </Card>

        <Card className="relative border border-gray-500 bg-transparent shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-white font-medium">Feature Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart width={500} height={300}>
              <Pie
                data={featuresData}
                dataKey={(entry) => entry.features.length}
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {featuresData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "14px", fontWeight: "500", color: "white" }} />
            </PieChart>
          </CardContent>
        </Card>
      </div>

      <Card className="relative border border-gray-500 bg-transparent shadow-none w-full max-w-6xl">
        <CardHeader className="text-center">
          <CardTitle className="text-white font-medium">Username Patterns Intensity Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <RadarChart 
            cx="50%" 
            cy="50%" 
            outerRadius="80%" 
            width={600} 
            height={400} 
            data={radarData}
          >
            <PolarGrid stroke="white" />
            <PolarAngleAxis dataKey="subject" stroke="white" style={{ fontSize: "14px", fontWeight: "500" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="white" style={{ fontSize: "14px", fontWeight: "500" }} />
            <Radar 
              name="Username Metrics" 
              dataKey="A" 
              stroke="#8884d8" 
              fill="#8884d8" 
              fillOpacity={0.6} 
            />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "14px", fontWeight: "500", color: "white" }} />
          </RadarChart>
        </CardContent>
      </Card>

      <button
        onClick={handlePrint}
        className="relative px-6 py-2 mt-6 text-white border border-gray-500 bg-transparent rounded-lg 
        font-medium transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg"
      >
        Generate Report 🖨️
      </button>
    </div>
  );
};

export default FakeAccountDashboard;
