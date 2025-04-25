import React from 'react';
import styled from 'styled-components';
import { profile } from '../../utils/configLoader';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaMedium } from 'react-icons/fa';

// Styled components for social links
const SocialContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  align-items: center;
  justify-content: ${props => props.$center ? 'center' : 'flex-start'};
  margin: ${props => props.$margin || '1rem 0'};
`;

const SocialLink = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  transition: color 0.2s ease, transform 0.2s ease;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5));
  
  &:hover {
    color: ${props => props.theme?.colors?.primary || '#3498db'};
    transform: translateY(-3px) scale(1.1);
  }
`;

// Map social platform keys to their respective icons
const socialIcons = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  instagram: <FaInstagram />,
  medium: <FaMedium />,
  // Add more platforms as needed
};

/**
 * Component to display social media links from profile configuration
 * @param {Object} props
 * @param {boolean} props.center - Center the icons (default: false)
 * @param {string} props.margin - Custom margin (default: '1rem 0')
 * @param {string} props.size - Custom size for icons (default is 1.5rem in the styled component)
 */
const SocialLinks = ({ center = false, margin, size }) => {
  // Get the social links from profile configuration
  const { social } = profile;
  
  // Custom size style if provided
  const iconStyle = size ? { fontSize: size } : {};
  
  // Only render if there are social links
  if (!social || Object.keys(social).length === 0) {
    return null;
  }
  
  return (
    <SocialContainer $center={center} $margin={margin}>
      {Object.entries(social).map(([platform, url]) => {
        // Skip if URL is empty or platform is not recognized
        if (!url || !socialIcons[platform]) return null;
        
        return (
          <SocialLink 
            key={platform} 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={iconStyle}
            aria-label={`Visit ${platform} profile`}
          >
            {socialIcons[platform]}
          </SocialLink>
        );
      })}
    </SocialContainer>
  );
};

export default SocialLinks; 