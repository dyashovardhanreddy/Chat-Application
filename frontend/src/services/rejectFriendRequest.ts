import axios from "axios";
const BASE_API_URL = "http://localhost:16120/chat-app";

export const rejectFriendRequest = async (id: number) : Promise<string> => {

    try {
        const token = localStorage.getItem('jwtToken');

        if(!token){
            throw new Error("User not Authenticated.");
        }

        const response = axios.post(`${BASE_API_URL}/rejectFriendRequest/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,   
                }
            }
        );

        return (await response).data;
    } catch(error: any){
        console.log("Error is rejecting friend request", error);
        throw error;
    }
}