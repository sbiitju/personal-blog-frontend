import Link from "next/link";
import { Button } from "../ui/button";

const curriculaVitae = {
  title: "জীবন বৃত্তান্ত",
  subtitle: "পারিবারিক ও শিক্ষা জীবন",
  description:
    "গোলাম মোস্তফা কামাল ১৯৫৯ সালের ৮ জানুয়ারী খুলনা জেলার ফুলতলা উপজেলার শিরোমণি গ্রামের এক  সম্ভ্রান্ত মুসলিম পরিবারে জন্মগ্রহন করেন। পারিবারিক জীবনে তার পিতা-মাতা, ৫ ভাই, ৫ বোন, স্ত্রী, ২ কন্যা ও ২ পুত্রসন্তান রয়েছে। শিরোমণি হাইস্কুল, বিএল বিশ্ববিদ্যালয় কলেজ ও আযম খান বাণিজ্য বিশ্ববিদ্যালয় কলেজ থেকে যথাক্রমে এসএসসি, এইচএসসি, বিকম অর্নাসসহ (হিসাব বিজ্ঞান) এম কম পাস করেন।",
};

export default function Description() {
  return (
    <div className="bg-[#FFDBDB]">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-0 py-16 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{curriculaVitae.title}</h2>
          <h3 className="text-sx mt-4 mb-8">{curriculaVitae.subtitle}</h3>
          <p className="xl:w-5xl text-justify md:text-center">
            {curriculaVitae.description}
          </p>
          <div className="flex justify-center mt-8">
            <Link href={"/"}>
              <Button
                variant="destructive"
                className="px-4 py-3 text-base font-semibold hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-300"
              >
                জীবনি পড়ুন
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
