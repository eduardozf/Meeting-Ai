"use client";
import Link from "next/link";
import PasswordChecklist from "react-password-checklist";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { XCircle, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/service/api";
import { Toaster } from "@/components/ui/sonner";
import { errorHandler } from "@/service/errorHandler";

const SignUpForm = () => {
  const [valid, setValid] = useState(false);
  const formSchema = z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(5),
      passwordConfirmation: z.string().min(5),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords don't match",
      path: ["passwordConfirmation"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (body: z.infer<typeof formSchema>) => {
    try {
      const response = await api.post("/session/signup", body);
      console.log(response.data);
      toast.success("User created!");
    } catch (error) {
      errorHandler(error, "Failed to create user");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <Card className="max-w-md z-50 shadow-2xl w-full">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
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
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel>Password Confirmation</FormLabel>
                      <FormControl>
                        <Input placeholder="*****" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <PasswordChecklist
                  rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "match",
                  ]}
                  minLength={5}
                  value={form.watch("password")}
                  valueAgain={form.watch("passwordConfirmation")}
                  onChange={(isValid) => {
                    setValid(isValid);
                  }}
                  iconComponents={{
                    InvalidIcon: (
                      <XCircle className="size-4 text-rose-500 mr-2" />
                    ),
                    ValidIcon: (
                      <CheckCircle className="size-4 text-green-500 mr-2" />
                    ),
                  }}
                  className="flex flex-col text-sm"
                />
                <Button type="submit" className="w-full" disabled={!valid}>
                  Create an account
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="absolute inset-0 h-full w-full bg-slate-100 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:18px_18px]"></div>
      </div>
      <Toaster />
    </>
  );
};

export default SignUpForm;
