import Link from "next/link";

const user = {
  address: "৫০৫, এলিফ্যান্ট রোড, বড় মগবাজারঢাকা-১২১৭, বাংলাদেশ",
  phone: "+৮৮ ০২ ৯৩৩১৫৮১",
  email: "golammostofakamal@gmail.com",
};

export default function Footer() {
  return (
    <div className="bg-[#6B6B6B] mt-24 py-10 text-white">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          <div className="flex-1">
            <h3>যোগাযোগ</h3>

            <div className="mt-5 space-y-2">
              <p>{user.address}</p>
              <p>ফোন : {user.phone}</p>
              <p>ইমেইল : {user.email}</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end flex-wrap">
            <Link
              href={"/"}
              className="hover:text-gray-200 transition-all duration-300"
            >
              বাংলাদেশ
            </Link>
            <span className="px-2">/</span>
            <Link
              href={"/"}
              className="hover:text-gray-200 transition-all duration-300"
            >
              জামায়াতে ইসলামী
            </Link>
            <span className="px-2">/</span>
            <Link
              href={"/"}
              className="hover:text-gray-200 transition-all duration-300"
            >
              লাইব্রেরী
            </Link>
            <span className="px-2">/</span>
            <Link
              href={"/"}
              className="hover:text-gray-200 transition-all duration-300"
            >
              গুরুত্বপূর্ণ লিঙ্কসমূহ
            </Link>
            <span className="px-2">/</span>
            <Link
              href={"/"}
              className="hover:text-gray-200 transition-all duration-300"
            >
              যোগাযোগ
            </Link>
          </div>
        </div>
        <div className="my-6 w-full h-[2px] bg-white"></div>
        <p className="text-center">
          © ২০২০ সর্বস্বত্ত গোলাম মোস্তফা কামাল কতৃক সংরক্ষিত
        </p>
      </div>
    </div>
  );
}
