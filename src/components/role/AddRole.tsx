"use client";

import { addUser } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import Input from "../ui/form/Input";
import SelectField from "../ui/form/SelectField";
import Schema from "./Schema";
import { toast } from "react-toastify";
import { SetStateAction } from "react";
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

interface FormInputs  {
  name: string;
  email: string;
  role: string;
  permissions?: {
      add: string;
      edit: string;
      view: string;
      delete: string;
  };
};
export default function AddRole({setOpen}: {setOpen: React.Dispatch<SetStateAction<boolean>>}) {
    const resolver = yupResolver(Schema);
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: addUser,
        // onSuccess: () => {
        //   // Invalidate queries to refetch data
        //   queryClient.invalidateQueries(["allRolesData"]);
        // },
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
        const roleObject = {
            ...data,
            permissions: Object.values(data.permissions)
        }
        console.log(roleObject)
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
                        label="Gender"
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
                    <div>
                    <div>
                    {permissionBaseAction.map((permission) => (
          <Controller
            key={permission.id}
            name={`permissions.${permission.id}`}
            control={control}  
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox {...field} id={permission.id} /> 
                <label className="cursor-pointer" htmlFor={permission.id}>{permission.label}</label>
              </div>
            )}
          />
        ))}
      </div>
                    </div>
                </div>
                <button
                    type="submit"
                    // disabled={isLoading}
                    className="bg-[#388E3C] text-bgPrimary text-sm font-medium px-8 py-3 rounded-md mt-6"
                >
                    {isPending ? "Loading..." :"Add"} 
                </button>
            </form>
        </div>
    );
}
