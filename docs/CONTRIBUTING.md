# Contributing to the Portfolio Website

Thank you for considering contributing to this project! This document outlines the process for contributing and guidelines to follow.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be kind and considerate in your interactions with others.

## Ways to Contribute

There are many ways you can contribute to this project:

1. **Reporting Bugs**: If you find a bug, please create an issue with a detailed description.
2. **Suggesting Enhancements**: Have ideas for improvements? Open an issue to discuss.
3. **Code Contributions**: Submit pull requests for bug fixes or new features.
4. **Documentation**: Help improve or create documentation.
5. **Testing**: Test the website on different devices and browsers and report issues.

## Getting Started

To set up the project locally:

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-website.git
   cd portfolio-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a new branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes, following the coding standards outlined below.

3. Test your changes thoroughly.

4. Commit your changes with a descriptive commit message:

   ```bash
   git commit -m "Add feature: description of the changes"
   ```

5. Push your branch to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a pull request to the main repository.

## Coding Standards

### JavaScript / React

- Use ES6+ syntax
- Follow the existing code style (indentation, spacing, etc.)
- Use meaningful variable and function names
- Add comments for complex logic
- Use React functional components and hooks

### Styling

- Use styled-components for component styling
- Follow the theme structure in `src/config/theme.js`
- Ensure responsive design that works on mobile devices

### 3D Development

- Optimize 3D models for web performance
- Document any new 3D components thoroughly
- Test 3D interactions on various devices

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate.
2. The PR should work on modern browsers and devices.
3. Describe what your changes do and why they should be included.
4. Reference any relevant issues in your PR description.
5. Wait for review and address any requested changes.

## Project Structure

Please familiarize yourself with the project structure before contributing:

```
src/
├── assets/           # Static assets
├── components/       # Reusable components
│   ├── 3d/           # Three.js components
│   └── ...           # Other component categories
├── config/           # Configuration files
├── hooks/            # Custom React hooks
├── pages/            # Page components
└── styles/           # Global styles
```

## Questions?

If you have any questions about contributing, please open an issue for discussion.

Thank you for your contributions!
