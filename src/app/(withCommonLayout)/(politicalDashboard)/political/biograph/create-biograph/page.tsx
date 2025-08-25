"use client";

import { useRef, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

import Loader from "@/components/common/Loader";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHTextarea from "@/components/form/PHTextArea";
import QuillEditor, { RichTextEditorHandle } from "@/components/form/QuillEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { useCreateBiograph } from "@/hooks/biograph.hook";
import { bioGraphValidationSchema } from "@/schema/bio.schema";

function CreateBiograph() {
  const editorRef = useRef<RichTextEditorHandle>(null);
  const { setIsLoading: userLoading, user } = useUser();
  const router = useRouter();

  const {
    mutate: handleBiographCreate,
    isPending,
    isSuccess,
    data,
  } = useCreateBiograph();

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const editorContent = editorRef.current?.getContent() || "";

    const finalData = {
      ...formData,
      description: editorContent, // 👈 add RichTextEditor content as description
    };


    handleBiographCreate(finalData);
    userLoading(true);
  };

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data?.message);
    } else if (!isPending && isSuccess) {
      toast.success("জীবন বৃত্তান্ত সফলভাবে তৈরি হয়েছে!");
      router.push("/political/biograph");
    }
  }, [isPending, isSuccess, router, data]);

  return (
    <>
      {isPending && <Loader />}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bengali-bold text-gray-900">জীবন বৃত্তান্ত তৈরি</h1>
            <p className="text-gray-600 font-bengali-normal mt-2">আপনার জীবন বৃত্তান্তের বিস্তারিত তথ্য যোগ করুন</p>
          </div>
          <Link href="/political/biograph">
            <Button variant="outline" className="font-bengali-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ফিরে যান
            </Button>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
          <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl font-bengali-bold text-gray-900">নতুন জীবন বৃত্তান্ত</CardTitle>
            <CardDescription className="font-bengali-normal text-gray-600">
              আপনার ব্যক্তিগত ও পেশাগত জীবনের বিস্তারিত বিবরণ লিখুন
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            <PHForm
              resolver={zodResolver(bioGraphValidationSchema)}
              onSubmit={onSubmit}
              defaultValues={{
                domain: user?.domain,   
              }}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PHInput
                    disabled={true}
                    label="ডোমেইন"
                    name="domain"
                    placeholder="domain.com"
                    className="font-bengali-normal"
                  />
                  
                  <div className="md:col-span-2">
                    <PHTextarea 
                      label="সংক্ষিপ্ত বিবরণ *" 
                      name="shortDescription"
                    />
                  </div>
                </div>

                {/* Rich Text Editor for Long Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bengali-semibold text-gray-900">বিস্তারিত বিবরণ</h3>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <QuillEditor ref={editorRef} />
                  </div>
                  
                  <div className="text-sm text-gray-600 font-bengali-normal">
                    <p>📝 আপনি নিম্নলিখিত বিষয়গুলি অন্তর্ভুক্ত করতে পারেন:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>ব্যক্তিগত জীবন ও পরিবার</li>
                      <li>শিক্ষা ও যোগ্যতা</li>
                      <li>পেশাগত অভিজ্ঞতা</li>
                      <li>সামাজিক ও রাজনৈতিক অবদান</li>
                      <li>পুরস্কার ও স্বীকৃতি</li>
                      <li>ভবিষ্যতের লক্ষ্য ও পরিকল্পনা</li>
                    </ul>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-6 border-t border-gray-200">
                  <Button 
                    className="w-full h-14 text-lg font-bengali-semibold bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white hover:from-[#d6000a] hover:to-[#7a3236] transition-all duration-300 shadow-lg hover:shadow-xl" 
                    size="lg" 
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        তৈরি হচ্ছে...
                      </>
                    ) : (
                      <>
                        জীবন বৃত্তান্ত তৈরি করুন
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </PHForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function CreateBiographPage() {
  return <CreateBiograph />;
}
