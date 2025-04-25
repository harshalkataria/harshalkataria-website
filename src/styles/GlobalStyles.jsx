// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import { theme } from '../utils/configLoader';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    overflow-x: hidden;
    overflow-y: hidden; /* Prevent vertical scrolling on the main page */
    width: 100%;
    height: 100%;
  }

  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  /* Add styles for specific pages that should be scrollable */
  .scrollable-page {
    height: 100vh;
    overflow-y: auto;
    padding-top: 6rem; /* Account for the fixed header */
  }
  
  /* Ensure high z-index elements are visible */
  [style*="z-index: 50"], 
  [style*="z-index: 100"], 
  [style*="z-index: 1000"] {
    isolation: isolate;
  }
`;

export default GlobalStyles;