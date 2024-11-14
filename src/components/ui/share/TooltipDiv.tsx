import React from "react";

import { MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

interface IAdd {
  name: string;
}

const TooltipDiv: React.FC<IAdd> = ({ name }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <label
            htmlFor="show data"
            className="cursor-pointer bg-[#FF7332] p-2 rounded-md"
          >
            {name === "Edit" && <MdOutlineEdit fontSize={16} color="#FFF" />}
            {name === "View" && <IoEyeOutline fontSize={16} color="#FFF" />}
          </label>
        </TooltipTrigger>
        <TooltipContent className="border border-[#FF7332]">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipDiv;
