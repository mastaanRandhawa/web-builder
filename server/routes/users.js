import express from 'express';
import { readData } from '../utils/database.js';
import { authenticate, requireRole } from '../utils/auth.js';

const router = express.Router();

// Get all clients (admin only)
router.get('/', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const users = await readData('users.json');
    const clients = users
      .filter(u => u.role === 'client')
      .map(({ password, ...user }) => user);

    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const users = await readData('users.json');
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

