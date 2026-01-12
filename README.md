# Randhawa & Tomar Digital - Client & Admin Portal

A professional SaaS web application for managing client websites, change requests, and invoices/payments. Built with React, TypeScript, Tailwind CSS, and Node.js/Express backend.

## Features

- **Role-based Authentication**: Separate interfaces for clients and admins with JWT tokens
- **Client Dashboard**: View websites, submit change requests, upload assets, and manage billing
- **Admin Dashboard**: Manage clients, review change requests, create invoices, and track payments
- **Professional Marketing Pages**: Landing page and pricing page with Randhawa & Tomar Digital branding
- **Real Backend API**: Node.js/Express server with localStorage persistence
- **Protected Routes**: Secure route guards based on authentication and roles

## Tech Stack

### Frontend
- React 18 + TypeScript
- React Router v6 with nested routes
- Zustand for state management
- Tailwind CSS for styling
- Vite for building

### Backend
- Node.js + Express
- JWT authentication
- bcryptjs for password hashing
- localStorage persistence (easily replaceable with real DB)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Set up environment variables (optional):
```bash
cd server
cp .env.example .env
# Edit .env and set your JWT_SECRET
```

### Running the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev:all
```

#### Option 2: Run separately

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
cd server
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3001`

## Test Credentials

### Admin User
- **Email**: `admin@rt.digital`
- **Password**: `Password123!`

### Client Users
- **Email**: `client1@rt.digital`
- **Password**: `Password123!`

- **Email**: `client2@rt.digital`
- **Password**: `Password123!`

## Route Map

### Public Routes
- `/` - Landing page (Randhawa & Tomar Digital branding)
- `/pricing` - Pricing page with feature matrix
- `/login` - Login page
- `/signup` - Signup page

### App Routes (Protected)
- `/app` - Redirects to `/app/client` or `/app/admin` based on role

### Client Routes (Protected)
- `/app/client` - Client dashboard (websites list)
- `/app/client/websites/:websiteId` - Website detail with tabs:
  - Change Requests (submit new + list history)
  - Uploads (upload assets + list)
  - Billing (invoices list + pay button)

### Admin Routes (Protected, Admin only)
- `/app/admin` - Admin dashboard (overview stats)
- `/app/admin/clients` - Clients list with search
- `/app/admin/clients/:clientId` - Client detail (websites, invoices, requests)
- `/app/admin/requests` - Change requests queue (approve/reject)
- `/app/admin/invoices` - Invoice management (create, list, mark paid)

### 404
- `*` - Not found page with link back home

## Project Structure

```
web-builder/
├── src/                    # Frontend source
│   ├── api/               # Mock API services
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── layouts/      # Layout components
│   │   └── ProtectedRoute.tsx
│   ├── pages/            # Page components
│   │   ├── client/       # Client dashboard pages
│   │   ├── admin/        # Admin dashboard pages
│   │   └── ...           # Public pages
│   ├── store/            # Zustand stores
│   └── types/            # TypeScript types
├── server/               # Backend source
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── data/             # JSON database files (auto-created)
└── ...
```

## Key Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Persistent login via localStorage
- Role-based access control

### Client Features
- View owned websites with status badges
- Submit change requests with descriptions
- Upload assets (images, text, files)
- View and pay invoices
- Track billing history

### Admin Features
- View all clients and their websites
- Review and approve/reject change requests with comments
- Create and manage invoices
- Mark payments as completed
- Track payment status
- View dashboard statistics

### Public Pages
- Professional landing page with Randhawa & Tomar Digital branding
- Detailed pricing page with feature comparison matrix
- Add-ons pricing table
- Clear explanation of tier differences

## Data Persistence

- Data is stored in localStorage (browser storage)
- Seeded data is automatically initialized on first load
- All CRUD operations persist to localStorage
- Data persists across page refreshes
- To reset data, clear browser localStorage

## Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Notes

- The backend uses localStorage for data persistence (easily replaceable with MongoDB, PostgreSQL, etc.)
- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- All API endpoints require authentication except signup/login
- CORS is enabled for development
- The frontend proxies API requests to the backend during development
- Mock file uploads store metadata only (no actual file storage)

## License

MIT
