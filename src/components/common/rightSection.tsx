import Link from "next/link";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function RightSection({
  blogs,
  user,
}: {
  blogs: Array<{ id: string; title: string; date: string }>;
  user: {
    name: string;
    social: {
      facebook: string;
      instagram: string;
      youtube: string;
      linkedin: string;
    };
  };
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-8">সাম্প্রতিক</h2>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Card className="gap-0 py-0 bg-white">
            <Image
              className="w-full"
              src={"/news.png"}
              width={400}
              height={200}
              alt={blog.title}
            />
            <div className="p-6 space-y-4">
              <CardTitle className="font-semibold">
                <Link href={"/"}>{blog.title}</Link>
              </CardTitle>
              <CardDescription>{blog.date}</CardDescription>
            </div>
          </Card>
        </div>
      ))}

      {/* social links here */}
      <div className="flex flex-col gap-4">
        <Link
          href={user.social.facebook}
          className="bg-brand-primary-light p-2 flex items-center gap-3"
        >
          <FaFacebookF className="text-2xl" />
          <span>{user.name}</span>
        </Link>

        <Link
          href={user.social.instagram}
          className="bg-brand-primary-light p-2 flex items-center gap-3"
        >
          <FaInstagram className="text-2xl" />
          <span>{user.name}</span>
        </Link>

        <Link
          href={user.social.youtube}
          className="bg-brand-primary-light p-2 flex items-center gap-3"
        >
          <FaYoutube className="text-2xl" />
          <span>{user.name}</span>
        </Link>
        <Link
          href={user.social.linkedin}
          className="bg-brand-primary-light p-2 flex items-center gap-3"
        >
          <FaLinkedin className="text-2xl" />
          <span>{user.name}</span>
        </Link>
      </div>
    </div>
  );
}
