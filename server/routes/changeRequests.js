import express from 'express';
import { readData, writeData, generateId } from '../utils/database.js';
import { authenticate, requireRole } from '../utils/auth.js';

const router = express.Router();

// Get all change requests
router.get('/', authenticate, async (req, res) => {
  try {
    const { websiteId } = req.query;
    let requests = await readData('changeRequests.json');

    if (websiteId) {
      requests = requests.filter(r => r.websiteId === websiteId);
    }

    if (req.user.role === 'admin') {
      return res.json(requests);
    }

    const userRequests = requests.filter(r => r.ownerId === req.user.id);
    res.json(userRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get request by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const requests = await readData('changeRequests.json');
    const request = requests.find(r => r.id === req.params.id);

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (req.user.role !== 'admin' && request.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create change request
router.post('/', authenticate, async (req, res) => {
  try {
    const { websiteId, title, description, attachments } = req.body;

    if (!websiteId || !title || !description) {
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

    const requests = await readData('changeRequests.json');
    const newRequest = {
      id: generateId(),
      websiteId,
      ownerId: req.user.id,
      title,
      description,
      attachments: attachments || [],
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    requests.push(newRequest);
    await writeData('changeRequests.json', requests);

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update change request (admin only)
router.patch('/:id', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const { status, adminComment } = req.body;
    const requests = await readData('changeRequests.json');
    const requestIndex = requests.findIndex(r => r.id === req.params.id);

    if (requestIndex === -1) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (status) requests[requestIndex].status = status;
    if (adminComment !== undefined) requests[requestIndex].adminComment = adminComment;
    requests[requestIndex].updatedAt = new Date().toISOString();

    await writeData('changeRequests.json', requests);

    res.json(requests[requestIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

