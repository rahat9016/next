export interface IFormInputs {
    name: string;
    email: string;
    role: string;
    permissions: Record<string, boolean>;
    routes: Record<string, boolean>;
}



export interface IRoutes {
    label: string;
    href: string;
    icon: JSX.Element;
}