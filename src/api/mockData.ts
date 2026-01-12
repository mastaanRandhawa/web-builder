import {
  User,
  UserRole,
  Website,
  WebsiteStatus,
  Plan,
  ChangeRequest,
  RequestStatus,
  Invoice,
  InvoiceStatus,
  UploadAsset,
  UploadType,
} from '../types';

// Seeded users
// Note: Passwords are hashed in the backend, but for mock API we accept any password
// Real credentials: admin@rt.digital / Password123!, client1@rt.digital / Password123!, client2@rt.digital / Password123!
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@rt.digital',
    role: UserRole.ADMIN,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'client-1',
    name: 'Client One',
    email: 'client1@rt.digital',
    role: UserRole.CLIENT,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'client-2',
    name: 'Client Two',
    email: 'client2@rt.digital',
    role: UserRole.CLIENT,
    createdAt: '2024-02-01T00:00:00Z',
  },
];

// Seeded websites
export const mockWebsites: Website[] = [
  {
    id: 'website-1',
    ownerId: 'client-1',
    name: 'Local Business Co',
    domain: 'localbusinessco.com',
    plan: Plan.GROWTH,
    status: WebsiteStatus.ACTIVE,
    lastUpdatedAt: '2024-03-15T10:30:00Z',
  },
  {
    id: 'website-2',
    ownerId: 'client-1',
    name: 'Service Provider LLC',
    domain: 'serviceprovider.com',
    plan: Plan.FOUNDATION,
    status: WebsiteStatus.IN_REVIEW,
    lastUpdatedAt: '2024-03-20T14:20:00Z',
  },
  {
    id: 'website-3',
    ownerId: 'client-2',
    name: 'Professional Services',
    domain: 'proservices.com',
    plan: Plan.SCALE,
    status: WebsiteStatus.NEEDS_PAYMENT,
    lastUpdatedAt: '2024-03-10T09:15:00Z',
  },
  {
    id: 'website-4',
    ownerId: 'client-2',
    name: 'Enterprise Solutions',
    domain: 'enterprisesolutions.com',
    plan: Plan.DOMINANCE,
    status: WebsiteStatus.ACTIVE,
    lastUpdatedAt: '2024-03-25T16:45:00Z',
  },
  {
    id: 'website-5',
    ownerId: 'client-2',
    name: 'Startup Hub',
    domain: 'startuphub.com',
    plan: Plan.GROWTH,
    status: WebsiteStatus.DRAFT,
    lastUpdatedAt: '2024-03-28T11:00:00Z',
  },
];

// Seeded change requests
export const mockChangeRequests: ChangeRequest[] = [
  {
    id: 'request-1',
    websiteId: 'website-1',
    ownerId: 'client-1',
    title: 'Update homepage hero section',
    description: 'I want to change the hero image and update the headline text to be more compelling.',
    attachments: ['hero-image.jpg'],
    status: RequestStatus.PENDING,
    createdAt: '2024-03-18T11:00:00Z',
    updatedAt: '2024-03-18T11:00:00Z',
  },
  {
    id: 'request-2',
    websiteId: 'website-2',
    ownerId: 'client-1',
    title: 'Add contact form',
    description: 'Please add a contact form to the contact page with fields for name, email, and message.',
    attachments: [],
    status: RequestStatus.APPROVED,
    adminComment: 'Approved. Will implement next week.',
    createdAt: '2024-03-19T09:30:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 'request-3',
    websiteId: 'website-3',
    ownerId: 'client-2',
    title: 'Change color scheme',
    description: 'I want to update the primary color from blue to green to match our new branding.',
    attachments: ['color-palette.png'],
    status: RequestStatus.REJECTED,
    adminComment: 'This conflicts with brand guidelines. Please provide alternative color options.',
    createdAt: '2024-03-12T14:20:00Z',
    updatedAt: '2024-03-13T15:30:00Z',
  },
  {
    id: 'request-4',
    websiteId: 'website-4',
    ownerId: 'client-2',
    title: 'Add blog post',
    description: 'I need to add a new blog post about our latest project. Content is ready.',
    attachments: ['blog-content.docx'],
    status: RequestStatus.PENDING,
    createdAt: '2024-03-26T08:00:00Z',
    updatedAt: '2024-03-26T08:00:00Z',
  },
];

// Seeded invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'invoice-1',
    websiteId: 'website-1',
    ownerId: 'client-1',
    items: [
      { description: 'Monthly Hosting - Growth Plan', quantity: 1, unitPrice: 179 },
      { description: 'SEO Optimization Add-on', quantity: 1, unitPrice: 249 },
    ],
    subtotal: 428,
    total: 428,
    status: InvoiceStatus.PAID,
    dueDate: '2024-03-01',
    paidAt: '2024-02-28T10:00:00Z',
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'invoice-2',
    websiteId: 'website-2',
    ownerId: 'client-1',
    items: [
      { description: 'Monthly Hosting - Foundation Plan', quantity: 1, unitPrice: 99 },
    ],
    subtotal: 99,
    total: 99,
    status: InvoiceStatus.SENT,
    dueDate: '2024-04-15',
    createdAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'invoice-3',
    websiteId: 'website-3',
    ownerId: 'client-2',
    items: [
      { description: 'Monthly Hosting - Scale Plan', quantity: 1, unitPrice: 299 },
      { description: 'Booking Calendar', quantity: 1, unitPrice: 59 },
    ],
    subtotal: 358,
    total: 358,
    status: InvoiceStatus.OVERDUE,
    dueDate: '2024-03-01',
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'invoice-4',
    websiteId: 'website-4',
    ownerId: 'client-2',
    items: [
      { description: 'Monthly Hosting - Dominance Plan', quantity: 1, unitPrice: 599 },
    ],
    subtotal: 599,
    total: 599,
    status: InvoiceStatus.PAID,
    dueDate: '2024-03-01',
    paidAt: '2024-02-27T14:30:00Z',
    createdAt: '2024-02-15T00:00:00Z',
  },
];

// Seeded upload assets
export const mockUploadAssets: UploadAsset[] = [
  {
    id: 'asset-1',
    websiteId: 'website-1',
    ownerId: 'client-1',
    type: UploadType.IMAGE,
    label: 'Hero Image',
    url: 'placeholder-hero.jpg',
    createdAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 'asset-2',
    websiteId: 'website-1',
    ownerId: 'client-1',
    type: UploadType.TEXT,
    label: 'About Page Content',
    url: 'about-content.txt',
    createdAt: '2024-03-12T11:00:00Z',
  },
  {
    id: 'asset-3',
    websiteId: 'website-3',
    ownerId: 'client-2',
    type: UploadType.IMAGE,
    label: 'Logo',
    url: 'logo.png',
    createdAt: '2024-03-05T09:00:00Z',
  },
];
