"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Wand, Music2, Video, AudioLines, SquarePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Tag from "@/components/tag/index";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/layout/index";
import { errorHandler } from "@/service/errorHandler";
import { toast } from "sonner";
import Header from "@/components/header";

const MeetDetail = () => {
  const [tags, setTags] = useState<string[]>(["Meet"]);

  const formSchema = z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      tags: "",
    },
  });

  const onSubmit = async (body: z.infer<typeof formSchema>) => {
    try {
      // const router = useRouter();
      // const response = await api.put(`/meet/${router.query.id}`, body);

      // console.log(response.data);
      toast.success("Meet was edited!");
    } catch (error) {
      errorHandler(error, "Failed to edit");
    }
  };

  const handleAddTag = (tagName: string) => {
    // Validate if tag is to short
    if (tagName?.length <= 2) {
      form.setError("tags", {
        message: "Tag is too short",
        type: "validate",
      });
      return;
    }

    // Validate if tag already added
    if (tags.includes(tagName)) {
      form.setError("tags", {
        message: "Tag already added",
        type: "validate",
      });
      return;
    }

    // Add tag and reset input
    setTags((old) => [...old, tagName]);
    form.resetField("tags");
  };

  const handleRemoveTag = (tagName: string) => {
    setTags((old) => old?.filter((tag) => tag !== tagName));
  };

  return (
    <>
      <Header currentTab="detail"></Header>

      <Layout tab="detail">
        <div className="flex h-full flex-col items-center justify-between px-24 pt-6">
          <div className="w-full flex space-x-4">
            <div className="w-2/3 flex flex-col space-y-2">
              <div className="w-full border-2 border-neutral-100 p-8 rounded-md space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    Edit Details
                  </h1>
                  <span className="text-sm text-slate-500">
                    Update meet details
                  </span>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
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
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A short meeting summary ..."
                              className="resize-none"
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <Button
                            type="button"
                            className="space-x-2 bg-slate-300 text-slate-900 w-full hover:bg-slate-900 hover:text-white "
                          >
                            <Wand className="h-4 w-4" />
                            <span>Generate summary with AI</span>
                          </Button>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <div className="flex space-x-4 items-start">
                              <div className="flex space-x-2 overflow-x-auto  items-center">
                                {tags?.map((tag) => (
                                  <Tag
                                    name={tag}
                                    key={tag}
                                    handleRemove={handleRemoveTag}
                                  />
                                ))}
                              </div>
                              <div className="flex items-center">
                                <Input
                                  {...field}
                                  className="w-24"
                                  placeholder="Add Tag"
                                  onBlur={() =>
                                    handleAddTag(form.watch("tags") as any)
                                  }
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            We recommend including the names of people or
                            subjects
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Save
                    </Button>
                  </form>
                </Form>
              </div>
              <MeetOptions />
            </div>

            <VideoInformation />
          </div>
        </div>
      </Layout>
    </>
  );
};

