export type BackendNotification = {
  id: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationsResponse = {
  message?: string;
  error?: string;
  data?: BackendNotification[];
  total?: number;
  unreadCount?: number;
  page?: number;
  limit?: number;
};
