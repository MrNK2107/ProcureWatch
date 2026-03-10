import axios from 'axios';
import API_BASE_URL from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Tender {
  id: number;
  tender_ref_no: string;
  title: string;
  ministry: string;
  department: string;
  sub_department: string;
  category: string;
  tender_type: string;
  location: string;
  published_date: string;
  closing_date: string;
  opening_date: string;
  created_at: string;
  days_until_closing?: number;
}

export interface TendersResponse {
  total: number;
  limit: number;
  offset: number;
  results: Tender[];
}

export interface AnalyticsData {
  ministry: Array<{ ministry: string; count: number }>;
  count: number;
}

export interface CategoryData {
  category: string;
  count: number;
}

export interface StateData {
  state: string;
  count: number;
}

export interface DashboardStats {
  total_tenders: number;
  total_ministries: number;
  total_categories: number;
  top_ministry: string;
}

export interface Analytics {
  dashboard: DashboardStats;
  ministry: Array<{ ministry: string; count: number }>;
  category: CategoryData[];
  state: StateData[];
  tender_type: Array<{ type: string; count: number }>;
  timeline: Array<{ date: string; count: number }>;
}

// API Methods
export const tenderAPI = {
  // Get all tenders with filters
  getTenders: async (params?: {
    limit?: number;
    offset?: number;
    category?: string;
    ministry?: string;
    search?: string;
  }): Promise<TendersResponse> => {
    const response = await api.get('/tenders', { params });
    return response.data;
  },

  // Get single tender by ID
  getTender: async (id: number): Promise<Tender> => {
    const response = await api.get(`/tenders/${id}`);
    return response.data;
  },

  // Get tenders closing soon
  getClosingSoon: async (days: number = 7) => {
    const response = await api.get('/tenders/closing-soon', { params: { days } });
    return response.data;
  },

  // Get analytics
  getAnalytics: async (): Promise<Analytics> => {
    const response = await api.get('/analytics');
    return response.data;
  },

  // Get ministry analytics
  getMinistryAnalytics: async () => {
    const response = await api.get('/analytics/ministry');
    return response.data;
  },

  // Get category analytics
  getCategoryAnalytics: async () => {
    const response = await api.get('/analytics/category');
    return response.data;
  },

  // Get state analytics
  getStateAnalytics: async () => {
    const response = await api.get('/analytics/state');
    return response.data;
  },

  // Get distinct ministries
  getDistinctMinistries: async (): Promise<string[]> => {
    const response = await api.get('/distinct/ministries');
    return response.data.ministries;
  },

  // Get distinct categories
  getDistinctCategories: async (): Promise<string[]> => {
    const response = await api.get('/distinct/categories');
    return response.data.categories;
  },
};

export default api;
