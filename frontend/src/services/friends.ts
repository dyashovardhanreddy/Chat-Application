import type { Friend } from "../types";
import axios from "axios";

const API_BASE_URL = "http://localhost:16120/chat-app";

export const getFriends = async (): Promise<Friend[]> => {
    try {
        const token = localStorage.getItem("jwtToken");

        if(!token){
            throw new Error("User not authenticated. JWT token not found.");
        }

        const response = await axios.get(`${API_BASE_URL}/getFriends`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data as Friend[];
    } catch(error: any){
        console.error("Error fetching friends:", error);
        throw error;
    }
};