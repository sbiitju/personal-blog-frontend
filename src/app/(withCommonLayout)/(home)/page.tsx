/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Activity from "@/components/home/Activity";
import Banner from "@/components/home/Banner";
import Description from "@/components/home/Description";
import Infos from "@/components/home/Infos";
import { useGetUserByDomain } from "@/hooks/auth.hook";
import { useDomain } from "@/hooks/useDomain";
import React from "react";

const Home = () => {
  const domain = useDomain();
  return (
    <div className="">
      <div className="space-y-1">
        <Banner />
        <Description domain={domain} />
        <Activity domain={domain} />
        <Infos domain={domain} />
      </div>
    </div>
  );
};

export default Home;
