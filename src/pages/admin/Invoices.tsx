import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { invoicesApi, websitesApi } from '../../api/mockApi';
import { Invoice, InvoiceStatus, Website } from '../../types';
import { Card, Badge, Button, Modal, Input, Table, TableRow, TableCell, EmptyState } from '../../components/ui';
import { Plus, DollarSign, X } from 'lucide-react';

const statusVariantMap: Record<InvoiceStatus, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  [InvoiceStatus.DRAFT]: 'default',
  [InvoiceStatus.SENT]: 'warning',
  [InvoiceStatus.PAID]: 'success',
  [InvoiceStatus.OVERDUE]: 'danger',
};

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([{ description: '', quantity: 1, unitPrice: 0 }]);
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      try {
        const [invoicesData, websitesData] = await Promise.all([
          invoicesApi.getAll(token),
          websitesApi.getAll(token),
        ]);
        setInvoices(invoicesData);
        setWebsites(websitesData);
      } catch (error) {
        console.error('Failed to load invoices:', error);
      }
    };

    loadData();
  }, [token]);

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updated = [...invoiceItems];
    updated[index] = { ...updated[index], [field]: value };
    setInvoiceItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const handleCreateInvoice = async () => {
    if (!token || !selectedWebsiteId || !dueDate || invoiceItems.some(item => !item.description || item.unitPrice <= 0)) {
      return;
    }

    try {
      await invoicesApi.create(
        {
          websiteId: selectedWebsiteId,
          items: invoiceItems,
          dueDate,
        },
        token
      );
      const updated = await invoicesApi.getAll(token);
      setInvoices(updated);
      setShowCreateModal(false);
      setSelectedWebsiteId('');
      setDueDate('');
      setInvoiceItems([{ description: '', quantity: 1, unitPrice: 0 }]);
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  const handleMarkPaid = async (invoiceId: string) => {
    if (!token) return;

    try {
      await invoicesApi.update(
        invoiceId,
        { status: InvoiceStatus.PAID, paidAt: new Date().toISOString() },
        token
      );
      const updated = await invoicesApi.getAll(token);
      setInvoices(updated);
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Invoice Management</h1>
          <p className="text-zinc-600">Create and manage client invoices</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {invoices.length === 0 ? (
        <Card>
          <EmptyState
            icon={<DollarSign className="w-12 h-12 mx-auto text-zinc-400" />}
            title="No invoices found"
          />
        </Card>
      ) : (
        <Card>
          <Table headers={['Invoice ID', 'Website', 'Amount', 'Status', 'Due Date', 'Actions']}>
            {invoices.map((invoice) => {
              const website = websites.find(w => w.id === invoice.websiteId);
              return (
                <TableRow key={invoice.id}>
                  <TableCell>#{invoice.id.slice(-8)}</TableCell>
                  <TableCell>{website?.name || 'Unknown'}</TableCell>
                  <TableCell>${invoice.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[invoice.status]}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {invoice.status !== InvoiceStatus.PAID && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleMarkPaid(invoice.id)}
                      >
                        Mark Paid
                      </Button>
                    )}
                    {invoice.paidAt && (
                      <span className="text-xs text-zinc-500 ml-2">
                        Paid: {new Date(invoice.paidAt).toLocaleDateString()}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </Card>
      )}

      {/* Create Invoice Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedWebsiteId('');
          setDueDate('');
          setInvoiceItems([{ description: '', quantity: 1, unitPrice: 0 }]);
        }}
        title="Create Invoice"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Website <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedWebsiteId}
              onChange={(e) => setSelectedWebsiteId(e.target.value)}
              className="block w-full px-4 py-2.5 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">Select a website</option>
              {websites.map(w => (
                <option key={w.id} value={w.id}>{w.name} ({w.domain})</option>
              ))}
            </select>
          </div>
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">Invoice Items</label>
            {invoiceItems.map((item, index) => (
              <div key={index} className="mb-4 p-4 border border-zinc-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <Input
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Quantity"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      required
                    />
                    <Input
                      label="Unit Price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
                {invoiceItems.length > 1 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={handleAddItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setSelectedWebsiteId('');
                setDueDate('');
                setInvoiceItems([{ description: '', quantity: 1, unitPrice: 0 }]);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateInvoice}>
              Create Invoice
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
