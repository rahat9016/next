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
    return <div className={`${ isPermission ? 'block' : 'hidden' }`}>{children}</div>;
}

export default HasPermission