import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { usersApi, websitesApi, invoicesApi, changeRequestsApi } from '../../api/mockApi';
import { User, Website, Invoice, ChangeRequest } from '../../types';
import { Card, Badge, Tabs, Button, EmptyState } from '../../components/ui';
import { ArrowLeft, Globe, DollarSign, FileText } from 'lucide-react';

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

export function ClientDetail() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [client, setClient] = useState<User | null>(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [requests, setRequests] = useState<ChangeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token || !clientId) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [clientData, websitesData, invoicesData, requestsData] = await Promise.all([
          usersApi.getById(clientId, token),
          websitesApi.getAll(token),
          invoicesApi.getAll(token),
          changeRequestsApi.getAll(token),
        ]);
        setClient(clientData);
        setWebsites(websitesData.filter(w => w.ownerId === clientId));
        setInvoices(invoicesData.filter(i => i.ownerId === clientId));
        setRequests(requestsData.filter(r => r.ownerId === clientId));
      } catch (error) {
        console.error('Failed to load client data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [clientId, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/app/admin/clients')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clients
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">{client.name}</h1>
        <p className="text-zinc-600">{client.email}</p>
        <p className="text-sm text-zinc-500 mt-1">
          Joined: {new Date(client.createdAt).toLocaleDateString()}
        </p>
      </div>

      <Tabs
        tabs={[
          {
            id: 'websites',
            label: 'Websites',
            content: (
              <div>
                {websites.length === 0 ? (
                  <Card>
                    <EmptyState
                      icon={<Globe className="w-12 h-12 mx-auto text-zinc-400" />}
                      title="No websites found"
                    />
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {websites.map((website) => (
                      <Card key={website.id} hover>
                        <h3 className="text-lg font-semibold text-zinc-900 mb-1">{website.name}</h3>
                        <p className="text-sm text-zinc-600 mb-3">{website.domain}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={statusVariantMap[website.status] || 'default'}>
                            {website.status}
                          </Badge>
                          <span className="text-xs text-zinc-500">{website.plan}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            id: 'invoices',
            label: 'Invoices',
            content: (
              <div>
                {invoices.length === 0 ? (
                  <Card>
                    <EmptyState
                      icon={<DollarSign className="w-12 h-12 mx-auto text-zinc-400" />}
                      title="No invoices found"
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
                        <div className="border-t border-zinc-200 pt-4">
                          <h4 className="font-medium text-zinc-900 mb-2">Items:</h4>
                          <ul className="space-y-1">
                            {invoice.items.map((item, idx) => (
                              <li key={idx} className="text-sm text-zinc-600">
                                {item.description} - ${item.unitPrice.toFixed(2)} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            id: 'requests',
            label: 'Change Requests',
            content: (
              <div>
                {requests.length === 0 ? (
                  <Card>
                    <EmptyState
                      icon={<FileText className="w-12 h-12 mx-auto text-zinc-400" />}
                      title="No change requests found"
                    />
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
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
        ]}
      />
    </div>
  );
}
