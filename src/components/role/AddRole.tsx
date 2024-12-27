"use client";

import { addUser } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import Input from "../ui/form/Input";
import SelectField from "../ui/form/SelectField";
import { links } from "../ui/sideNavbar/DashboardSidebar";
import Schema from "./Schema";
const options = [
    { id: 1, value: "ATI", label: "ATI" },
    {
        id: 2,
        value: "DRUG_INTERNATIONAL_LIMITED",
        label: "Drug International Limited",
    },
    { id: 3, value: "SUPER_ADMIN", label: "Super Admin" },
];
const permissionBaseAction = [
    {
        id: "add",
        label: "Add",
    },
    {
        id: "edit",
        label: "Edit",
    },
    {
        id: "view",
        label: "View",
    },
    {
        id: "delete",
        label: "Delete",
    },
] as const;

interface FormInputs {
    name: string;
    email: string;
    role: string;
    permissions?: {
        add: string;
        edit: string;
        view: string;
        delete: string;
    };
    routes?: Record<string, boolean>;
};
export default function AddRole({ setOpen }: { setOpen: React.Dispatch<SetStateAction<boolean>> }) {
    const resolver = yupResolver(Schema);
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['allRolesData'] as any)
        },
        onError: (error: Error) => {
            console.error("Error adding user:", error.message);
        },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        resetField,
        control,
    } = useForm<FormInputs>({ resolver });

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

        mutate(roleObject);
        reset()
        setOpen(false)
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid  grid-cols-2 gap-6">
                    <Input
                        inputType="text"
                        labelName="Name"
                        placeholderText="Enter your name"
                        name="name"
                        errors={errors}
                        register={register}
                    />
                    <Input
                        inputType="email"
                        labelName="Email"
                        placeholderText="Enter your email"
                        name="email"
                        errors={errors}
                        register={register}
                    />

                    <SelectField
                        control={control}
                        name="role"
                        data={options}
                        label="Role"
                        placeholder="-Select Role-"
                        labelKey="label"
                        valueKey="value"
                        resetField={resetField}
                        resetFieldName1=""
                        resetFieldName2=""
                        disabledValue="1"
                        isLoading={false}
                        error={errors.role?.message}
                    />
                    <div className="flex flex-col gap-1">
                        <label className="text-[#2D0C3E] text-basic pl-2 mb-1">
                            Permission
                        </label>
                        <div className="flex items-center gap-3 flex-wrap">

                            {permissionBaseAction.map((permission) => (
                                <Controller
                                    key={permission.id}
                                    name={`permissions.${permission.id}`}
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={permission.id}
                                                    checked={!!field.value}
                                                    onCheckedChange={field.onChange}
                                                    {...field}
                                                />
                                                <label className="cursor-pointer" htmlFor={permission.id}>
                                                    {permission.label}
                                                </label>
                                            </div>
                                        )
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="text-[#2D0C3E] text-basic pl-2 mb-1">
                        Permission Routes
                    </label>
                    <div className="flex items-center gap-5 flex-wrap">
                        {links.map((route) => (
                            <Controller
                                key={route.label}
                                name={`routes.${route.href}`}
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={route.href}
                                            checked={!!field.value}
                                            onCheckedChange={field.onChange}
                                            {...field}
                                        />
                                        <label className="cursor-pointer" htmlFor={route.href}>
                                            {route.label}
                                        </label>
                                    </div>
                                )}
                            />
                        ))}

                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-[#388E3C] text-bgPrimary text-sm font-medium px-8 py-3 rounded-md mt-6"
                >
                    {isPending ? "Loading..." : "Add"}
                </button>
            </form>
        </div>
    );
}
