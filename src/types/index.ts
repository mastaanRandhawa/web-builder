export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
}

export enum WebsiteStatus {
  ACTIVE = 'Active',
  IN_REVIEW = 'In Review',
  NEEDS_PAYMENT = 'Needs Payment',
  PAUSED = 'Paused',
  DRAFT = 'Draft',
}

export enum Plan {
  FOUNDATION = 'Foundation',
  GROWTH = 'Growth',
  SCALE = 'Scale',
  DOMINANCE = 'Dominance',
}

export enum RequestStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export enum InvoiceStatus {
  DRAFT = 'Draft',
  SENT = 'Sent',
  PAID = 'Paid',
  OVERDUE = 'Overdue',
}

export enum UploadType {
  IMAGE = 'image',
  TEXT = 'text',
  FILE = 'file',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Website {
  id: string;
  ownerId: string;
  name: string;
  domain: string;
  plan: Plan;
  status: WebsiteStatus;
  lastUpdatedAt: string;
}

export interface ChangeRequest {
  id: string;
  websiteId: string;
  ownerId: string;
  title: string;
  description: string;
  attachments: string[];
  status: RequestStatus;
  adminComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  websiteId: string;
  ownerId: string;
  items: InvoiceLineItem[];
  subtotal: number;
  total: number;
  status: InvoiceStatus;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

export interface UploadAsset {
  id: string;
  websiteId: string;
  ownerId: string;
  type: UploadType;
  label: string;
  url?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
