import styled from "styled-components";

import { useEffect, useState } from "react";
import type { FriendRequest } from "../types";
import { fetchFriendRequests } from "../services/fetchFriendRequests";
import defaultPicture from "../assets/default-display-picture.jpg";
import { acceptFriendRequest } from "../services/acceptFriendRequest";
import { rejectFriendRequest } from "../services/rejectFriendRequest";
export const FriendRequestsPage : React.FC = () => {

    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const getFriendRequests = async () => {

            try {
                const data = await fetchFriendRequests();
                setFriendRequests(data);
            } catch(error : any){
                setError(error.message || "Failed to load users");
            } finally {
                setLoading(false);
            }
        
        };

        getFriendRequests();

    }, []);

    const handleAcceptFriendRequest = async (id: number) => {
        try{
            const responseMessage = await acceptFriendRequest(id);
            console.log(responseMessage);

        } catch(error: any){
            console.log(error);
            throw error;
        }
    };
    
    const handleRejectFriendRequest = async (id: number) => {
        try{
            const responseMessage = await rejectFriendRequest(id);
            console.log(responseMessage);
        } catch(error: any){
            console.log(error);
            throw error;
        }
    }

    if(loading){
        return(
            <Container>
                <Header>
                    Fetching Friend Requests
                </Header>

        </Container>
        )
    }
    return (
        <Container>
            <Header>
                Friend Requests
            </Header>
                {friendRequests.length == 0 ? (
                        <div> No friends Requests yet</div>
                    ): (
                        <FriendRequestsList>
                            {friendRequests.map((friendRequest) => (
                                <FriendRequestContainer key={friendRequest.id}>
                                    <DisplayPicture src={defaultPicture}></DisplayPicture>
                                    <p>{friendRequest.senderFirstName}</p>
                                    <AcceptFriendRequestButton onClick={() => handleAcceptFriendRequest(friendRequest.id)}>
                                        Accept
                                    </AcceptFriendRequestButton>
                                    <RejectFriendRequestButton onClick={() => handleRejectFriendRequest(friendRequest.id)}>
                                        Reject
                                    </RejectFriendRequestButton>
                                </FriendRequestContainer>
                            ))}
                        </FriendRequestsList>
                    ) 
                }
        </Container>
    );
}

const DisplayPicture = styled.img`
    border-radius: 200px;
    width: 50px;
    margin-right: 15px;
`;

const Container = styled.div`
    border: solid 1px gray;
    display: flex;
    flex-direction: column;
    width: 400px;
`;

const Header = styled.p`
    display: flex;
    justify-content: center;
    font-weight: bold;
    letter-spacing: 1px;
`;

const FriendRequestsList = styled.div`
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;

const FriendRequestContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr;
    padding-right: 20px;
    align-items: center;
`;

const AcceptFriendRequestButton = styled.button `
    background-color: #2563eb;
    color: white;
    border: none;
    height: 40px;
    padding: 10px 18px;
    margin-right: 5px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #1e40af; /* darker blue */
    }

    &:disabled {
        background-color: #9ca3af; /* gray */
        cursor: not-allowed;
    }
`;

const RejectFriendRequestButton = styled.button `
    background-color: grey;
    color: white;
    border: none;
    height: 40px;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #A9A9A9; /* darker blue */
    }

    &:disabled {
        background-color: #9ca3af; /* gray */
        cursor: not-allowed;
    }
`;



