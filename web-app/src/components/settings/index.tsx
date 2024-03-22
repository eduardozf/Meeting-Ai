import { DoorOpen } from "lucide-react";
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
import { Button } from "../ui/button";

function Settings() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetClose asChild></SheetClose>
          <SheetTitle>Settings Menu</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Lorem Ipsum" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value="email@example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Button type="button" className="col-span-4 space-x-2">
              <DoorOpen className="h-4 w-4"></DoorOpen>
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Settings;
