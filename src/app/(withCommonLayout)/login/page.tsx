"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {   ArrowRight } from 'lucide-react';

import Loader from "@/components/common/Loader";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useUser } from "@/context/user.provider";
import { useGetUserByDomain, useUserLogin } from "@/hooks/auth.hook";
import loginValidationSchema from "@/schema/login.schema";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

function Login() {
  const [domain, setDomain] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const { data: userData } = useGetUserByDomain(domain);
  const { setIsLoading: userLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams?.get("redirect");
  
  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    data,
  } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => { 
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data?.message);
    } else if (!isPending && isSuccess) {
      toast.success("User Logged successfully");
      if (userData?.data?.user?.role === "admin") {
        router.push("/admin/dashboard");
      } else if (userData?.data?.user?.role === "political") {
        router.push("/political/dashboard");
      } else if (userData?.data?.user?.role === "technical") {
        router.push("/technical/dashboard");
      } else {
        router.push(redirect || "/");
      }
    }
  }, [isPending, isSuccess, redirect, router, data, userData]);

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center  justify-center">
       
        <div className="flex w-full md:w-1/2 items-center justify-center p-4 md:p-8 bg-background">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Welcome Back!</h2>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <div className="bg-card rounded-xl shadow-lg p-6 border border-border/50">
              <PHForm
                resolver={zodResolver(loginValidationSchema)}
                onSubmit={onSubmit}
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <PHInput 
                      label="Email" 
                      name="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                     
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <PHInput 
                      label="Password" 
                      name="password" 
                      type="password"
                      placeholder="••••••••"
                     
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      className="text-sm font-medium text-primary hover:underline"
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    className="w-full font-semibold"
                    size="lg"
                    type="submit"
                  >
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </PHForm>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or for any issue contact with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
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
