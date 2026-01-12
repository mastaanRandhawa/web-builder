import express from 'express';
import { readData, writeData, generateId } from '../utils/database.js';
import { authenticate } from '../utils/auth.js';

const router = express.Router();

// Get user notifications
router.get('/', authenticate, async (req, res) => {
  try {
    const { unreadOnly } = req.query;
    const notifications = await readData('notifications.json');
    let userNotifications = notifications.filter(n => n.userId === req.user.id);

    if (unreadOnly === 'true') {
      userNotifications = userNotifications.filter(n => !n.read);
    }

    // Sort by createdAt descending
    userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(userNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticate, async (req, res) => {
  try {
    const notifications = await readData('notifications.json');
    const notificationIndex = notifications.findIndex(n => n.id === req.params.id);

    if (notificationIndex === -1) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    if (notifications[notificationIndex].userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    notifications[notificationIndex].read = true;
    notifications[notificationIndex].readAt = new Date().toISOString();

    await writeData('notifications.json', notifications);

    res.json(notifications[notificationIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark all as read
router.patch('/read-all', authenticate, async (req, res) => {
  try {
    const notifications = await readData('notifications.json');
    const now = new Date().toISOString();

    notifications.forEach(notification => {
      if (notification.userId === req.user.id && !notification.read) {
        notification.read = true;
        notification.readAt = now;
      }
    });

    await writeData('notifications.json', notifications);

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

