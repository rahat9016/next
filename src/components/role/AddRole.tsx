"use client";

import { addUser } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import RoleForm from "./RoleForm";


interface IFormInputs {
    name: string;
    email: string;
    role: string;
    permissions: Record<string, boolean>;
    routes: Record<string, boolean>;
}

const data = {
    id: "98d0",
    name: "Electronics",
    email: "rahat@gmail.com",
    role: "ATI",
    permissions: ["edit", "view"],
    routes: ["/dashboard"],
};
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
        console.log(roleObject)
        mutate(roleObject);
        setOpen(false)
    };

    return (
        <div>
            <RoleForm onSubmit={onSubmit} buttonValue="Add" isPending={isPending} />
        </div>
    );
}
