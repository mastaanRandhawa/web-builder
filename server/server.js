import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import websitesRoutes from './routes/websites.js';
import changeRequestsRoutes from './routes/changeRequests.js';
import invoicesRoutes from './routes/invoices.js';
import uploadAssetsRoutes from './routes/uploadAssets.js';
import notificationsRoutes from './routes/notifications.js';
import activityLogsRoutes from './routes/activityLogs.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize data directory
const DATA_DIR = join(__dirname, 'data');
await fs.mkdir(DATA_DIR, { recursive: true });

// Initialize database files
const initDatabase = async () => {
  const files = {
    users: 'users.json',
    websites: 'websites.json',
    changeRequests: 'changeRequests.json',
    invoices: 'invoices.json',
    uploadAssets: 'uploadAssets.json',
    notifications: 'notifications.json',
    activityLogs: 'activityLogs.json',
  };

  for (const [key, file] of Object.entries(files)) {
    const filePath = join(DATA_DIR, file);
    try {
      await fs.access(filePath);
    } catch {
      // File doesn't exist, create with initial data
      const initialData = key === 'users' ? getInitialUsers() : [];
      await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));
    }
  }
};

const getInitialUsers = () => [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', // password: admin123
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    emailVerified: true,
  },
  {
    id: 'client-1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', // password: client123
    role: 'client',
    createdAt: '2024-01-15T00:00:00Z',
    emailVerified: true,
  },
  {
    id: 'client-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', // password: client123
    role: 'client',
    createdAt: '2024-02-01T00:00:00Z',
    emailVerified: true,
  },
];

await initDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/websites', websitesRoutes);
app.use('/api/change-requests', changeRequestsRoutes);
app.use('/api/invoices', invoicesRoutes);
app.use('/api/upload-assets', uploadAssetsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/activity-logs', activityLogsRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

