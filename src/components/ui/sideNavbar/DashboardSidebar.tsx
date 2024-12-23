"use client";
import { getCookie } from "@/lib/cookie";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { Sidebar, SidebarBody, SidebarLink } from "../sidebar";


export const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <LuLayoutDashboard className="text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "User",
    href: "/user",
    icon: (
      <FaUserCog className=" text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "Category",
    href: "/category",
    icon: (
      <FaUserCog className=" text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },    
];
export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const user = getCookie('token')

  const filterMenus = user.role === "SUPER_ADMIN" ? links : links.filter(link  => user.routes.includes(link.href))
  console.log(filterMenus)
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row w-full h-screen flex-1  ",
        ""
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {filterMenus.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>

          <div>
            <SidebarLink
              link={{
                label: "Mahfuz Islam",
                href: "#",
                icon: (
                  <Image
                    src={"/images/sidebar/mahfuz.JPG"}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-Tertiary bg-bg flex flex-col gap-2 flex-1 w-full h-full overflow-hidden overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm  py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Dashboard
      </motion.span>
    </Link>
  );
};
const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm  py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
