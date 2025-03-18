import Image from "next/image";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import Title from "../ui/title";

const newses = [
  {
    id: "43256545",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "8567567",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "234253465",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "8678686",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "3456456546",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
  {
    id: "3243454676",
    image: "news.png",
    title:
      "ঝিনাইদহের জামায়াতের নারী নেত্রীদের উপর বিএনপির সন্ত্রাসীদের হামলার ন্যক্কারজনক ঘটনার তীব্র নিন্দা এবং প্রতিবাদ",
    date: "১৭ মার্চ ২০২৫",
  },
];

export default function Infos() {
  return (
    <div className="bg-[#FFDBDB] py-16">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-10">
        <div className="text-center">
          <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-12">
            তথ্যকোষ
          </Title>
        </div>
        <div className="my-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newses.map((news) => (
            <div key={news.id}>
              <Card className="gap-0 py-0 bg-white">
                <Image
                  className="w-full"
                  src={"/news.png"}
                  width={400}
                  height={200}
                  alt={news.title}
                />
                <div className="p-6 space-y-4">
                  <CardTitle className="font-semibold">
                    <Link href={"/534535dfg54"}>{news.title}</Link>
                  </CardTitle>
                  <CardDescription>{news.date}</CardDescription>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
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
