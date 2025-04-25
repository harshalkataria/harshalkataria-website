import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { profile, theme } from '../../utils/configLoader';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background-color: rgba(5, 5, 5, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => theme.colors.primary};
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Header = () => {
  const nameInitials = profile.name
    .split(' ')
    .map(part => part[0])
    .join('');
  
  const renderNavLinks = () => {
    return Object.entries(profile.sections)
      .filter(([_, section]) => section.enabled)
      .map(([key, section]) => (
        <NavLink key={key} to={`/${key}`}>
          {section.title}
        </NavLink>
      ));
  };
  
  return (
    <HeaderContainer>
      <Logo to="/">{nameInitials}</Logo>
      <Nav>
        {renderNavLinks()}
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 