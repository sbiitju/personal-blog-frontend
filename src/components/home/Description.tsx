import Link from "next/link";
import { Button } from "../ui/button";
import Title from "../ui/title";
import { useGetBiographByDomain } from "@/hooks/biograph.hook";

interface DescriptionProps {
  domain: string;
}

export default function Description({ domain }: DescriptionProps) {
  const { data: bioData, isLoading, isError } = useGetBiographByDomain(domain);

  const title = "জীবন বৃত্তান্ত";
  const shortDescription = "পারিবারিক ও শিক্ষা জীবন";
  const description = bioData?.data?.shortDescription; 
  return (
    <section className="bg-[#FFDBDB]">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-0 py-12 flex justify-center items-center">
        <div className="text-center max-w-3xl">
          <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-12 py-2 rounded-md">
            {title}
          </Title>

          {isLoading ? (
            <p className="text-gray-600 mt-6">লোড হচ্ছে...</p>
          ) : isError ? (
            <p className="text-red-600 mt-6">ডাটা আনতে সমস্যা হয়েছে।</p>
          ) : (
            <>
              <h3 className="text-2xl my-4 font-medium text-gray-800">
                {shortDescription}
              </h3>
              <p className="text-justify md:text-center text-gray-700 leading-relaxed">
                {description}
              </p>
            </>
          )}

          <div className="flex justify-center mt-2">
            <Link href="/biograph">
              <Button
                variant="destructive"
                className="px-6 py-3 text-lg font-semibold hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-300 rounded-md"
              >
                জীবনী পড়ুন
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
