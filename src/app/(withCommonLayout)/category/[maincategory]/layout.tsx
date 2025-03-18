import RightSection from "@/components/common/rightSection";

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

const user = {
  name: "গোলাম মোস্তফা কামাল",
  social: {
    facebook: "facebook.com",
    instagram: "facebook.com",
    youtube: "facebook.com",
    linkedin: "facebook.com",
  },
};

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-26 max-w-screen-xl mx-auto px-4 mb-14 lg:px-6 xl:px-10">
      <div className="grid md:grid-cols-6 lg:grid-cols-7 gap-12 md:gap-6">
        <div className="md:col-span-4 lg:col-span-5">{children}</div>

        <div className="md:col-span-2 lg:col-span-2">
          <div className="space-y-6 sticky top-20">
            <RightSection blogs={newses} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
