import axios from "axios";

const url = "https://jsonplaceholder.typicode.com";
const jsonServerURL = "http://localhost:8000"
export const getUsers = async () => {
    try {
        const response = await axios.get(`${url}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
};
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${jsonServerURL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
};
export async function login({email}:{email: string}) {
    try {
        const {data} = await axios.get(`${jsonServerURL}/users?email=${email}`);
        if (data.length>0) {
            // Save the user data to cookies or localStorage
            document.cookie = `token=${JSON.stringify(data[0])}; path=/;`;
            return data[0];
        }else throw new Error("User not found");
    } catch (error) {
        console.log("Login error", error);
        throw new Error("Login failed");
    }
}

export const addUser = async (data:any) => {
    try {        
        const response = await axios.post(`${jsonServerURL}/users`, data);
        return response.data
    } catch (error) {
        console.log("Add User error", error);
        throw new Error("Add User field");
    }
}
export const updateUser = async (data:any) => {
    try {        
        const response = await axios.patch(`${jsonServerURL}/users/${data?.id}`, data);
        return response.data
    } catch (error) {
        console.log("Update User error", error);
        throw new Error("Update User field");
    }
}