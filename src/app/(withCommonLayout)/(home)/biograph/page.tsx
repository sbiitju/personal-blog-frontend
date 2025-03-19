"use client";
import { useGetBiographByDomain } from "@/hooks/biograph.hook";
import React, { useEffect, useState } from "react";

const Biograph = () => {
  const [domain, setDomain] = useState<string>("");

  const { data: bioData } = useGetBiographByDomain(domain);
  const bio = bioData?.data?.description;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">জীবনী</h1>
      {bio ? (
        <div
          className="text-gray-800 leading-relaxed text-justify"
          dangerouslySetInnerHTML={{ __html: bio }}
        />
      ) : (
        <p className="text-center text-gray-500">লোড হচ্ছে...</p>
      )}
    </div>
  );
};

export default Biograph;
