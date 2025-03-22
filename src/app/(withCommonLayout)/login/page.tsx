"use client";
 
 
import Loader from "@/components/common/Loader";
import PHForm from "@/components/form/PHForm";
import { useUser } from "@/context/user.provider";
import { useUserLogin } from "@/hooks/auth.hook";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/schema/login.schema";
import PHInput from "@/components/form/PHInput";
import { Button } from "@/components/ui/button";

function Login() {
  const { setIsLoading: userLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams?.get("redirect"); // Ensure safe access to searchParams
  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    data,
  } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data?.message);
    } else if (!isPending && isSuccess) {
      toast.success("User Logged successfully");
      console.log(data)
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router, data]);

  return (
    <>
      {isPending && <Loader />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Premium Haat</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="md:w-[45%]">
          <PHForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <PHInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <PHInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-red-300 font-semibold text-white"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </PHForm>
          <div className="flex justify-between items-center py-2">
            <Link
              className="text-sm text-blue-500 hover:underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            Don&lsquo;t have an account?{" "}
            <Link className="text-blue-500 hover:underline" href="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Login />
    </Suspense>
  );
}
