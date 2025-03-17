import Banner from "@/components/home/Banner";
import Description from "@/components/home/Description";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div className="space-y-20">
        <Banner />
        <Description />
      </div>
    </div>
  );
};

export default page;

/**
 * 
 * "use client";  

import { useEffect, useState } from "react";

const Page = () => {
  const [domain, setDomain] = useState<string>("default.com");  

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Client-side hostname:", window.location.hostname); // Debugging
      setDomain(window.location.hostname);
    }
  }, []);

  return (
    <div>
      <h1 className="mt-32 text-blue">Welcome to {domain}</h1>
    </div>
  );
};

export default Page;

 * 
 * 
 */
