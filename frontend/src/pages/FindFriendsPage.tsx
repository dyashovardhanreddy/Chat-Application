import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import type { User } from "../types";
import { fetchUsers } from "../services/fetchUsers";
import styled from "styled-components";
import defaultPicture from "../assets/default-display-picture.jpg";
import { UserPlus } from "lucide-react";
import { sendFriendRequest } from "../services/sendFriendRequest";

export const FindFriendsPage: React.FC = () => {

        const [users, setUsers] = useState<User[]>([]);
        const [message, setMessage] = useState<String>();
        const [error, setError] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(true);

        const handleAddFriend = async (username: string) : Promise<void> => {
                try{
                        const result = await sendFriendRequest(username);
                        setMessage(result);
                        alert(message);
                } catch (error){
                        console.log("Error sending request:", error);
                }
        }

        useEffect(() => {

                const fetchData = async () => {
                        try{
                                const data = await fetchUsers();
                                setUsers(data);
                        } catch(error: any){
                                setError(error.message || "Failed to load users");
                        } finally{
                                setLoading(false);
                        }
                }

                fetchData();
        },[]);

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
                <Header>Add Friends</Header>
                <NavItem to="/chat-app/friendRequests">Friend Requests</NavItem>
                {users.length == 0 ? (
                        <div className="text-center text-gray-500"> No friends added yet</div>
                ): (
                        <UsersList>
                        {users.map((user) => (
                                <UserContainer>
                                        <DisplayPicture src={defaultPicture}></DisplayPicture>
                                        <p>{user.firstname}</p>
                                        <AddFriendButton onClick={() => handleAddFriend(user.username)}>
                                                <UserPlus size={18} style={{ marginRight: "6px" }} />
                                                Add Friend
                                        </AddFriendButton>
                                </UserContainer>
                        ))}
                        </UsersList>
                )}
            </Container>
        );
}


const Container = styled.div`
    border: solid 1px gray;
    display: flex;
    flex-direction: column;
    width: 400px;
`;

const NavItem = styled(NavLink)`
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
`;

const Header = styled.h1`
    display: flex;
    justify-content: center;
    font-weight: bold;
    letter-spacing: 1px;
`;

const UsersList = styled.div`
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;

const UserContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
    padding-right: 20px;
    align-items: center;
`;

const DisplayPicture = styled.img`
    border-radius: 200px;
    width: 50px;

`;

const AddFriendButton = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  height: 40px;
  padding: 10px 18px;
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