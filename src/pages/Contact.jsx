import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SocialLinks from '../components/ui/SocialLinks';
import { profile } from '../utils/configLoader';
import { setDocumentTitle } from '../utils/documentTitle';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  overflow-y: auto;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: ${props => props.theme?.colors?.primary || '#3498db'};
  }
`;

const Section = styled(motion.section)`
  margin: 3rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 800px;
`;

const SocialSection = styled(motion.div)`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SocialPlatform = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  a {
    font-size: 1.2rem;
    color: ${props => props.theme?.colors?.primary || '#3498db'};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Contact = () => {
  useEffect(() => {
    setDocumentTitle('Contact');
  }, []);
  
  return (
    <Container className="scrollable-page">
      <PageTitle
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Contact Me
      </PageTitle>
      
      <Description
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        {profile.description} Feel free to reach out through any of the platforms below.
      </Description>
      
      <Section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <SectionTitle>Connect With Me</SectionTitle>
        
        {/* Large social icons */}
        <motion.div variants={itemVariants}>
          <SocialLinks center={false} size="2.5rem" margin="2rem 0" />
        </motion.div>
        
        {/* Detailed social links with descriptions */}
        <SocialSection>
          {Object.entries(profile.social).map(([platform, url]) => {
            if (!url) return null;
            
            return (
              <SocialPlatform key={platform} variants={itemVariants}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {platform === 'github' && 'View my code repositories on GitHub'}
                  {platform === 'linkedin' && 'Connect with me on LinkedIn'}
                  {platform === 'twitter' && 'Follow me on Twitter'}
                  {platform === 'instagram' && 'Check out my photos on Instagram'}
                  {platform === 'medium' && 'Read my articles on Medium'}
                </a>
              </SocialPlatform>
            );
          })}
        </SocialSection>
      </Section>
    </Container>
  );
};

export default Contact; 