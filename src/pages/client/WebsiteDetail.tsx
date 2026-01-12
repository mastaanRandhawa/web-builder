import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { websitesApi, changeRequestsApi, invoicesApi, uploadAssetsApi } from '../../api/mockApi';
import { Website, ChangeRequest, Invoice, UploadAsset, InvoiceStatus, UploadType } from '../../types';
import { Card, Badge, Button, Tabs, Modal, Input, EmptyState, Skeleton } from '../../components/ui';
import { ArrowLeft, Plus, Upload, DollarSign, FileText, Image as ImageIcon } from 'lucide-react';

const statusVariantMap: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  Active: 'success',
  'In Review': 'info',
  'Needs Payment': 'warning',
  Paused: 'danger',
  Draft: 'default',
  Pending: 'info',
  Approved: 'success',
  Rejected: 'danger',
  Sent: 'warning',
  Paid: 'success',
  Overdue: 'danger',
};

export function WebsiteDetail() {
  const { websiteId } = useParams<{ websiteId: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [website, setWebsite] = useState<Website | null>(null);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [assets, setAssets] = useState<UploadAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [uploadLabel, setUploadLabel] = useState('');
  const [uploadType, setUploadType] = useState<UploadType>(UploadType.IMAGE);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  useEffect(() => {
    if (!token || !websiteId) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [websiteData, requestsData, invoicesData, assetsData] = await Promise.all([
          websitesApi.getById(websiteId, token),
          changeRequestsApi.getAll(token, websiteId),
          invoicesApi.getAll(token, websiteId),
          uploadAssetsApi.getAll(token, websiteId),
        ]);
        setWebsite(websiteData);
        setChangeRequests(requestsData);
        setInvoices(invoicesData);
        setAssets(assetsData);
        setError('');
      } catch (err: any) {
        setError(err.message || 'Failed to load website data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [websiteId, token]);

  const handleCreateRequest = async () => {
    if (!token || !websiteId || !requestTitle || !requestDescription) return;

    try {
      const newRequest = await changeRequestsApi.create(
        { websiteId, title: requestTitle, description: requestDescription },
        token
      );
      setChangeRequests([...changeRequests, newRequest]);
      setShowRequestModal(false);
      setRequestTitle('');
      setRequestDescription('');
    } catch (err: any) {
      setError(err.message || 'Failed to create request');
    }
  };

  const handleUpload = async () => {
    if (!token || !websiteId || !uploadLabel || !uploadFile) return;

    try {
      const newAsset = await uploadAssetsApi.create(websiteId, uploadType, uploadLabel, uploadFile, token);
      setAssets([...assets, newAsset]);
      setShowUploadModal(false);
      setUploadLabel('');
      setUploadFile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to upload asset');
    }
  };

  const handlePayInvoice = async (invoiceId: string) => {
    if (!token) return;

    try {
      await invoicesApi.pay(invoiceId, token);
      const updatedInvoices = await invoicesApi.getAll(token, websiteId);
      setInvoices(updatedInvoices);
    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
    }
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error && !website) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  if (!website) return null;

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/app/client')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Websites
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">{website.name}</h1>
            <p className="text-zinc-600">{website.domain}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={statusVariantMap[website.status] || 'default'}>
              {website.status}
            </Badge>
            <span className="text-sm text-zinc-500">{website.plan}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Tabs
        tabs={[
          {
            id: 'requests',
            label: 'Change Requests',
            content: (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-zinc-900">Change Requests</h2>
                  <Button onClick={() => setShowRequestModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                  </Button>
                </div>
                {changeRequests.length === 0 ? (
                  <Card>
                    <EmptyState
                      icon={<FileText className="w-12 h-12 mx-auto text-zinc-400" />}
                      title="No change requests yet"
                      description="Submit a change request to get started."
                    />
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {changeRequests.map((request) => (
                      <Card key={request.id}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-zinc-900">{request.title}</h3>
                              <Badge variant={statusVariantMap[request.status] || 'default'}>
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-zinc-600 mb-3">{request.description}</p>
                            {request.adminComment && (
                              <div className="p-3 bg-zinc-50 rounded-lg mb-3">
                                <p className="text-sm font-medium text-zinc-700 mb-1">Admin Comment:</p>
                                <p className="text-sm text-zinc-600">{request.adminComment}</p>
                              </div>
                            )}
                            <p className="text-xs text-zinc-500">
                              Created: {new Date(request.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            id: 'uploads',
            label: 'Uploads',
            content: (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-zinc-900">Uploaded Assets</h2>
                  <Button onClick={() => setShowUploadModal(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Asset
                  </Button>
                </div>
                {assets.length === 0 ? (
                  <Card>
                    <EmptyState
                      icon={<Upload className="w-12 h-12 mx-auto text-zinc-400" />}
                      title="No assets uploaded yet"
                      description="Upload images, text files, or other assets for your website."
                    />
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {assets.map((asset) => (
                      <Card key={asset.id}>
                        <div className="h-32 bg-zinc-100 rounded-lg mb-3 flex items-center justify-center">
                          {asset.type === UploadType.IMAGE ? (
                            <ImageIcon className="w-8 h-8 text-zinc-400" />
                          ) : (
                            <FileText className="w-8 h-8 text-zinc-400" />
                          )}
                        </div>
                        <h3 className="font-semibold text-zinc-900 mb-1">{asset.label}</h3>
                        <p className="text-xs text-zinc-500">
                          {asset.type} • {new Date(asset.createdAt).toLocaleDateString()}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            id: 'billing',
            label: 'Billing',
            content: (
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 mb-4">Invoices</h2>
                {invoices.length === 0 ? (
                  <Card>
                    <EmptyState
                      icon={<DollarSign className="w-12 h-12 mx-auto text-zinc-400" />}
                      title="No invoices yet"
                      description="Invoices will appear here when created."
                    />
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <Card key={invoice.id}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-zinc-900">
                                Invoice #{invoice.id.slice(-8)}
                              </h3>
                              <Badge variant={statusVariantMap[invoice.status] || 'default'}>
                                {invoice.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-zinc-600">
                              Due: {new Date(invoice.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-zinc-900">${invoice.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="border-t border-zinc-200 pt-4 mb-4">
                          <h4 className="font-medium text-zinc-900 mb-2">Items:</h4>
                          <ul className="space-y-1">
                            {invoice.items.map((item, idx) => (
                              <li key={idx} className="text-sm text-zinc-600">
                                {item.description} - ${item.unitPrice.toFixed(2)} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {invoice.status !== InvoiceStatus.PAID && (
                          <Button onClick={() => handlePayInvoice(invoice.id)} className="w-full">
                            Pay Invoice
                          </Button>
                        )}
                        {invoice.paidAt && (
                          <p className="text-sm text-zinc-500 mt-2">
                            Paid on: {new Date(invoice.paidAt).toLocaleDateString()}
                          </p>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />

      {/* Create Request Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Create Change Request"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={requestTitle}
            onChange={(e) => setRequestTitle(e.target.value)}
            required
            placeholder="e.g., Update homepage hero section"
          />
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={requestDescription}
              onChange={(e) => setRequestDescription(e.target.value)}
              required
              rows={4}
              className="block w-full px-4 py-2.5 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Describe the changes you'd like to make..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowRequestModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRequest} disabled={!requestTitle || !requestDescription}>
              Create Request
            </Button>
          </div>
        </div>
      </Modal>

      {/* Upload Asset Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Asset"
      >
        <div className="space-y-4">
          <Input
            label="Label"
            value={uploadLabel}
            onChange={(e) => setUploadLabel(e.target.value)}
            required
            placeholder="e.g., Hero Image"
          />
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={uploadType}
              onChange={(e) => setUploadType(e.target.value as UploadType)}
              className="block w-full px-4 py-2.5 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value={UploadType.IMAGE}>Image</option>
              <option value={UploadType.TEXT}>Text</option>
              <option value={UploadType.FILE}>File</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!uploadLabel || !uploadFile}>
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
