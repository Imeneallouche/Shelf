"use client"; // Required for client-side components

import Algeria from "@react-map/algeria";
import { useRouter } from "next/navigation";
import React from "react";

const AlgeriaMap = () => {
  const router = useRouter();

  // Function to handle click on Wilaya
  const handleSelect = (wilaya: string) => {
    const formattedWilaya = wilaya.toLowerCase().replace(/\s+/g, "-");
    router.push(`/wilaya/`);
  };

  return (
    <div className="flex justify-center items-center">
      <Algeria
        type="select-single"
        size={600}
        hoverColor="#2C3E50"
        selectColor="#2C3E50"
        mapColor="#2980B9"
        strokeColor="#000"
        strokeWidth={1}
        hints={true}
        hintTextColor="white"
        hintBackgroundColor="black"
        onSelect={handleSelect}
      />
    </div>
  );
};
export default AlgeriaMap;
