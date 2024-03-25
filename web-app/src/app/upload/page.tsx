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
import { File, Plus, Minus, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import Layout from "@/components/layout/index";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Upload = () => {
  const MAX_FILE_SIZE = 10_000_000_000;
  const ACCEPTED_IMAGE_TYPES = [
    "audio/mp3",
    "video/webm",
    "video/mp4",
    "video/wav",
    "video/mpeg",
    "video/x-matroska",
  ];

  const formSchema = z.object({
    file: z
      .any()
      .refine((file) => file, `Video is required.`)
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max video size is 10GB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .mp3, .webm, .mp4, .wav and mpeg formats are supported."
      ),
    title: z.string(),
    language: z.string(),
    people: z.number().min(1).max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      title: "",
      language: "",
      people: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  useEffect(() => {
    const file: any = form.watch("file");
    if (!file?.name) return;

    form.setValue("title", file?.name);
  }, [form.watch("file")]);

  const fileRef = form.register("file");

  return (
    <Layout tab="upload">
      <div className="p-8 space-y-8 flex items-center flex-col">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-4xl text-slate-800">Meeting AI</h1>
          <h3 className="text-slate-600 text-md">
            Smart meeting tool: Transcription, summaries, and instant AI
            responses.
          </h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/3 space-y-8 flex flex-col"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Dropzone file={field.value} />
                      <Input
                        {...fileRef}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(event) => {
                          field.onChange(event.target?.files?.[0] ?? undefined);
                        }}
                      />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex space-y-2 flex-col items-center">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
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
                  <FormItem className="w-full">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
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
                  <FormItem className="flex-1 w-full">
                    <FormLabel>People count</FormLabel>
                    <FormControl>
                      <div className="flex border-[1px] border-slate-200 rounded-xl px-2">
                        <Button className="p-0 m-0 border-none text-gray-500 bg-transparent hover:bg-transparent hover:text-gray-800">
                          <Minus className="w-7 h-7" />
                        </Button>
                        <Input
                          {...field}
                          type="number"
                          className="text-center p-0 m-0 align-middle border-none focus-visible:ring-offset-0 focus-visible:ring-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

            <Button type="submit" className="w-full self-end">
              Upload
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

type DropzoneTypes = {
  file?: {
    name: string;
    size: number;
    type?: string;
  };
};

const Dropzone = ({ file }: DropzoneTypes) => {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        {file?.size ? (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Video className="w-10 h-10 text-blue-500" />
              <p className="mb-2 text-sm text-blue-500 dark:text-blue-400">
                <span className="font-semibold">{file?.name}</span>
              </p>
            </div>
          </label>
        ) : (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <File className="w-8 h-8 text-slate-500"></File>
              <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                MVK, MP4, MPEG, WAV or WEBM (MAX. 10GB)
              </p>
            </div>
          </label>
        )}
      </div>
    </div>
  );
};

export default Upload;
