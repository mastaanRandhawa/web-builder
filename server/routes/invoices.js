import express from 'express';
import { readData, writeData, generateId } from '../utils/database.js';
import { authenticate, requireRole } from '../utils/auth.js';

const router = express.Router();

// Get all invoices
router.get('/', authenticate, async (req, res) => {
  try {
    const { websiteId } = req.query;
    let invoices = await readData('invoices.json');

    if (websiteId) {
      invoices = invoices.filter(i => i.websiteId === websiteId);
    }

    if (req.user.role === 'admin') {
      return res.json(invoices);
    }

    const userInvoices = invoices.filter(i => i.ownerId === req.user.id);
    res.json(userInvoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get invoice by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const invoices = await readData('invoices.json');
    const invoice = invoices.find(i => i.id === req.params.id);

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    if (req.user.role !== 'admin' && invoice.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create invoice (admin only)
router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const { websiteId, items, dueDate } = req.body;

    if (!websiteId || !items || !dueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const websites = await readData('websites.json');
    const website = websites.find(w => w.id === websiteId);

    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const total = subtotal;

    const invoices = await readData('invoices.json');
    const newInvoice = {
      id: generateId(),
      websiteId,
      ownerId: website.ownerId,
      items,
      subtotal,
      total,
      status: 'Sent',
      dueDate,
      createdAt: new Date().toISOString(),
    };

    invoices.push(newInvoice);
    await writeData('invoices.json', invoices);

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update invoice (admin only)
router.patch('/:id', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const invoices = await readData('invoices.json');
    const invoiceIndex = invoices.findIndex(i => i.id === req.params.id);

    if (invoiceIndex === -1) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    Object.assign(invoices[invoiceIndex], req.body);
    await writeData('invoices.json', invoices);

    res.json(invoices[invoiceIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pay invoice
router.post('/:id/pay', authenticate, async (req, res) => {
  try {
    const invoices = await readData('invoices.json');
    const invoiceIndex = invoices.findIndex(i => i.id === req.params.id);

    if (invoiceIndex === -1) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    if (req.user.role !== 'admin' && invoices[invoiceIndex].ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    invoices[invoiceIndex].status = 'Paid';
    invoices[invoiceIndex].paidAt = new Date().toISOString();

    await writeData('invoices.json', invoices);

    res.json(invoices[invoiceIndex]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

