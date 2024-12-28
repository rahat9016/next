import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { links } from "../ui/sideNavbar/DashboardSidebar";

import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../ui/form/Input";
import SelectField from "../ui/form/SelectField";
import Schema from "./Schema";

export const options = [
    { id: 1, value: "ATI", label: "ATI" },
    {
        id: 2,
        value: "DRUG_INTERNATIONAL_LIMITED",
        label: "Drug International Limited",
    },
    { id: 3, value: "SUPER_ADMIN", label: "Super Admin" },
];
export const permissionBaseAction = [
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

interface IFormInputs {
    name: string;
    email: string;
    role: string;
    permissions: Record<string, boolean>;
    routes: Record<string, boolean>;
}

export default function RoleForm({
    initialValues,
    onSubmit,
    isPending = false,
    isEdit = false,
    buttonValue,
}: {
    initialValues?: any;
    onSubmit: (data: any) => void;
    isPending?: boolean;
    isEdit?: boolean;
    buttonValue?: string;
}) {
    const resolver = yupResolver(Schema);
    function initialPermissionsFn(
        permissionData: any,
        userAccessPermission: string[]
    ) {
        if (!permissionData && !userAccessPermission) return;

        const permissions = permissionData.reduce(
            (acc: any, permission: any) => {
                acc[permission.id] = userAccessPermission?.includes(
                    permission.id
                );
                return acc;
            },
            {} as Record<string, boolean>
        );
        return permissions;
    }
    function initialRoutesFn(routesData: any, userAccessRoutes: string[]) {
        if (!routesData && !userAccessRoutes) return;
        const routes = routesData.reduce((acc: any, route: any) => {
            acc[route.href] = userAccessRoutes?.includes(route.href);
            return acc;
        }, {} as Record<string, boolean>);
        return routes;
    }

    const defaultValues = {
        name: initialValues?.name,
        email: initialValues?.email,
        role: initialValues?.role,
        permissions: initialPermissionsFn(
            permissionBaseAction,
            initialValues?.permissions
        ),
        routes: initialRoutesFn(links, initialValues?.routes),
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        control,
    } = useForm<IFormInputs>({ resolver: resolver, defaultValues });

    return (
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
                    disabled={isEdit}
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
                                render={({ field }) => (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={permission.id}
                                            checked={!!field.value}
                                            onCheckedChange={(checked) =>
                                                field.onChange(checked)
                                            }
                                        />
                                        <label
                                            className="cursor-pointer"
                                            htmlFor={permission.id}
                                        >
                                            {permission.label}
                                        </label>
                                    </div>
                                )}
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
                                        onCheckedChange={(checked) =>
                                            field.onChange(checked)
                                        }
                                    />
                                    <label
                                        className="cursor-pointer"
                                        htmlFor={route.href}
                                    >
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
                {isPending ? "Loading..." : buttonValue}
            </button>
        </form>
    );
}
