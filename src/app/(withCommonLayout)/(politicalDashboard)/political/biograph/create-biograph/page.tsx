"use client";

import { useEffect, Suspense } from "react";
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

function CreateBiograph() {
  const { setIsLoading: userLoading } = useUser();
  const router = useRouter();

  const {
    mutate: handleBiographCreate,
    isPending,
    isSuccess,
    data,
  } = useCreateBiograph();

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    console.log(formData);
    handleBiographCreate(formData);
    userLoading(true);
  };

  useEffect(() => {
    if (data && !data.success) {
      console.log(data);
      toast.error(data?.message);
    } else if (!isPending && isSuccess) {
      router.push("/political/biograph");
    }
  }, [isPending, isSuccess, router, data]);

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full   space-y-8 flex flex-col items-center text-center">
          <div className="space-y-2 w-full">
            <h2 className="text-3xl font-bold tracking-tight">
              Create Biograph
            </h2>
            <p className="text-muted-foreground">
              Fill in the details to Biograph.
            </p>
          </div>

          <div className="w-full md:w-[500px] lg:w-[900px] rounded-xl shadow-lg p-6 border border-border/50 bg-white">
            <PHForm
              resolver={zodResolver(bioGraphValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="space-y-5">
                <div className=" ">
                  <PHInput
                    label="Domain"
                    name="domain"
                    placeholder="domain.com"
                  />
                </div>
                <PHTextarea label="Short Description" name="shortDescription" />
                <PHTextarea label="Long Description" name="description" />

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
