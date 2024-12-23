import axios from "axios";

const url = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
    try {
        const response = await axios.get(`${url}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
};

export async function login() {
    try {
        const resp = true;
        if (resp) {
            const data = {
                id: 123,
                role: "SUPER_ADMIN",
                // role: "ADMIN",
                routes: ["/dashboard", "/category"],
                permissions: ["ADD", "DELETE", "UPDATE", "VIEW"],
            };

            // Save the user data to cookies or localStorage
            document.cookie = `token=${JSON.stringify(data)}; path=/;`;
            return data;
        }
    } catch (error) {
        console.log("Login error", error);
        throw new Error("Login failed");
    }
}
