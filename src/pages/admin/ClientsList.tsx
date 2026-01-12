import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { usersApi, websitesApi } from '../../api/mockApi';
import { User, Website } from '../../types';
import { Card, Table, TableRow, TableCell, Input, Badge, Skeleton } from '../../components/ui';
import { Search } from 'lucide-react';

export function ClientsList() {
  const [clients, setClients] = useState<User[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [clientsData, websitesData] = await Promise.all([
          usersApi.getAll(token),
          websitesApi.getAll(token),
        ]);
        setClients(clientsData);
        setWebsites(websitesData);
      } catch (error) {
        console.error('Failed to load clients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [token]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Clients</h1>
        <p className="text-zinc-600">Manage all client accounts</p>
      </div>

      <Card>
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredClients.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">No clients found.</div>
        ) : (
          <Table headers={['Name', 'Email', 'Websites', 'Joined', 'Actions']}>
            {filteredClients.map((client) => {
              const clientWebsites = websites.filter(w => w.ownerId === client.id);
              return (
                <TableRow
                  key={client.id}
                  onClick={() => navigate(`/app/admin/clients/${client.id}`)}
                >
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <Badge variant="default">{clientWebsites.length}</Badge>
                  </TableCell>
                  <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/admin/clients/${client.id}`);
                      }}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        )}
      </Card>
    </div>
  );
}

