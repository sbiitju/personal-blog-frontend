import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Title from "../ui/title";

const writings = [
  "বাংলাদেশের সবুজ ভূ-খণ্ডে ইনসাফ ভিত্তিক সমাজ প্রতিষ্ঠা করতে চাই",
  "বাংলাদেশের সবুজ ভূ-খণ্ডে ইনসাফ ভিত্তিক সমাজ প্রতিষ্ঠা করতে চাই",
  "বাংলাদেশের সবুজ ভূ-খণ্ডে ইনসাফ ভিত্তিক সমাজ প্রতিষ্ঠা করতে চাই",
  "বাংলাদেশের সবুজ ভূ-খণ্ডে ইনসাফ ভিত্তিক সমাজ প্রতিষ্ঠা করতে চাই",
  "বাংলাদেশের সবুজ ভূ-খণ্ডে ইনসাফ ভিত্তিক সমাজ প্রতিষ্ঠা করতে চাই",
  "বাংলাদেশের সবুজ ভূ-খণ্ডে ইনসাফ ভিত্তিক সমাজ প্রতিষ্ঠা করতে চাই",
];

const newses = [
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
];

export default function Activity() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-10">
      <div className="text-center">
        <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-12">
          কার্যক্রম
        </Title>
      </div>
      <div className="mt-10 grid lg:grid-cols-4 gap-14 lg:gap-5">
        <div className="order-2 lg:order-1 lg:col-span-1">
          <h3 className="text-xl md:text-2xl font-semibold">লেখালেখি</h3>
          <div className="space-y-2 my-8">
            {writings.map((written, index) => (
              <div key={index}>
                <Link
                  href={"/fsdfsf34343"}
                  className="hover:underline flex gap-2 items-start"
                >
                  <FaStar className="text-2xl md:text-xl text-[#C74646]" />
                  {written}
                </Link>
              </div>
            ))}
          </div>

          <Button
            variant="destructive"
            className="px-7 py-5 text-base font-semibold hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-300"
          >
            আরও পড়ুন
          </Button>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-3">
          <h3 className="text-xl md:text-2xl font-semibold">সংবাদ</h3>
          <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {newses.map((news) => (
              <div key={news.id}>
                <Card className="gap-0 py-0 bg-[#FFDBDB]">
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

          <Button
            variant="destructive"
            className="px-7 py-5 text-base font-semibold hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-300"
          >
            আরও সংবাদ
          </Button>
        </div>
      </div>
    </div>
  );
}
