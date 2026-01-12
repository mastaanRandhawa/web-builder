import express from 'express';
import { readData, writeData, generateId } from '../utils/database.js';
import { authenticate } from '../utils/auth.js';

const router = express.Router();

// Get all assets for a website
router.get('/', authenticate, async (req, res) => {
  try {
    const { websiteId } = req.query;

    if (!websiteId) {
      return res.status(400).json({ error: 'websiteId is required' });
    }

    const websites = await readData('websites.json');
    const website = websites.find(w => w.id === websiteId);

    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }

    if (req.user.role !== 'admin' && website.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const assets = await readData('uploadAssets.json');
    const websiteAssets = assets.filter(a => a.websiteId === websiteId);

    res.json(websiteAssets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload asset
router.post('/', authenticate, async (req, res) => {
  try {
    const { websiteId, type, label, url } = req.body;

    if (!websiteId || !type || !label) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const websites = await readData('websites.json');
    const website = websites.find(w => w.id === websiteId);

    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }

    if (req.user.role !== 'admin' && website.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const assets = await readData('uploadAssets.json');
    const newAsset = {
      id: generateId(),
      websiteId,
      ownerId: req.user.id,
      type,
      label,
      url: url || `placeholder-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    assets.push(newAsset);
    await writeData('uploadAssets.json', assets);

    res.status(201).json(newAsset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

