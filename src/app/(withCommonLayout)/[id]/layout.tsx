import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

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
];

const user = "গোলাম মোস্তফা কামাল";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-26 max-w-screen-xl mx-auto px-4 lg:px-6 xl:px-10">
      <div className="grid md:grid-cols-5 gap-12 md:gap-6">
        <div className="md:col-span-3">{children}</div>

        <div className="md:col-span-2">
          <h2 className="text-xl md:text-2xl font-semibold mb-8">সাম্প্রতিক</h2>
          <div className="space-y-6 sticky top-20">
            {newses.map((news) => (
              <div key={news.id}>
                <Card className="gap-0 py-0 bg-white">
                  <Image
                    className="w-full"
                    src={"/news.png"}
                    width={400}
                    height={300}
                    alt={news.title}
                  />
                  <div className="p-6 space-y-4">
                    <CardTitle className="font-semibold">
                      <Link href={"/"}>{news.title}</Link>
                    </CardTitle>
                    <CardDescription>{news.date}</CardDescription>
                  </div>
                </Card>
              </div>
            ))}

            {/* social links here */}
            <div className="flex flex-col gap-4">
              <Link
                href="https://www.facebook.com/"
                className="bg-brand-primary-light p-2 flex items-center gap-3"
              >
                <FaFacebookF className="text-2xl" />
                <span>{user}</span>
              </Link>

              <Link
                href="https://www.instagram.com/"
                className="bg-brand-primary-light p-2 flex items-center gap-3"
              >
                <FaInstagram className="text-2xl" />
                <span>{user}</span>
              </Link>

              <Link
                href="https://www.youtube.com/"
                className="bg-brand-primary-light p-2 flex items-center gap-3"
              >
                <FaYoutube className="text-2xl" />
                <span>{user}</span>
              </Link>
              <Link
                href="http://www.linkedin.com/"
                className="bg-brand-primary-light p-2 flex items-center gap-3"
              >
                <FaLinkedin className="text-2xl" />
                <span>{user}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
