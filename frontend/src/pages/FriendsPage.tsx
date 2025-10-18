import type { User } from "../types";

import { getFriends } from "../services/friends";
import { useEffect, useState } from "react";
import styled from "styled-components";
import defaultPicture from "../assets/default-display-picture.jpg";

export const FriendsPage : React.FC = () => {
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try{
                const data = await getFriends();
                setFriends(data);
            } catch(error: any){
                setError(error.message || "Failed to load friends");
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    if(loading){
        return(
            <div className="text-center mt-10 text-gray-500">Loading friends...</div>
        )
    }

    if(error){
        return (
            <div className="text-center mt-10 text-red-500">{error}</div>
        )
    }
    return (
        <Container>
            <Header>Friends</Header>
            {friends.length == 0 ? (
                <div className="text-center text-gray-500"> No friends added yet</div>
            ): (
                <FriendsList>
                    {friends.map((friend) => (
                            <FriendContainer>
                                <DisplayPicture src={defaultPicture}></DisplayPicture>
                                <p>{friend.firstname}</p>
                            </FriendContainer>
                    ))}
                </FriendsList>
            )}
        </Container>
    )

}

const Container = styled.div`
    border: solid 1px gray;
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Header = styled.h1`
    display: flex;
    justify-content: center;
    font-weight: bold;
    letter-spacing: 1px;
`;

const FriendsList = styled.div`
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;

const FriendContainer = styled.div`
    display: flex;
    column-gap: 20px;
`;

const DisplayPicture = styled.img`
    border-radius: 200px;
    width: 50px;

`;