import { AudioLines, DoorOpen } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <header className="flex py-2 px-8 bg-slate-100">
      <div>
        <AudioLines className="w-10 h-10" />
      </div>
      <div className="w-full flex justify-center">
        <div className="p-1 rounded-md bg-slate-200">
          <Button className="bg-white text-gray-900 px-14 h-8 hover:bg-white hover:rounded-none">
            Upload
          </Button>
          <Button className="bg-slate-200 text-slate-500 px-14 h-8 hover:bg-slate-100 hover:text-slate-600 hover:rounded-none">
            Projects
          </Button>
          <Button className="bg-slate-200 text-slate-500 px-14 h-8 hover:bg-slate-100 hover:text-slate-600 hover:rounded-none">
            Chat
          </Button>
        </div>
      </div>
      <div>
        <Settings />
      </div>
    </header>
  );
};

function Settings() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetClose asChild></SheetClose>
          <SheetTitle>Settings menu</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Lorem Ipsum" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@loreme" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Button type="button" className="col-span-4 space-x-2">
              <DoorOpen className="h-4 w-4"></DoorOpen>
              <span>Logout</span>
            </Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Header;
