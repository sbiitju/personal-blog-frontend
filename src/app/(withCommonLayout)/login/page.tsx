"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

import Loader from "@/components/common/Loader";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useUser } from "@/context/user.provider";
import {  useUserLogin } from "@/hooks/auth.hook"; 
import loginValidationSchema from "@/schema/login.schema";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// Client-side cookie helper
const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const { setIsLoading: userLoading, setUser } = useUser();
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
    if (data && !data.success) {
      toast.error(data?.message);
      userLoading(false);
    } else if (!isPending && isSuccess && data?.success) {
      toast.success("User Logged successfully");

      // Save access token to cookie
      if (data?.data?.accessToken) {
        setCookie("accessToken", data.data.accessToken, rememberMe ? 30 : 7);
      }

      // Decode token to get user role and info
      const decodeToken = async () => {
        try {
          const { jwtDecode } = await import("jwt-decode");
          type DecodedToken = {
            id?: string;
            email?: string;
            role?: string;
            name?: string;
            profilePicture?: string;
            domain?: string;
            iat?: number;
            exp?: number;
          };
          const decodedToken = jwtDecode<DecodedToken>(data.data.accessToken);
          
          // Update user context
          setUser({
            id: decodedToken?.id || "",
            email: decodedToken?.email || "",
            role: decodedToken?.role || "",
            name: decodedToken?.name || "",
            img: decodedToken?.profilePicture || "",
            domain: decodedToken?.domain || "",
          });

          // Redirect based on role
          if (decodedToken?.role === "admin") {
            router.push("/admin/dashboard");
          } else if (decodedToken?.role === "political") {
            router.push("/political/dashboard");
          } else if (decodedToken?.role === "technical") {
            router.push("/technical/dashboard");
          } else {
            router.push(redirect || "/");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          router.push(redirect || "/");
        }
      };

      decodeToken();
      userLoading(false);
    }
  }, [isPending, isSuccess, redirect, router, data, userLoading, setUser, rememberMe]);

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center  justify-center">
        <div className="flex w-full md:w-1/2 items-center justify-center p-4 md:p-8 bg-background">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome Back!
              </h2>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
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
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
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
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
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
