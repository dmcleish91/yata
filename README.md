# Yata (Yet Another Todo App)

## Overview

A simple Todo application built with React and TypeScript. This project provides a frontend for a todo application, allowing users to manage their tasks. It connects to a backend service for data management and uses Supabase for JWT-based authentication.

## Getting Started

### Prerequisites

- **Node.js**: Version 20 or newer
- **pnpm**: ([Installation Guide](https://pnpm.io/installation))
- **Supabase Account**: For authentication and API keys. ([Supabase](https://supabase.com))

### Setup

1.  **Clone the repository**

    ```bash
    git clone <your-repository-url>
    cd yata
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Setup environment variables**

    Create a `.env` file in the root directory of the project. You can copy the example below and fill in your details.

    ```env
    # .env file

    # Base URL for the application
    VITE_BASEURL=http://localhost:5173

    # Supabase Configuration
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

### Running the Development Server

To run the application in development mode:

```bash
pnpm dev
```

The application should now be available at: `http://localhost:5173`

### Building for Production

To build the application for production:

```bash
pnpm build
```

The production-ready files will be in the `dist/` directory.

## Folder Structure

```text
.
├── app/                  # Main application source code
│   ├── components/       # Reusable components
│   ├── hooks/            # Custom React hooks
│   ├── libs/             # Libraries and helper functions
│   ├── routes/           # Application routes
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── src/                  # Additional source files
│   └── config/           # Environment configuration
├── package.json          # Project metadata and dependencies
├── pnpm-lock.yaml        # Pnpm lock file
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Future Features / TODO

- [ ] Add a comprehensive test suite (unit and integration tests).
- [ ] Implement Storybook for component development and documentation.
- [ ] Enhance input validation across forms.
- [ ] Implement optimistic UI updates for a smoother user experience.
- [ ] Refactor state management for better scalability.
