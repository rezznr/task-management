# Task Management & E-commerce Application

A comprehensive React application with task management and e-commerce features, built with React, TypeScript, and Vite.

## Features

### Task Management
- Create, delete, and mark tasks as complete/incomplete
- Separate views for completed and pending tasks
- Task categorization and filtering

### E-commerce Functionality
- Browse product listings with search and filter options
- View detailed product information
- Add/remove products from shopping cart
- Cart management (update quantity, remove items)

### Core Technical Features
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Authentication**: Secure login and registration system
- **Error Handling**: User-friendly error messages and fallbacks
- **Reusable Components**: Modular UI components for consistent user experience

## Technology Stack

- **Frontend Framework**: React.js
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS/SASS/Styled Components
- **Routing**: React Router
- **State Management**: React Context API
- **Authentication**: Firebase Authentication

## Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd task-management
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration values (API endpoints, authentication keys, etc.)

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Configuration

Create a `.env` file in the project root based on the `.env.example` template with your specific values.

## Build for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
task-management/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React contexts for state management
│   ├── data/             # Dummy Data
│   ├── pages/            # Page components
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # Vite environment declarations
├── .env.example          # Example environment variables
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```