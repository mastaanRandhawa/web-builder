import express from 'express';
import { readData } from '../utils/database.js';
import { authenticate, requireRole } from '../utils/auth.js';

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const websites = await readData('websites.json');
    const invoices = await readData('invoices.json');
    const requests = await readData('changeRequests.json');
    const notifications = await readData('notifications.json');

    let userWebsites = websites;
    let userInvoices = invoices;
    let userRequests = requests;
    let userNotifications = notifications;

    if (req.user.role !== 'admin') {
      userWebsites = websites.filter(w => w.ownerId === req.user.id);
      userInvoices = invoices.filter(i => i.ownerId === req.user.id);
      userRequests = requests.filter(r => r.ownerId === req.user.id);
      userNotifications = notifications.filter(n => n.userId === req.user.id);
    }

    const stats = {
      totalWebsites: userWebsites.length,
      activeWebsites: userWebsites.filter(w => w.status === 'Active').length,
      pendingRequests: userRequests.filter(r => r.status === 'Pending').length,
      unpaidInvoices: userInvoices.filter(i => i.status !== 'Paid').length,
      unreadNotifications: userNotifications.filter(n => !n.read).length,
      totalRevenue: req.user.role === 'admin'
        ? invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.total, 0)
        : userInvoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.total, 0),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

