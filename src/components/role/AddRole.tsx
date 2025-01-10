"use client";

import { addUser } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import RoleForm from "./RoleForm";
import { toast } from "react-toastify";
import { IRolesProps } from "./interface";


export default function AddRole({ setOpen }: { setOpen: React.Dispatch<SetStateAction<boolean>> }) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            queryClient.invalidateQueries(['allRolesData'] as any)
        },
        onError: (error: Error) => {
            console.error("Error adding user:", error.message);
        },
    });

    const onSubmit = (data: IRolesProps) => {
        if (!data) return;

        function checkedFn(data: Record<string, boolean>) {
            const checked = Object.entries(data)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_d, isChecked]) => isChecked)
                .map(([key]) => key);
            return checked
        }

        const roleObject = {
            ...data,
            permissions: checkedFn(data.permissions),
            routes: checkedFn(data.routes)
        }
        
        mutate(roleObject)
        toast.success("Role added successfully")
        setOpen(false)
    };
   

    return (
        <div>
            <RoleForm onSubmit={onSubmit} buttonValue="Add" isPending={isPending} />
        </div>
    );
}
