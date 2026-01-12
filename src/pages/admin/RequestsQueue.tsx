import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { changeRequestsApi } from '../../api/mockApi';
import { ChangeRequest, RequestStatus } from '../../types';
import { Card, Badge, Button, Modal, EmptyState } from '../../components/ui';
import { CheckSquare } from 'lucide-react';

const statusVariantMap: Record<RequestStatus, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  [RequestStatus.PENDING]: 'info',
  [RequestStatus.APPROVED]: 'success',
  [RequestStatus.REJECTED]: 'danger',
};

export function RequestsQueue() {
  const [requests, setRequests] = useState<ChangeRequest[]>([]);
  const [filter, setFilter] = useState<RequestStatus | 'all'>('all');
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState<RequestStatus>(RequestStatus.PENDING);
  const [adminComment, setAdminComment] = useState('');
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    const loadRequests = async () => {
      try {
        const data = await changeRequestsApi.getAll(token);
        setRequests(data);
      } catch (error) {
        console.error('Failed to load requests:', error);
      }
    };

    loadRequests();
  }, [token]);

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(r => r.status === filter);

  const handleOpenModal = (request: ChangeRequest) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
    setAdminComment(request.adminComment || '');
    setShowModal(true);
  };

  const handleUpdateRequest = async () => {
    if (!token || !selectedRequest) return;

    try {
      await changeRequestsApi.update(
        selectedRequest.id,
        { status: newStatus, adminComment: adminComment || undefined },
        token
      );
      const updated = await changeRequestsApi.getAll(token);
      setRequests(updated);
      setShowModal(false);
      setSelectedRequest(null);
      setAdminComment('');
    } catch (error) {
      console.error('Failed to update request:', error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Change Requests Queue</h1>
        <p className="text-zinc-600">Review and manage change requests from clients</p>
      </div>

      <div className="mb-6 flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All ({requests.length})
        </Button>
        <Button
          variant={filter === RequestStatus.PENDING ? 'primary' : 'outline'}
          onClick={() => setFilter(RequestStatus.PENDING)}
        >
          Pending ({requests.filter(r => r.status === RequestStatus.PENDING).length})
        </Button>
        <Button
          variant={filter === RequestStatus.APPROVED ? 'primary' : 'outline'}
          onClick={() => setFilter(RequestStatus.APPROVED)}
        >
          Approved ({requests.filter(r => r.status === RequestStatus.APPROVED).length})
        </Button>
        <Button
          variant={filter === RequestStatus.REJECTED ? 'primary' : 'outline'}
          onClick={() => setFilter(RequestStatus.REJECTED)}
        >
          Rejected ({requests.filter(r => r.status === RequestStatus.REJECTED).length})
        </Button>
      </div>

      {filteredRequests.length === 0 ? (
        <Card>
          <EmptyState
            icon={<CheckSquare className="w-12 h-12 mx-auto text-zinc-400" />}
            title="No requests found"
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-zinc-900">{request.title}</h3>
                    <Badge variant={statusVariantMap[request.status]}>
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-zinc-600 mb-3">{request.description}</p>
                  {request.attachments.length > 0 && (
                    <p className="text-sm text-zinc-500 mb-3">
                      Attachments: {request.attachments.join(', ')}
                    </p>
                  )}
                  {request.adminComment && (
                    <div className="p-3 bg-zinc-50 rounded-lg mb-3">
                      <p className="text-sm font-medium text-zinc-700 mb-1">Admin Comment:</p>
                      <p className="text-sm text-zinc-600">{request.adminComment}</p>
                    </div>
                  )}
                  <p className="text-xs text-zinc-500">
                    Request ID: {request.id.slice(-8)} • Created: {new Date(request.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button onClick={() => handleOpenModal(request)}>
                  Review
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedRequest(null);
          setAdminComment('');
        }}
        title="Review Change Request"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-zinc-900 mb-1">{selectedRequest.title}</h3>
              <p className="text-zinc-600">{selectedRequest.description}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as RequestStatus)}
                className="block w-full px-4 py-2.5 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                <option value={RequestStatus.PENDING}>Pending</option>
                <option value={RequestStatus.APPROVED}>Approved</option>
                <option value={RequestStatus.REJECTED}>Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                Admin Comment
              </label>
              <textarea
                value={adminComment}
                onChange={(e) => setAdminComment(e.target.value)}
                rows={4}
                className="block w-full px-4 py-2.5 border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Add a comment for the client..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setSelectedRequest(null);
                  setAdminComment('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateRequest}>
                Update Request
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
