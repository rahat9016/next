export interface IRole {
    id?: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
    routes: string[]
}
