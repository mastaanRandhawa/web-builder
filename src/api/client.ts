const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private getToken(): string | null {
    const auth = localStorage.getItem('auth-storage');
    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        return parsed.state?.token || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['x-auth-token'] = token;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async signup(name: string, email: string, password: string, role = 'client') {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async updateProfile(name?: string, email?: string) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, email }),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Users
  async getUsers() {
    return this.request('/users');
  }

  async getUserById(id: string) {
    return this.request(`/users/${id}`);
  }

  // Websites
  async getWebsites() {
    return this.request('/websites');
  }

  async getWebsiteById(id: string) {
    return this.request(`/websites/${id}`);
  }

  async createWebsite(data: any) {
    return this.request('/websites', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateWebsite(id: string, data: any) {
    return this.request(`/websites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Change Requests
  async getChangeRequests(websiteId?: string) {
    const query = websiteId ? `?websiteId=${websiteId}` : '';
    return this.request(`/change-requests${query}`);
  }

  async getChangeRequestById(id: string) {
    return this.request(`/change-requests/${id}`);
  }

  async createChangeRequest(data: any) {
    return this.request('/change-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateChangeRequest(id: string, data: any) {
    return this.request(`/change-requests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Invoices
  async getInvoices(websiteId?: string) {
    const query = websiteId ? `?websiteId=${websiteId}` : '';
    return this.request(`/invoices${query}`);
  }

  async getInvoiceById(id: string) {
    return this.request(`/invoices/${id}`);
  }

  async createInvoice(data: any) {
    return this.request('/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInvoice(id: string, data: any) {
    return this.request(`/invoices/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async payInvoice(id: string) {
    return this.request(`/invoices/${id}/pay`, {
      method: 'POST',
    });
  }

  // Upload Assets
  async getUploadAssets(websiteId: string) {
    return this.request(`/upload-assets?websiteId=${websiteId}`);
  }

  async uploadAsset(data: any) {
    return this.request('/upload-assets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Notifications
  async getNotifications(unreadOnly = false) {
    const query = unreadOnly ? '?unreadOnly=true' : '';
    return this.request(`/notifications${query}`);
  }

  async markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsRead() {
    return this.request('/notifications/read-all', {
      method: 'PATCH',
    });
  }

  // Activity Logs
  async getActivityLogs(userId?: string, websiteId?: string, limit = 50) {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (websiteId) params.append('websiteId', websiteId);
    params.append('limit', limit.toString());
    return this.request(`/activity-logs?${params.toString()}`);
  }

  // Analytics
  async getDashboardAnalytics() {
    return this.request('/analytics/dashboard');
  }
}

export const apiClient = new ApiClient();

