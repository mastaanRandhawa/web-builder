import express from 'express';
import { readData } from '../utils/database.js';
import { authenticate, requireRole } from '../utils/auth.js';

const router = express.Router();

// Get activity logs
router.get('/', authenticate, async (req, res) => {
  try {
    const { userId, websiteId, limit = 50 } = req.query;
    const logs = await readData('activityLogs.json');
    let filteredLogs = logs;

    if (req.user.role === 'admin') {
      if (userId) {
        filteredLogs = filteredLogs.filter(l => l.userId === userId);
      }
    } else {
      filteredLogs = filteredLogs.filter(l => l.userId === req.user.id);
    }

    if (websiteId) {
      filteredLogs = filteredLogs.filter(l => l.websiteId === websiteId);
    }

    // Sort by createdAt descending and limit
    filteredLogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    filteredLogs = filteredLogs.slice(0, parseInt(limit));

    res.json(filteredLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

