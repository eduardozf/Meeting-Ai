"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Video, Plus, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import Header from "@/components/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const Upload = () => {
  const form = useForm();

  function onSubmit(data: any) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  useEffect(() => {
    console.log(form.watch("upload"));
  }, []);

  return (
    <>
      <Header />
      <div className="p-8 space-y-16">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-4xl">Meeting AI</h1>
          <h3 className="text-gray-600 text-md">
            Smart meeting tool: Transcription, summaries, and instant AI
            responses.
          </h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 flex flex-col"
          >
            <FormField
              control={form.control}
              name="upload"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Video className="w-6 h-6 text-gray-400"></Video>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              MVK, MP4, MPEG, WAV or WEBM (MAX. 10GB)
                            </p>
                          </div>
                        </label>
                        <Input
                          id="dropzone-file"
                          type={"file"}
                          {...field}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex space-x-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Video Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="portuguese">Portuguese</SelectItem>
                          <SelectItem value="korean">Korean</SelectItem>
                          <SelectItem value="dutch">Dutch</SelectItem>
                          <SelectItem value="italian">Italian</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="thai">Thai</SelectItem>
                          <SelectItem value="russian">Russian</SelectItem>
                          <SelectItem value="polish">Polish</SelectItem>
                          <SelectItem value="indonesian">Indonesian</SelectItem>
                          <SelectItem value="mandarin-tw">
                            Mandarin (TW)
                          </SelectItem>
                          <SelectItem value="swedish">Swedish</SelectItem>
                          <SelectItem value="czech">Czech</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="romanian">Romanian</SelectItem>
                          <SelectItem value="cantonese-cn">
                            Cantonese (CN)
                          </SelectItem>
                          <SelectItem value="turkish">Turkish</SelectItem>
                          <SelectItem value="mandarin-cn">
                            Mandarin (CN)
                          </SelectItem>
                          <SelectItem value="catalan">Catalan</SelectItem>
                          <SelectItem value="hungarian">Hungarian</SelectItem>
                          <SelectItem value="ukrainian">Ukrainian</SelectItem>
                          <SelectItem value="greek">Greek</SelectItem>
                          <SelectItem value="bulgarian">Bulgarian</SelectItem>
                          <SelectItem value="arabic">Arabic</SelectItem>
                          <SelectItem value="serbian">Serbian</SelectItem>
                          <SelectItem value="macedonian">Macedonian</SelectItem>
                          <SelectItem value="cantonese (hk)">
                            Cantonese (HK)
                          </SelectItem>
                          <SelectItem value="latvian">Latvian</SelectItem>
                          <SelectItem value="slovenian">Slovenian</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="galician">Galician</SelectItem>
                          <SelectItem value="danish">Danish</SelectItem>
                          <SelectItem value="urdu">Urdu</SelectItem>
                          <SelectItem value="slovak">Slovak</SelectItem>
                          <SelectItem value="hebrew">Hebrew</SelectItem>
                          <SelectItem value="finnish">Finnish</SelectItem>
                          <SelectItem value="azerbaijani">
                            Azerbaijani
                          </SelectItem>
                          <SelectItem value="lithuanian">Lithuanian</SelectItem>
                          <SelectItem value="estonian">Estonian</SelectItem>
                          <SelectItem value="nynorsk">Nynorsk</SelectItem>
                          <SelectItem value="welsh">Welsh</SelectItem>
                          <SelectItem value="punjabi">Punjabi</SelectItem>
                          <SelectItem value="afrikaans">Afrikaans</SelectItem>
                          <SelectItem value="persian">Persian</SelectItem>
                          <SelectItem value="basque">Basque</SelectItem>
                          <SelectItem value="vietnamese">Vietnamese</SelectItem>
                          <SelectItem value="bengali">Bengali</SelectItem>
                          <SelectItem value="nepali">Nepali</SelectItem>
                          <SelectItem value="marathi">Marathi</SelectItem>
                          <SelectItem value="belarusian">Belarusian</SelectItem>
                          <SelectItem value="kazakh">Kazakh</SelectItem>
                          <SelectItem value="armenian">Armenian</SelectItem>
                          <SelectItem value="swahili">Swahili</SelectItem>
                          <SelectItem value="tamil">Tamil</SelectItem>
                          <SelectItem value="albanian">Albanian</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Language spoken in the meeting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="people"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>People count</FormLabel>
                    <FormControl>
                      <div className="flex border-[1px] border-slate-200 rounded-xl px-2">
                        <Button className="p-0 m-0 border-none text-gray-500 bg-transparent hover:bg-transparent hover:text-gray-800">
                          <Minus className="w-7 h-7" />
                        </Button>
                        <Input
                          type={"number"}
                          min={1}
                          max={20}
                          defaultValue={1}
                          className="text-center p-0 m-0 align-middle border-none focus-visible:ring-offset-0 focus-visible:ring-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...field}
                        />
                        <Button className="p-0 m-0 border-none text-gray-500 bg-transparent hover:bg-transparent hover:text-gray-800">
                          <Plus className="w-7 h-7" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Amount of people on this meeting
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="px-16 self-end">
              Upload
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Upload;
