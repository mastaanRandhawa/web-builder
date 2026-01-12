import express from 'express';
import { readData, writeData, generateId } from '../utils/database.js';
import { authenticate, requireRole } from '../utils/auth.js';

const router = express.Router();

// Get all websites
router.get('/', authenticate, async (req, res) => {
  try {
    const websites = await readData('websites.json');
    
    if (req.user.role === 'admin') {
      return res.json(websites);
    }

    const userWebsites = websites.filter(w => w.ownerId === req.user.id);
    res.json(userWebsites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get website by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const websites = await readData('websites.json');
    const website = websites.find(w => w.id === req.params.id);

    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }

    if (req.user.role !== 'admin' && website.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(website);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create website (admin only)
router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const { ownerId, name, domain, plan, status } = req.body;

    if (!ownerId || !name || !domain || !plan) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const websites = await readData('websites.json');
    const newWebsite = {
      id: generateId(),
      ownerId,
      name,
      domain,
      plan,
      status: status || 'Draft',
      lastUpdatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    websites.push(newWebsite);
    await writeData('websites.json', websites);

    res.status(201).json(newWebsite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update website
router.put('/:id', authenticate, async (req, res) => {
  try {
    const websites = await readData('websites.json');
    const websiteIndex = websites.findIndex(w => w.id === req.params.id);

    if (websiteIndex === -1) {
      return res.status(404).json({ error: 'Website not found' });
    }

    if (req.user.role !== 'admin' && websites[websiteIndex].ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { name, domain, plan, status } = req.body;
    if (name) websites[websiteIndex].name = name;
    if (domain) websites[websiteIndex].domain = domain;
    if (plan) websites[websiteIndex].plan = plan;
    if (status) websites[websiteIndex].status = status;
    websites[websiteIndex].lastUpdatedAt = new Date().toISOString();

    await writeData('websites.json', websites);

    res.json(websites[websiteIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

