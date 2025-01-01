import { updateUser } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SetStateAction } from 'react';
import RoleForm from './RoleForm';
import { toast } from 'react-toastify';

export default function EditRole({initialValues, setOpen}: {initialValues:any; setOpen: React.Dispatch<SetStateAction<any>>}) {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateUser,
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
            id:initialValues?.id,
            ...data,
            permissions: checkedFn(data.permissions),
            routes: checkedFn(data.routes)
        }
        console.log(roleObject)
        mutate(roleObject);
        toast.success("Role Edited successfully")
        setOpen(false)
    };
  return (
    <div>
        <RoleForm onSubmit={onSubmit} initialValues={initialValues} isEdit buttonValue="Update" isPending={isPending} />
    </div>
  )
}
