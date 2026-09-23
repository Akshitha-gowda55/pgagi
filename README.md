# Personalized Content Dashboard

A modern, responsive, and personalized content dashboard built as part of the **PGAGI Software Development Engineer (SDE) Intern – Frontend Development Assignment**.

The application brings together content from multiple sources, including **news, movies, and social posts**, into a unified personalized dashboard. Users can customize their interests, search content, manage favorites, reorder their feed, switch themes, and maintain their preferences across sessions.

---

## Live Demo

**Production URL:**  
https://pgagi-one.vercel.app/

---

## GitHub Repository

**Repository:**  
https://github.com/Akshitha-gowda55/pgagi

---

## Project Overview

The Personalized Content Dashboard is designed to provide users with a single interface for discovering and interacting with different types of content.

The dashboard combines:

- Personalized news
- Movie recommendations
- Social content
- Trending content
- Search
- Favorites
- User preferences
- Drag-and-drop feed organization
- Dark/light theme
- Persistent user state

The application uses a modern frontend architecture with **Next.js, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS, Framer Motion, and dnd-kit**.

---

# Features

## 1. Personalized Content Feed

The dashboard displays content based on the user's selected interests.

Supported categories include:

- Technology
- Business
- Sports
- Entertainment
- Science
- Health
- Finance
- Travel

Users can modify their interests from the Settings page.

---

## 2. News Feed

News content is retrieved through the NewsAPI integration.

Features include:

- Personalized categories
- Search
- Pagination
- Loading states
- Error handling
- Empty states
- Responsive news cards
- Favorite functionality

---

## 3. Movie Recommendations

Movie content is retrieved through the TMDB API.

Features include:

- Personalized movie recommendations
- Movie search
- Genre-based recommendations
- Popularity-based discovery
- Pagination
- Favorite functionality
- Loading and error states

---

## 4. Social Feed

The application includes mock social content to demonstrate a multi-source content dashboard.

Social content includes:

- User posts
- Profile information
- Engagement information
- Interactive actions
- Responsive social cards

---

## 5. Search

The dashboard provides a global search interface.

Features:

- Search news
- Search movies
- Debounced search
- Search state managed using Redux
- Clear search functionality
- Search loading states
- Empty search states

A debounce mechanism is used to prevent unnecessary API requests while the user is typing.

---

## 6. Favorites

Users can favorite content from the dashboard.

Favorites are supported for different content types.

Favorite state is persisted using browser local storage so that favorites remain available after refreshing the application.

---

## 7. Drag and Drop Feed Organization

Users can reorganize their feed using drag and drop.

The application uses **dnd-kit** for drag-and-drop functionality.

The customized feed order is persisted so that the user's organization is maintained between sessions.

---

## 8. User Preferences

Users can customize their content preferences through the Settings page.

Preferences include:

- Content categories
- Content types
- Theme preferences
- Personalized feed configuration

---

## 9. Persistent User State

Important user state is persisted using browser local storage.

Persisted information includes:

- User preferences
- Favorites
- Theme preference
- Feed ordering

This allows the application to maintain the user's experience after page refreshes and new sessions.

---

## 10. Dark Mode

The application supports:

- Light mode
- Dark mode

Users can switch themes from the application header.

Theme preference is persisted across sessions.

---

## 11. Trending Content

The Trending page provides a dedicated view for discovering popular content.

It combines available content from the application's supported sources.

---

## 12. Responsive Design

The dashboard is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The layout includes:

- Responsive sidebar
- Mobile navigation
- Responsive content cards
- Responsive grids
- Mobile-friendly controls

---

## 13. Loading States

The application provides skeleton loading states while content is being fetched.

This helps prevent abrupt layout changes and improves the user experience during API requests.

---

## 14. Error Handling

The application includes error handling for API failures.

Users receive appropriate error states with retry functionality where applicable.

---

## 15. Empty States

The application handles situations where no content is available.

Examples include:

- No search results
- No favorites
- No content for selected filters
- Empty API responses

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | User interface development |
| TypeScript | Static typing |
| Tailwind CSS | Styling and responsive design |
| Lucide React | Icons |
| Framer Motion | Animations |

---

## State Management

| Technology | Purpose |
|---|---|
| Redux Toolkit | Global application state |
| React Redux | React/Redux integration |
| RTK Query | API fetching, caching, and request state |

---

## APIs

| API | Purpose |
|---|---|
| NewsAPI | News content |
| TMDB API | Movie content |
| Mock Social API | Social content |

---

## Interaction

| Technology | Purpose |
|---|---|
| dnd-kit | Drag-and-drop feed organization |
| Debounce Hook | Optimized search requests |

---

## Theming

| Technology | Purpose |
|---|---|
| next-themes | Theme management |
| Tailwind CSS | Theme-aware styling |

---

## Testing

| Technology | Purpose |
|---|---|
| Vitest | Unit testing |
| React Testing Library | Component and integration testing |
| Playwright | End-to-end testing |

---

## Development Tools

| Tool | Purpose |
|---|---|
| ESLint | Code quality |
| Git | Version control |
| GitHub | Source control and repository |
| Vercel | Deployment |

---

# Application Architecture

The application follows a feature-oriented frontend architecture.

```text
User Interface
      |
      v
Next.js App Router
      |
      +----------------------+
      |                      |
      v                      v
React Components       Application Pages
      |                      |
      +----------+-----------+
                 |
                 v
          Redux Toolkit
                 |
        +--------+--------+
        |                 |
        v                 v
   Application State   RTK Query
        |                 |
        |                 v
        |           API Endpoints
        |                 |
        |       +---------+---------+
        |       |         |         |
        v       v         v         v
     NewsAPI   TMDB   Social API  Other Data
        |
        v
   Persistent State
        |
        v
    localStorage
