import { Tag as TagIcon, X as XIcon } from "lucide-react";
import { useState } from "react";

type TagPops = { name: string; handleRemove(x: string): void };

const Tag = ({ name, handleRemove }: TagPops) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      className="flex px-4 py-2 items-center justify-center space-x-2 rounded-lg m-0 bg-slate-300 text-slate-900  hover:bg-slate-900 hover:text-white "
      type="button"
      onClick={() => handleRemove(name)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? <XIcon className="w-4 h-4" /> : <TagIcon className="w-4 h-4" />}
      <span className="w-max">{name}</span>
    </button>
  );
};

export default Tag;
