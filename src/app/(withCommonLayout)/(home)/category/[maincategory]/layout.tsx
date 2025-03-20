import RightSection from "@/components/common/rightSection";

 

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-26 max-w-screen-xl mx-auto px-4 mb-14 lg:px-6 xl:px-10">
      <div className="grid md:grid-cols-6 lg:grid-cols-7 gap-12 md:gap-6">
        <div className="md:col-span-4 lg:col-span-5">{children}</div>

        <div className="md:col-span-2 lg:col-span-2">
          <div className="space-y-6 sticky top-20">
            <RightSection/>
          </div>
        </div>
      </div>
    </div>
  );
}
