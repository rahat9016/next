
// I -> Interface
interface IPermission{
    role: string;
    permissions: string[]
}

export function hasPermissionForAction(user: IPermission, action: string){
    if(!action) return;
    if(user){
        const { role, permissions } = user
        // if user role is super admin. It can do every action ["ADD", "DELETE", "UPDATE", "VIEW"]
        if(role === "SUPER_ADMIN") return true;
    
        // checking permission for regular user    
        return permissions.includes(action)
    }
}