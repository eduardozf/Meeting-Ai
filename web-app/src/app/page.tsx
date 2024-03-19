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
import { toast } from "@/components/ui/use-toast";
import { Wand, Music2, Video, AudioLines, SquarePlus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function Home() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-6">
      <div className="w-full flex space-x-4">
        <div className="w-2/3 flex flex-col space-y-2">
          <div className="w-full border-2 border-neutral-100 p-8 rounded-md space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Details</h1>
              <span className="text-sm text-gray-500">Update meet details</span>
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
                      <Button type="button" className="space-x-2">
                        <Wand className="h-4 w-4" />
                        <span>Generate with AI</span>
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
                        <div className="flex space-x-4 items-center">
                          <Badge>MyTag</Badge>
                          <div className="flex items-center space-x-1">
                            <Input
                              className="max-w-24 max-h-6"
                              placeholder="New tag"
                              {...field}
                            />
                            <Button
                              type="button"
                              className="p-0 m-0 text-gray-500 bg-transparent hover:bg-transparent hover:text-gray-900"
                            >
                              <SquarePlus className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </div>
          <div className="w-full border-2 border-neutral-100 p-8 rounded-md space-y-8">
            <div className="w-full">
              <span>Persons</span>
              <div className="flex space-x-2"></div>
              <span className="text-sm text-gray-500">
                Persons can only be added when uploading a new meeting
              </span>
            </div>
            <div className="w-full flex space-x-4">
              <Button type="button" className="space-x-2 bg-rose-700">
                <Video className="h-4 w-4" />
                <span>Download Video</span>
              </Button>
              <Button type="button" className="space-x-2 bg-sky-700">
                <Music2 className="h-4 w-4" />
                <span>Download Mp3</span>
              </Button>
              <Button type="button" className="space-x-2 bg-lime-800">
                <AudioLines className="h-4 w-4" />
                <span>Download Transcription</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="w-1/3 border-2 border-neutral-100 rounded-md space-y-4 flex flex-col">
          <div className="py-3 border-b-2 border-neutral-100">
            <span className="p-2 font-bold ">Video Preview</span>
          </div>
          <video src="video.mkv" controls></video>
          <div className="py-3 border-y-2 border-neutral-100">
            <span className="p-2 font-bold ">Transcription</span>
          </div>
          <p className=" px-2 text-sm max-h-48 overflow-y-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed
            aliquet massa, id posuere odio. Proin quis tortor ante. Vivamus
            mattis quis velit vitae fringilla. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.
            Vestibulum condimentum porttitor orci non maximus. Curabitur rutrum
            massa eu posuere mattis. Sed nec tempor est, eu vestibulum ex. Cras
            accumsan felis dignissim dolor tristique bibendum vitae vel nisi.
            Quisque malesuada augue eget tortor rutrum, id posuere elit rhoncus.
            Nunc in elementum quam, ac rhoncus eros. Phasellus consectetur
            interdum neque nec eleifend. Morbi luctus sem et nisi venenatis,
            tempor facilisis nibh convallis. Ut ac dapibus urna. Nam pretium
            sodales erat in sagittis. Sed ullamcorper lectus at ornare gravida.
            Duis interdum sapien non ipsum porttitor dictum. Integer malesuada,
            neque in efficitur tincidunt, augue nisi ullamcorper tortor,
            faucibus egestas purus augue eleifend quam. Fusce posuere, justo at
            scelerisque ultricies, sem dolor facilisis tortor, sed laoreet nunc
            ante a massa. Donec rhoncus pharetra vestibulum. Morbi posuere, nunc
            a accumsan sagittis, sapien enim aliquet lorem, in pellentesque
            lacus nisi eget risus. Phasellus tincidunt faucibus bibendum.
            Aliquam egestas, lectus a molestie vehicula, quam neque eleifend
            orci, ac blandit metus nulla ut sapien. Proin posuere, diam sit amet
            luctus dapibus, ipsum felis mattis risus, a hendrerit diam massa vel
            metus. Aliquam erat volutpat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Suspendisse egestas, elit sed aliquam
            rutrum, nisl justo elementum turpis, non dapibus nisi nisl vitae
            augue. Nam id mauris maximus, lacinia leo vitae, blandit ante.
            Integer placerat eleifend sem non venenatis. Fusce laoreet ultrices
            consectetur. Phasellus at dui cursus metus ornare elementum. Nullam
            aliquam ante eros, a dapibus metus condimentum ut. Nam mollis eu leo
            et lacinia. Cras gravida sed lorem non consequat. Fusce eu metus id
            ante egestas luctus. Pellentesque ultricies varius dolor non
            commodo. Integer viverra ultrices velit id congue. Nunc luctus diam
            lacus, in consequat erat pulvinar ut. Proin placerat enim risus, eu
            fermentum nibh varius quis. Morbi purus massa, dictum eget nunc a,
            vulputate dictum nibh. Fusce in elementum sem. Etiam gravida ipsum
            rutrum, venenatis orci at, euismod velit. Sed dignissim, magna
            pellentesque sodales tincidunt, dolor nisi egestas felis, sit amet
            euismod velit ipsum ut lacus. Aenean eget felis nec mi commodo
            eleifend non quis nisl. Ut quis libero aliquam, tempus enim quis,
            iaculis urna. Aliquam et orci euismod justo pretium vulputate non ut
            nunc. Ut eu leo mauris. Pellentesque non accumsan orci, at pretium
            nibh. In malesuada arcu risus, a varius odio egestas id. Quisque
            viverra turpis a orci vulputate molestie. Sed fringilla augue a
            lacus tristique, ut mollis odio faucibus.
          </p>
          <div className="py-3 border-y-2 border-neutral-100">
            <span className="p-2 font-bold ">Transcription Context</span>
          </div>
          <p className=" px-2 text-sm max-h-28 overflow-y-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed
            aliquet massa, id posuere odio. Proin quis tortor ante. Vivamus
            mattis quis velit vitae fringilla. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.
            Vestibulum condimentum porttitor orci non maximus. Curabitur rutrum
            massa eu posuere mattis. Sed nec tempor est, eu vestibulum ex. Cras
            accumsan felis dignissim dolor tristique bibendum vitae vel nisi.
            Quisque malesuada augue eget tortor rutrum, id posuere elit rhoncus.
            Nunc in elementum quam, ac rhoncus eros.
          </p>
        </div>
      </div>
    </main>
  );
}
