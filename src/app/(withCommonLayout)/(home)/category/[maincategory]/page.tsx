"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Title from "@/components/ui/title";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const data = [
  {
    id: "2342",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "6456",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "2344",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "23424",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "64563",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "234445",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "53453535",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "675675353",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "2345646",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "53453535gdfg",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "675675353asdf",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "2345646gfdhd",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
];

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [page, setPage] = useState(0);

  // create pagination buttons based on data
  const createButton = Math.ceil(data.length / 12);
  const buttons = [...new Array(createButton), 0, 0, 0, 0];

  //change page by clicking those arrow buttons
  function changePageByArrow(direction: string) {
    if (direction === "forward") {
      if (buttons.length - 1 > page) {
        setPage(page + 1);
      }
    } else {
      if (page > 0) {
        setPage(page - 1);
      }
    }
  }

  return (
    <div>
      <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-10">
        লেখালেখি
      </Title>
      <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((news) => (
          <div key={news.id}>
            <Card className="gap-0 py-0">
              <Image
                className="w-full"
                src={"/news.png"}
                width={400}
                height={200}
                alt={news.title}
              />
              <div className="p-6 space-y-4">
                <CardTitle className="font-semibold">
                  <Link href={"/fdgdfg435354fgd"}>{news.title}</Link>
                </CardTitle>
                <CardDescription>{news.date}</CardDescription>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* pagination section */}
      <div className="flex justify-center flex-wrap items-center gap-2">
        {/* backward button */}
        <Button
          onClick={() => changePageByArrow("backward")}
          variant={"outline"}
          className="hover:cursor-pointer"
        >
          <IoIosArrowBack />
        </Button>

        {/* pagination buttons */}
        {buttons.map((button, index) => (
          <Button
            onClick={() => setPage(index)}
            key={index + "paginationbtn"}
            variant={page === index ? "destructive" : "outline"}
            className="hover:cursor-pointer"
          >
            {index + 1}
          </Button>
        ))}

        {/* forward button */}
        <Button
          onClick={() => changePageByArrow("forward")}
          variant={"outline"}
          className="hover:cursor-pointer"
        >
          <IoIosArrowForward />
        </Button>
      </div>
    </div>
  );
}
