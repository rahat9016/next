export interface IRolesProps {
  id?: string;
  name: string;
  email: string;
  role: string;
  permissions: Record<string, boolean> | null;
  routes: Record<string, boolean> | null;
}

export interface IRoutes {
  label: string;
  href: string;
  icon: JSX.Element;
}

export interface IRowData {
  id: number;
  name: string;
  age: number;
}

interface IGeo {
  lat: string;
  lng: string;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: Company;
}
