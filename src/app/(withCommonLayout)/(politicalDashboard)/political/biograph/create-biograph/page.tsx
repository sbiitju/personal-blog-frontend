"use client";
import dynamic from 'next/dynamic';
import { useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import Loader from "@/components/common/Loader";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useUser } from "@/context/user.provider";

import { Button } from "@/components/ui/button";
import PHTextarea from "@/components/form/PHTextArea";
import { useCreateBiograph } from "@/hooks/biograph.hook";
import { bioGraphValidationSchema } from "@/schema/bio.schema";

const RichTextEditor = dynamic(() => import('../../../../../../components/form/RichTextEditor'), { 
  ssr: false 
});

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string;
  setContent: (content: string) => void;
};

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

    console.log(finalData);
    handleBiographCreate(finalData);
    userLoading(true);
  };

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data?.message);
    } else if (!isPending && isSuccess) {
      router.push("/political/biograph");
    }
  }, [isPending, isSuccess, router, data]);

  

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full space-y-8 flex flex-col items-center text-center">
          <div className="space-y-2 w-full">
            <h2 className="text-3xl font-bold tracking-tight">Create Biograph</h2>
            <p className="text-muted-foreground">Fill in the details to Biograph.</p>
          </div>

          <div className="w-full md:w-[500px] lg:w-[900px] rounded-xl shadow-lg p-6 border border-border/50 bg-white">
            <PHForm
              resolver={zodResolver(bioGraphValidationSchema)}
              onSubmit={onSubmit}
              defaultValues={{
                 
                domain: user?.domain,   
              }}
            >
              <div className="space-y-5">
                <PHInput
                 disabled={true}
                
                  label="Domain"
                  name="domain"
                  placeholder="domain.com"
                />
                <PHTextarea label="Short Description" name="shortDescription" />

                {/* Replace PHTextarea with RichTextEditor */}
                <div>
                  <h1 className="text-left font-semibold mb-2 text-lg">Long Description</h1>
                  <RichTextEditor ref={editorRef} />
                </div>

                <Button
                  className="w-full cursor-pointer font-semibold"
                  size="lg"
                  type="submit"
                >
                  Create Biograph
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </PHForm>
          </div>
        </div>
      </div>
    </>
  );
}


export default function CreateBiographPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateBiograph />
    </Suspense>
  );
}
