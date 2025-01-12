import { getCookie } from "@/lib/cookie";
import { hasPermissionForAction } from "@/lib/helpers";
import React from "react";

interface IHasPermissionProps {
    action: string;
    children: React.ReactNode;
}
const HasPermission: React.FC<IHasPermissionProps> = ({
    action,
    children,
}) => {
    const user = getCookie('token')
    if(!user) return;
    
    const isPermission = hasPermissionForAction(user, action.toUpperCase())
    const shouldShowDisabled = action.toLowerCase() === "edit" && !isPermission;
    if (!isPermission && action.toLowerCase() !== "edit") return null;
    return <div className={`${
        shouldShowDisabled ? "opacity-25 pointer-events-none" : "block"
      }`}>
        {React.cloneElement(children as React.ReactElement, {
        disabled: shouldShowDisabled, 
      })}
      </div>;
}

export default HasPermission