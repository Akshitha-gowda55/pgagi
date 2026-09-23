Personalized Content Dashboard

A modern, responsive content dashboard built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS. It brings together personalized news, movies, 
and social content in a single interface, with features such as search, favorites, drag-and-drop feed organization, dark mode, pagination, and persistent
user preference

# Technical Components

## Tech Stack

### Frontend
- **Next.js 16** – React framework using the App Router
- **React** – Component-based UI development
- **TypeScript** – Static typing and type safety
- **Tailwind CSS** – Utility-first responsive styling
- **Lucide React** – UI icons
- **Framer Motion** – UI animations and transitions
- **dnd-kit** – Drag-and-drop feed organization

### State Management
- **Redux Toolkit** – Global application state management
- **RTK Query** – API fetching, caching, and request state management
- **Redux slices** for:
  - Favorites
  - Feed ordering
  - User preferences
  - Search
  - Theme

### API & Backend
- **Next.js Route Handlers** – Server-side API endpoints
- **NewsAPI** – News data integration
- **TMDB API** – Movie data and recommendations
- **Mock Social API/Data** – Social media feed simulation

### API Routes

```text
/api/news
/api/movies
/api/social

Architecture:

React Components
       ↓
Redux Toolkit / RTK Query
       ↓
Next.js API Routes
       ↓
External APIs / Mock Data

API credentials are accessed server-side through environment variables.

Application Architecture
src/
├── app/
│   ├── api/
│   │   ├── movies/
│   │   ├── news/
│   │   └── social/
│   ├── favourites/
│   ├── settings/
│   ├── trending/
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
│
├── components/
│   ├── content/
│   ├── feed/
│   └── layout/
│
├── features/
│   ├── favorites/
│   ├── feed/
│   ├── preferences/
│   ├── search/
│   └── theme/
│
├── hooks/
├── lib/
├── services/
│   ├── api/
│   └── social/
├── store/
├── test/
└── types/
Core Technical Features
Personalized Content
Category-based user preferences
Personalized news queries
Personalized movie recommendations
TMDB genre mapping
Dynamic feed composition
Search
Global search state using Redux Toolkit
Debounced search using a custom useDebounce hook
News and movie search integration
Feed Management
Unified content model
Separate News, Movies, and Social content sections
Drag-and-drop feed organization
Persistent feed ordering
Pagination / Load More functionality
Favorites
Redux-based favorite state
Favorite button component
Persistent favorites using browser local storage
Dedicated Favorites page
Theme
Light and dark modes
Redux theme state
Persistent theme preference
Responsive theme-aware UI
Responsive UI
Desktop sidebar navigation
Responsive header
Mobile navigation menu
Responsive content grids
Mobile-friendly cards and controls
UI States
Loading skeletons
API error states
Empty states
Search empty states
Loading and error handling for API requests
Data & State Flow
User Interaction
       ↓
React Component
       ↓
Redux Action / RTK Query
       ↓
Next.js API Route
       ↓
External API
       ↓
API Response
       ↓
RTK Query Cache / Redux State
       ↓
React UI
Persistence

Browser localStorage is used to persist client-side user state.

Persisted state includes:

Favorites
User preferences
Feed ordering
Theme preference
Testing
Vitest

Used for unit and component testing.

Tested areas include:

Redux slices
API services
React components
Custom hooks
Settings functionality
React Testing Library

Used for testing React component behavior and user interactions.

Playwright

Used for end-to-end browser testing.

E2E coverage includes:

Dashboard
Navigation
Search
Settings
User interactions
Development Tools
Git – Version control
GitHub – Source code repository
VS Code / Cursor – Development environment
Postman – API testing
ESLint – Code quality and linting
Vercel – Production deployment
Environment Configuration

Required environment variables:

NEWS_API_KEY=your_newsapi_key
TMDB_API_KEY=your_tmdb_api_key

Environment variables are stored locally in:

.env.local

.env.local is excluded from Git using .gitignore.

Available Scripts
npm run dev

Starts the Next.js development server.

npm run build

Creates the production build.

npm start

Starts the production server.

npm run lint

Runs ESLint.

npm test -- --run

Runs Vitest tests.

npm run test:watch

Runs Vitest in watch mode.

npm run test:e2e

Runs Playwright end-to-end tests.

Production Deployment

The application is deployed using Vercel.

GitHub
   ↓
Vercel
   ↓
Next.js Production Build
   ↓
Serverless API Routes
   ↓
NewsAPI / TMDB

Production environment variables are configured through Vercel Environment Variables.

Technical Highlights
Next.js App Router architecture
TypeScript-first development
Redux Toolkit state management
RTK Query API caching
Server-side API key handling
Personalized content aggregation
Debounced search
Persistent client-side state
Drag-and-drop feed organization
Responsive UI architecture
Component-based design
Automated unit/component/API testing
Playwright E2E testing
Production deployment with Vercel
