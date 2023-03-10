import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button } from "antd";
import { Inter } from "next/font/google";

import ScheduleComponent from "@/components/schedule/Schedule";
import EventComponent from "@/components/event/Event";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Mystaff-Next</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row justify-evenly p-10 min-h-screen">
        <div className="w-2/3 p-10">
          <ScheduleComponent />
        </div>
        <div className="w-1/3 p-10">
          <EventComponent />
        </div>
      </div>
    </>
  );
}
