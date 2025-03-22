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
import { useAdminRegistration } from "@/hooks/auth.hook";

import { Button } from "@/components/ui/button";
import { adminValidationSchema } from "@/schema/user.schema";

function CreateAdmin() {
  const { setIsLoading: userLoading } = useUser();
  const router = useRouter();

  const {
    mutate: handleAdminCreation,
    isPending,
    isSuccess,
    data,
  } = useAdminRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    console.log(formData);
    handleAdminCreation(formData);
    userLoading(true);
  };

  useEffect(() => {
    if (data && !data.success) {
      console.log(data);
      toast.error(data?.message);
    } else if (!isPending && isSuccess) {
      toast.success("Admin created successfully");
      router.push("/admin/user");
    }
  }, [isPending, isSuccess, router, data]);

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full   space-y-8 flex flex-col items-center text-center">
          <div className="space-y-2 w-full">
            <h2 className="text-3xl font-bold tracking-tight">Create Admin</h2>
            <p className="text-muted-foreground">
              Fill in the details to create a new admin account.
            </p>
          </div>

          <div className="w-full rounded-xl shadow-lg p-6 border border-border/50 bg-white">
            <PHForm
              resolver={zodResolver(adminValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <PHInput
                    label="Name"
                    name="admin.name"
                    placeholder="John Doe"
                  />
                  <PHInput
                    label="Email"
                    name="admin.email"
                    type="email"
                    placeholder="admin@example.com"
                  />
                </div>
                <PHInput
                  label="Phone"
                  name="admin.phone"
                  type="text"
                  placeholder="+1234567890"
                />
                <PHInput
                  label="Domain"
                  name="admin.domain"
                  type="text"
                  placeholder="https://adminsite.com"
                />
                <PHInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />

                <Button
                  className="w-full cursor-pointer font-semibold"
                  size="lg"
                  type="submit"
                >
                  Create Admin
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

export default function CreateAdminPage() {
  return (
    <Suspense fallback={<Loader />}>
      <CreateAdmin />
    </Suspense>
  );
}
