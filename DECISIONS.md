# Technical Decisions

## Project

Car Browser Pro

## Framework

- React was chosen because it provides reusable components and efficient UI rendering.

## Build Tool

- Vite was selected for its fast development server and optimized production builds.

## Routing

- React Router DOM is used to navigate between pages without full page reloads.

## Data Source

- Static JSON data is used instead of an external API to simplify development and focus on React fundamentals.

## Component Structure

The application is divided into reusable components:

- Navbar
- Search Bar
- Filter
- Car Card
- Car List

This improves maintainability and readability.

## State Management

React Hooks (`useState`, `useEffect`) are sufficient for this project. No global state library was required.

## Styling

CSS modules / plain CSS are used to keep styling simple and lightweight.

## Future Improvements

- Connect to a real REST API
- Add pagination
- Add sorting
- Add favorites
- Authentication
- Responsive improvements
- Dark mode