const VideoInformation = () => {
  return (
    <div className="w-1/3 border-2 border-neutral-100 rounded-md space-y-2 flex flex-col">
      <div className="py-3 border-b-2 border-neutral-100">
        <span className="p-2 font-bold ">Video Preview</span>
      </div>
      <video src="video.mkv" controls></video>
      <div className="py-3 border-y-2 border-neutral-100">
        <span className="p-2 font-bold ">Transcription</span>
      </div>
      <p className=" px-2 text-sm max-h-48 overflow-y-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed
        aliquet massa, id posuere odio. Proin quis tortor ante. Vivamus mattis
        quis velit vitae fringilla. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Vestibulum
        condimentum porttitor orci non maximus. Curabitur rutrum massa eu
        posuere mattis. Sed nec tempor est, eu vestibulum ex. Cras accumsan
        felis dignissim dolor tristique bibendum vitae vel nisi. Quisque
        malesuada augue eget tortor rutrum, id posuere elit rhoncus. Nunc in
        elementum quam, ac rhoncus eros. Phasellus consectetur interdum neque
        nec eleifend. Morbi luctus sem et nisi venenatis, tempor facilisis nibh
        convallis. Ut ac dapibus urna. Nam pretium sodales erat in sagittis. Sed
        ullamcorper lectus at ornare gravida. Duis interdum sapien non ipsum
        porttitor dictum. Integer malesuada, neque in efficitur tincidunt, augue
        nisi ullamcorper tortor, faucibus egestas purus augue eleifend quam.
        Fusce posuere, justo at scelerisque ultricies, sem dolor facilisis
        tortor, sed laoreet nunc ante a massa. Donec rhoncus pharetra
        vestibulum. Morbi posuere, nunc a accumsan sagittis, sapien enim aliquet
        lorem, in pellentesque lacus nisi eget risus. Phasellus tincidunt
        faucibus bibendum. Aliquam egestas, lectus a molestie vehicula, quam
        neque eleifend orci, ac blandit metus nulla ut sapien. Proin posuere,
        diam sit amet luctus dapibus, ipsum felis mattis risus, a hendrerit diam
        massa vel metus. Aliquam erat volutpat. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Suspendisse egestas, elit sed aliquam
        rutrum, nisl justo elementum turpis, non dapibus nisi nisl vitae augue.
        Nam id mauris maximus, lacinia leo vitae, blandit ante. Integer placerat
        eleifend sem non venenatis. Fusce laoreet ultrices consectetur.
        Phasellus at dui cursus metus ornare elementum. Nullam aliquam ante
        eros, a dapibus metus condimentum ut. Nam mollis eu leo et lacinia. Cras
        gravida sed lorem non consequat. Fusce eu metus id ante egestas luctus.
        Pellentesque ultricies varius dolor non commodo. Integer viverra
        ultrices velit id congue. Nunc luctus diam lacus, in consequat erat
        pulvinar ut. Proin placerat enim risus, eu fermentum nibh varius quis.
        Morbi purus massa, dictum eget nunc a, vulputate dictum nibh. Fusce in
        elementum sem. Etiam gravida ipsum rutrum, venenatis orci at, euismod
        velit. Sed dignissim, magna pellentesque sodales tincidunt, dolor nisi
        egestas felis, sit amet euismod velit ipsum ut lacus. Aenean eget felis
        nec mi commodo eleifend non quis nisl. Ut quis libero aliquam, tempus
        enim quis, iaculis urna. Aliquam et orci euismod justo pretium vulputate
        non ut nunc. Ut eu leo mauris. Pellentesque non accumsan orci, at
        pretium nibh. In malesuada arcu risus, a varius odio egestas id. Quisque
        viverra turpis a orci vulputate molestie. Sed fringilla augue a lacus
        tristique, ut mollis odio faucibus.
      </p>
      <div className="py-3 border-y-2 border-neutral-100">
        <span className="p-2 font-bold ">Transcription Context</span>
      </div>
      <p className=" px-2 text-sm max-h-28 overflow-y-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed
        aliquet massa, id posuere odio. Proin quis tortor ante. Vivamus mattis
        quis velit vitae fringilla. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per inceptos himenaeos. Vestibulum
        condimentum porttitor orci non maximus. Curabitur rutrum massa eu
        posuere mattis. Sed nec tempor est, eu vestibulum ex. Cras accumsan
        felis dignissim dolor tristique bibendum vitae vel nisi. Quisque
        malesuada augue eget tortor rutrum, id posuere elit rhoncus. Nunc in
        elementum quam, ac rhoncus eros.
      </p>
    </div>
  );
};

const MeetOptions = () => {
  return (
    <div className="w-full border-2 border-neutral-100 p-8 rounded-md space-y-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-slate-800">Download</h1>
        <div className="flex space-x-2"></div>
        <span className="text-sm text-gray-500">
          Download all your meeting information
        </span>
      </div>
      <div className="w-full flex space-x-4">
        <Button
          type="button"
          className="space-x-2 bg-rose-700 hover:bg-rose-900"
        >
          <Video className="h-4 w-4" />
          <span>Download Video</span>
        </Button>
        <Button type="button" className="space-x-2 bg-sky-700 hover:bg-sky-900">
          <Music2 className="h-4 w-4" />
          <span>Download Mp3</span>
        </Button>
        <Button
          type="button"
          className="space-x-2 bg-lime-800 hover:bg-lime-950"
        >
          <AudioLines className="h-4 w-4" />
          <span>Download Transcription</span>
        </Button>
      </div>
    </div>
  );
};

export default MeetDetail;
