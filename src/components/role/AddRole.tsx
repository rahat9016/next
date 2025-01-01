"use client";

import { addUser } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import RoleForm from "./RoleForm";
import { toast, ToastContainer } from "react-toastify";


export default function AddRole({ setOpen }: { setOpen: React.Dispatch<SetStateAction<boolean>> }) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['allRolesData'] as any)
        },
        onError: (error: Error) => {
            console.error("Error adding user:", error.message);
        },
    });

    const onSubmit = (data: any) => {
        if (!data) return;

        function checkedFn(data: any) {
            const checked = Object.entries(data)
                .filter(([_, isChecked]) => isChecked)
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
            {/* <ToastContainer/> */}
            <RoleForm onSubmit={onSubmit} buttonValue="Add" isPending={isPending} />
        </div>
    );
}
