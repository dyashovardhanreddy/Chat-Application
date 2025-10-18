import axios from "axios";
const BASE_API_URL = "http://localhost:16120/chat-app";

export const acceptFriendRequest = async (id: number) : Promise<string> => {
    try {

        const token = localStorage.getItem('jwtToken');
        if(!token){
            throw new Error("User not authenticated");
        }
        const response = axios.post(`${BASE_API_URL}/acceptFriendRequest/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return (await response).data;
    } catch(error: any){
        console.log("Error is accepting friend request", error);
        throw error;
    }
}