// src/config/theme.js
// Theme configuration

export const theme = {
  colors: {
    primary: "#3498db",
    secondary: "#2ecc71",
    background: "#050505",
    text: "#ffffff",
    accent: "#e74c3c",
    groundColor: "#606060", // Color for the 3D ground plane
  },
  fonts: {
    main: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  breakpoints: {
    mobile: "576px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
    xl: "4rem",
  }
};
