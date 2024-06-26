import { AudioLines } from "lucide-react";
import Link from "next/link";
import Settings from "../settings/index";

type Tabs = "upload" | "projects" | "detail" | "chat";
type HeaderProps = { currentTab: Tabs };

const Header = ({ currentTab }: HeaderProps) => {
  return (
    <header className="flex py-2 px-8 bg-slate-100 shadow-sm headerGrid">
      <div>
        <AudioLines className="w-10 h-10" />
      </div>
      <div className="w-full flex justify-center">
        <div className="p-1 rounded-md bg-slate-200 flex items-center">
          <RouteButton
            name="Upload"
            route="/upload"
            active={currentTab === "upload"}
          />
          <RouteButton
            name="Projects"
            route="/projects"
            active={currentTab === "projects"}
          />
          <RouteButton
            name="Details"
            route="/detail"
            active={currentTab === "detail"}
          />
          <RouteButton
            name="Chat"
            route="/chat"
            active={currentTab === "chat"}
          />
        </div>
      </div>
      <div>
        <Settings />
      </div>
    </header>
  );
};

type RouteButtonProps = {
  name: string;
  route: string;
  active: boolean;
};

const RouteButton = ({ name, route, active }: RouteButtonProps) => {
  const normalClass =
    "bg-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-600 hover:rounded-none";
  const activeClass =
    "bg-white text-gray-900 hover:bg-white hover:rounded-none pointer-events-none";

  const classProps = active ? activeClass : normalClass;

  return (
    <Link
      className={`${classProps} px-14 rounded-md h-8 flex items-center`}
      href={route}
    >
      <span>{name}</span>
    </Link>
  );
};

export default Header;
