import axios from "axios";

const BASE_API_URL = "http://localhost:16120/chat-app";

export const sendFriendRequest = async (username: string) : Promise<String> => {

    try{
        const token = localStorage.getItem("jwtToken");
        
        if(!token){
            throw new Error("User not authenticated. JWT token not found.");
        }

        const response = await axios.post(`${BASE_API_URL}/sendFriendRequest`,
            {
                "user": username,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch(error: any){
        console.error("Error in sending friends:", error);
        throw error;
    }

}