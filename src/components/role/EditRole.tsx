import { updateUser } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";
import RoleForm from "./RoleForm";
import { toast } from "react-toastify";
import { IRolesProps } from "./interface";

export default function EditRole({
  initialValues,
  setOpen,
}: {
  initialValues?: IRolesProps;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.invalidateQueries(["allRolesData"] as any);
    },
    onError: (error: Error) => {
      console.error("Error adding user:", error.message);
    },
  });

  const onSubmit = (data: IRolesProps) => {
    if (!data) return;

    function checkedFn(data: Record<string, boolean>) {
      console.log(data);
      const checked = Object.entries(data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, isChecked]) => isChecked)
        .map(([key]) => key);
      return checked;
    }

    const roleObject = {
      id: initialValues?.id,
      ...data,
      permissions: checkedFn(data.permissions),
      routes: checkedFn(data.routes),
    };
    console.log(roleObject);
    mutate(roleObject);
    toast.success("Role Edited successfully");
    setOpen(false);
  };
  return (
    <div>
      <RoleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        isEdit
        buttonValue="Update"
        isPending={isPending}
      />
    </div>
  );
}
