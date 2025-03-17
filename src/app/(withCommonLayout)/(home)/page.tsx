import React from "react";

const page = () => {
  return <div className="mt-32">page</div>;
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