import {
  User,
  UserRole,
  Website,
  ChangeRequest,
  Invoice,
  UploadAsset,
  AuthResponse,
  RequestStatus,
  InvoiceStatus,
  UploadType,
} from '../types';
import {
  mockUsers,
  mockWebsites,
  mockChangeRequests,
  mockInvoices,
  mockUploadAssets,
} from './mockData';

// In-memory storage with localStorage persistence
const STORAGE_KEYS = {
  users: 'rt-digital-users',
  websites: 'rt-digital-websites',
  changeRequests: 'rt-digital-change-requests',
  invoices: 'rt-digital-invoices',
  uploadAssets: 'rt-digital-upload-assets',
};

const loadFromStorage = <T>(key: string, defaultValue: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return defaultValue;
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
};

// Initialize storage with seeded data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    saveToStorage(STORAGE_KEYS.users, mockUsers);
    saveToStorage(STORAGE_KEYS.websites, mockWebsites);
    saveToStorage(STORAGE_KEYS.changeRequests, mockChangeRequests);
    saveToStorage(STORAGE_KEYS.invoices, mockInvoices);
    saveToStorage(STORAGE_KEYS.uploadAssets, mockUploadAssets);
  }
};

initializeStorage();

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  async signup(name: string, email: string, _password: string, role: UserRole = UserRole.CLIENT): Promise<AuthResponse> {
    await delay(500);
    
    const users = loadFromStorage<User>(STORAGE_KEYS.users, mockUsers);
    
    if (users.find(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveToStorage(STORAGE_KEYS.users, users);
    
    const token = `token-${newUser.id}-${Date.now()}`;
    return { user: newUser, token };
  },

  async login(email: string, _password: string): Promise<AuthResponse> {
    await delay(500);

    const users = loadFromStorage<User>(STORAGE_KEYS.users, mockUsers);
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // In real app, verify password here
    const token = `token-${user.id}-${Date.now()}`;
    return { user, token };
  },

  async getMe(token: string): Promise<User> {
    await delay(300);
    const userId = token.split('-')[1];
    const users = loadFromStorage<User>(STORAGE_KEYS.users, mockUsers);
    const user = users.find(u => u.id === userId);

    if (!user) {
      throw new Error('Invalid token');
    }

    return user;
  },
};

// Websites API
export const websitesApi = {
  async getAll(token: string): Promise<Website[]> {
    await delay(400);
    const user = await authApi.getMe(token);
    const websites = loadFromStorage<Website>(STORAGE_KEYS.websites, mockWebsites);

    if (user.role === UserRole.ADMIN) {
      return websites;
    }

    return websites.filter(w => w.ownerId === user.id);
  },

  async getById(id: string, token: string): Promise<Website> {
    await delay(300);
    const user = await authApi.getMe(token);
    const websites = loadFromStorage<Website>(STORAGE_KEYS.websites, mockWebsites);

    const website = websites.find(w => w.id === id);
    if (!website) {
      throw new Error('Website not found');
    }

    if (user.role !== UserRole.ADMIN && website.ownerId !== user.id) {
      throw new Error('Unauthorized');
    }

    return website;
  },
};

// Change Requests API
export const changeRequestsApi = {
  async getAll(token: string, websiteId?: string): Promise<ChangeRequest[]> {
    await delay(400);
    const user = await authApi.getMe(token);
    let requests = loadFromStorage<ChangeRequest>(STORAGE_KEYS.changeRequests, mockChangeRequests);

    if (websiteId) {
      requests = requests.filter(r => r.websiteId === websiteId);
    }

    if (user.role === UserRole.ADMIN) {
      return requests;
    }

    return requests.filter(r => r.ownerId === user.id);
  },

  async create(data: { websiteId: string; title: string; description: string; attachments?: string[] }, token: string): Promise<ChangeRequest> {
    await delay(500);
    const user = await authApi.getMe(token);
    const websites = loadFromStorage<Website>(STORAGE_KEYS.websites, mockWebsites);
    const website = websites.find(w => w.id === data.websiteId);

    if (!website) {
      throw new Error('Website not found');
    }

    if (user.role !== UserRole.ADMIN && website.ownerId !== user.id) {
      throw new Error('Unauthorized');
    }

    const requests = loadFromStorage<ChangeRequest>(STORAGE_KEYS.changeRequests, mockChangeRequests);
    const newRequest: ChangeRequest = {
      id: `request-${Date.now()}`,
      websiteId: data.websiteId,
      ownerId: user.id,
      title: data.title,
      description: data.description,
      attachments: data.attachments || [],
      status: RequestStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    requests.push(newRequest);
    saveToStorage(STORAGE_KEYS.changeRequests, requests);
    return newRequest;
  },

  async update(id: string, data: { status: RequestStatus; adminComment?: string }, token: string): Promise<ChangeRequest> {
    await delay(500);
    const user = await authApi.getMe(token);

    if (user.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized - Admin only');
    }

    const requests = loadFromStorage<ChangeRequest>(STORAGE_KEYS.changeRequests, mockChangeRequests);
    const requestIndex = requests.findIndex(r => r.id === id);
    
    if (requestIndex === -1) {
      throw new Error('Request not found');
    }

    requests[requestIndex].status = data.status;
    requests[requestIndex].adminComment = data.adminComment;
    requests[requestIndex].updatedAt = new Date().toISOString();

    saveToStorage(STORAGE_KEYS.changeRequests, requests);
    return requests[requestIndex];
  },
};

// Invoices API
export const invoicesApi = {
  async getAll(token: string, websiteId?: string): Promise<Invoice[]> {
    await delay(400);
    const user = await authApi.getMe(token);
    let invoices = loadFromStorage<Invoice>(STORAGE_KEYS.invoices, mockInvoices);

    if (websiteId) {
      invoices = invoices.filter(i => i.websiteId === websiteId);
    }

    if (user.role === UserRole.ADMIN) {
      return invoices;
    }

    return invoices.filter(i => i.ownerId === user.id);
  },

  async create(data: { websiteId: string; items: { description: string; quantity: number; unitPrice: number }[]; dueDate: string }, token: string): Promise<Invoice> {
    await delay(500);
    const user = await authApi.getMe(token);

    if (user.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized - Admin only');
    }

    const websites = loadFromStorage<Website>(STORAGE_KEYS.websites, mockWebsites);
    const website = websites.find(w => w.id === data.websiteId);

    if (!website) {
      throw new Error('Website not found');
    }

    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const invoices = loadFromStorage<Invoice>(STORAGE_KEYS.invoices, mockInvoices);
    
    const newInvoice: Invoice = {
      id: `invoice-${Date.now()}`,
      websiteId: data.websiteId,
      ownerId: website.ownerId,
      items: data.items,
      subtotal,
      total: subtotal,
      status: InvoiceStatus.SENT,
      dueDate: data.dueDate,
      createdAt: new Date().toISOString(),
    };

    invoices.push(newInvoice);
    saveToStorage(STORAGE_KEYS.invoices, invoices);
    return newInvoice;
  },

  async update(id: string, updates: Partial<Invoice>, token: string): Promise<Invoice> {
    await delay(500);
    const user = await authApi.getMe(token);

    if (user.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized - Admin only');
    }

    const invoices = loadFromStorage<Invoice>(STORAGE_KEYS.invoices, mockInvoices);
    const invoiceIndex = invoices.findIndex(i => i.id === id);

    if (invoiceIndex === -1) {
      throw new Error('Invoice not found');
    }

    Object.assign(invoices[invoiceIndex], updates);
    saveToStorage(STORAGE_KEYS.invoices, invoices);
    return invoices[invoiceIndex];
  },

  async pay(id: string, token: string): Promise<Invoice> {
    await delay(500);
    const user = await authApi.getMe(token);
    const invoices = loadFromStorage<Invoice>(STORAGE_KEYS.invoices, mockInvoices);
    const invoiceIndex = invoices.findIndex(i => i.id === id);

    if (invoiceIndex === -1) {
      throw new Error('Invoice not found');
    }

    if (user.role !== UserRole.ADMIN && invoices[invoiceIndex].ownerId !== user.id) {
      throw new Error('Unauthorized');
    }

    invoices[invoiceIndex].status = InvoiceStatus.PAID;
    invoices[invoiceIndex].paidAt = new Date().toISOString();

    saveToStorage(STORAGE_KEYS.invoices, invoices);
    return invoices[invoiceIndex];
  },
};

// Upload Assets API
export const uploadAssetsApi = {
  async getAll(token: string, websiteId: string): Promise<UploadAsset[]> {
    await delay(400);
    const user = await authApi.getMe(token);
    const websites = loadFromStorage<Website>(STORAGE_KEYS.websites, mockWebsites);
    const website = websites.find(w => w.id === websiteId);

    if (!website) {
      throw new Error('Website not found');
    }

    if (user.role !== UserRole.ADMIN && website.ownerId !== user.id) {
      throw new Error('Unauthorized');
    }

    const assets = loadFromStorage<UploadAsset>(STORAGE_KEYS.uploadAssets, mockUploadAssets);
    return assets.filter(a => a.websiteId === websiteId);
  },

  async create(websiteId: string, type: UploadType, label: string, file: File, token: string): Promise<UploadAsset> {
    await delay(800);
    const user = await authApi.getMe(token);
    const websites = loadFromStorage<Website>(STORAGE_KEYS.websites, mockWebsites);
    const website = websites.find(w => w.id === websiteId);

    if (!website) {
      throw new Error('Website not found');
    }

    if (user.role !== UserRole.ADMIN && website.ownerId !== user.id) {
      throw new Error('Unauthorized');
    }

    const assets = loadFromStorage<UploadAsset>(STORAGE_KEYS.uploadAssets, mockUploadAssets);
    const newAsset: UploadAsset = {
      id: `asset-${Date.now()}`,
      websiteId,
      ownerId: user.id,
      type,
      label,
      url: `placeholder-${file.name}`,
      createdAt: new Date().toISOString(),
    };

    assets.push(newAsset);
    saveToStorage(STORAGE_KEYS.uploadAssets, assets);
    return newAsset;
  },
};

// Users API (Admin only)
export const usersApi = {
  async getAll(token: string): Promise<User[]> {
    await delay(400);
    const user = await authApi.getMe(token);

    if (user.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized - Admin only');
    }

    const users = loadFromStorage<User>(STORAGE_KEYS.users, mockUsers);
    return users.filter(u => u.role === UserRole.CLIENT);
  },

  async getById(id: string, token: string): Promise<User> {
    await delay(300);
    const user = await authApi.getMe(token);

    if (user.role !== UserRole.ADMIN) {
      throw new Error('Unauthorized - Admin only');
    }

    const users = loadFromStorage<User>(STORAGE_KEYS.users, mockUsers);
    const targetUser = users.find(u => u.id === id);

    if (!targetUser) {
      throw new Error('User not found');
    }

    return targetUser;
  },
};
