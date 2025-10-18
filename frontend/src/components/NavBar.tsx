// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Navbar: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("jwtToken");

  return (
    <NavbarContainer>
      {isAuthenticated ? (
        <>
          <NavItem to="/chat-app">Home</NavItem>
          <NavItem to="/chat-app/friends">Friends</NavItem>
          <NavItem to="/chat-app/findFriends">Find Friends</NavItem>
          <NavItem to="/chat-app/logout">Logout</NavItem>
        </>
      ) : (
        <>
          <NavItem to="/chat-app/auth/login">Login</NavItem>
          <NavItem to="/chat-app/auth/register">Sign Up</NavItem>
        </>
      )}
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  background-color: #f3f4f6;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const NavItem = styled(NavLink)`
  color: #333;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #2563eb;
  }

  &.active {
    color: #1d4ed8;
    border-bottom: 2px solid #1d4ed8;
  }
`;