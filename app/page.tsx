"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [passcode, setPasscode] = useState("");

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex items-center justify-center bg-background dark:bg-black overflow-hidden">
      <svg
        className="animate-spotlight pointer-events-none absolute z-[1] h-full w-full opacity-0 right-[-50%] hidden md:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3787 2842"
        fill="none"
      >
        <g filter="url(#filter)">
          <ellipse
            cx="1924.71"
            cy="273.501"
            rx="1924.71"
            ry="273.501"
            transform="matrix(0.822377 -0.568943 0.568943 0.822377 155.12 2291.09)"
            fill="white"
            fillOpacity="0.21"
          ></ellipse>
        </g>
        <defs>
          <filter
            id="filter"
            x="100.860352"
            y="0.938989"
            width="3785.16"
            height="2840.26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feBlend mode="normal" in="SourceGraphic" result="shape"></feBlend>
            <feGaussianBlur
              stdDeviation="200"
              result="effect1_foregroundBlur_1065_8"
            ></feGaussianBlur>
          </filter>
        </defs>
      </svg>

      <div className="relative z-10 overflow-hidden rounded-lg shadow-xl max-w-4xl mx-auto">
        <div className="absolute inset-0">
          <Image
            src="/images/crowd-background.png"
            alt="Crowd background"
            fill
            className="object-cover brightness-[0.6] dark:brightness-[0.5]"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        <div className="relative p-8 my-8 md:p-12 text-white">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              List, Vote and Categorize
            </h1>
            <p className="text-md md:text-lg opacity-90 max-w-2xl">
              Vote for the comments you like and move them to the top of the
              list. You can also create your own if you want.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/topic/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto dark:bg-blue-700 dark:hover:bg-blue-800">
                Create new
              </Button>
            </Link>

            <div className="flex w-full max-w-sm items-center">
              <Input
                type="text"
                placeholder="Enter a passcode"
                className="rounded-r-none border-r-0 bg-white text-black h-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <Link href={passcode ? `/topic/${passcode}` : "#"}>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white rounded-l-none h-10 dark:bg-green-700 dark:hover:bg-green-800"
                  disabled={!passcode}
                >
                  Join
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
