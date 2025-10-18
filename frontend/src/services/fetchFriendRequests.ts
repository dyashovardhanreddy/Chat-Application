import axios from "axios";

import type { FriendRequest } from "../types";

const BASE_API_URL = "http://localhost:16120/chat-app";

export const fetchFriendRequests = async (): Promise<FriendRequest[]> => {

    try {

        const token = localStorage.getItem('jwtToken');

        if(!token){
            throw new Error("User not authenticated. JWT token not found.");
        }

        const response = await axios.get(`${BASE_API_URL}/getFriendRequests`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data as FriendRequest[];
    } catch(error: any){
        console.error("Error in fetching friends", error);
        throw error;
    }
}