"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Auth } from "@/service/auth";

const LoginPage = () => {
  const router = useRouter();
  const ValidateLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const form = useForm<z.infer<typeof ValidateLoginSchema>>({
    resolver: zodResolver(ValidateLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (body: z.infer<typeof ValidateLoginSchema>) => {
    try {
      await Auth.getAuth().login(body);

      // TODO mover definição do cookie para dentro do Auth.login()
      // TODO colocar COOKIES dentro de um serviço
      document.cookie = "isAuthenticated=true; path=/";

      toast.success("Login successful!");
      router.push("/upload");
    } catch (error) {
      toast.error("Login failed :(");
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <Card className="mx-auto max-w-sm z-50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="*****" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="absolute h-screen w-screen">
          <div className="absolute inset-0 h-full w-full z-0 bg-slate-100 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:18px_18px]"></div>
          <div className="absolute inset-0 h-full w-full z-10 pointer-events-none bg-fade"></div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default LoginPage;
