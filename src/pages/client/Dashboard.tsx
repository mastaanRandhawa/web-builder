import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { websitesApi } from '../../api/mockApi';
import { Website, WebsiteStatus } from '../../types';
import { Card, Badge, Skeleton, EmptyState } from '../../components/ui';
import { Globe } from 'lucide-react';

const statusVariantMap: Record<WebsiteStatus, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  [WebsiteStatus.ACTIVE]: 'success',
  [WebsiteStatus.IN_REVIEW]: 'info',
  [WebsiteStatus.NEEDS_PAYMENT]: 'warning',
  [WebsiteStatus.PAUSED]: 'danger',
  [WebsiteStatus.DRAFT]: 'default',
};

export function ClientDashboard() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const loadWebsites = async () => {
      try {
        setIsLoading(true);
        const data = await websitesApi.getAll(token);
        setWebsites(data);
        setError('');
      } catch (err: any) {
        setError(err.message || 'Failed to load websites');
      } finally {
        setIsLoading(false);
      }
    };

    loadWebsites();
  }, [token]);

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">My Websites</h1>
          <p className="text-zinc-600">Manage your websites and view their status</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Skeleton className="h-32 mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">My Websites</h1>
        <p className="text-zinc-600">Manage your websites and view their status</p>
      </div>

      {websites.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Globe className="w-12 h-12 mx-auto text-zinc-400" />}
            title="No websites yet"
            description="Get started by creating your first website."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <Card
              key={website.id}
              hover
              onClick={() => navigate(`/app/client/websites/${website.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">{website.name}</h3>
                    <p className="text-sm text-zinc-600">{website.domain}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                <Badge variant={statusVariantMap[website.status]}>
                  {website.status}
                </Badge>
                <span className="text-sm text-zinc-500">{website.plan}</span>
              </div>
              <p className="text-xs text-zinc-500 mt-3">
                Last updated: {new Date(website.lastUpdatedAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
