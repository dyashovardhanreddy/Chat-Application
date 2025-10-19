import type { User } from "../types";
import axios from "axios";

const BASE_API_URL = "http://localhost:16120/chat-app";

export const fetchUsers = async () : Promise<User[]> => {

    try {
        const token = localStorage.getItem("jwtToken");

        if(!token){
            throw new Error("User not authenticated. JWT token not found.");
        }

        const response = await axios.get(`${BASE_API_URL}/findFriends`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data as User[];
    } catch(error: any){
        console.error("Error fetching users:", error);
        throw error;
    }

}