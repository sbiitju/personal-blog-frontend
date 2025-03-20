/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Activity from "@/components/home/Activity";
import Banner from "@/components/home/Banner";
import Description from "@/components/home/Description";
import Infos from "@/components/home/Infos";
import { useGetUserByDomain } from "@/hooks/auth.hook";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [domain, setDomain] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);
  return (
    <div className="">
      <div className="space-y-14">
        <Banner />
        <Description domain={domain} />
        <Activity domain={domain} />
        <Infos domain={domain} />
      </div>
    </div>
  );
};

export default Home;
