// API Configuration and Client for Trackme Backend
// Add this file to your frontend project

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiRequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  private async request(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<any> {
    const { requiresAuth = true, ...fetchOptions } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    if (requiresAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API error: ${response.statusText}`);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication
  async register(name: string, email: string, password: string) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      requiresAuth: false,
    });
  }

  async login(email: string, password: string) {
    const response = await this.request(
      `/api/v1/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      {
        method: 'POST',
        requiresAuth: false,
      }
    );
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    return response;
  }

  async getCurrentUser() {
    return this.request('/api/v1/auth/me');
  }

  // Tasks
  async getTasks(params?: { date?: string; status?: string }) {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.request(`/api/v1/tasks${queryParams ? `?${queryParams}` : ''}`);
  }

  async createTask(task: any) {
    return this.request('/api/v1/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: number, updates: any) {
    return this.request(`/api/v1/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(id: number) {
    return this.request(`/api/v1/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Events
  async getEvents(params?: { from?: string; to?: string }) {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.request(`/api/v1/events${queryParams ? `?${queryParams}` : ''}`);
  }

  async createEvent(event: any) {
    return this.request('/api/v1/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async updateEvent(id: number, updates: any) {
    return this.request(`/api/v1/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteEvent(id: number) {
    return this.request(`/api/v1/events/${id}`, {
      method: 'DELETE',
    });
  }

  // Diet/Meals
  async getMeals(params?: { date?: string }) {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.request(`/api/v1/diet/meals${queryParams ? `?${queryParams}` : ''}`);
  }

  async createMeal(meal: any) {
    return this.request('/api/v1/diet/meals', {
      method: 'POST',
      body: JSON.stringify(meal),
    });
  }

  async updateMeal(id: number, updates: any) {
    return this.request(`/api/v1/diet/meals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteMeal(id: number) {
    return this.request(`/api/v1/diet/meals/${id}`, {
      method: 'DELETE',
    });
  }

  async getDietSummary(params?: { from?: string; to?: string }) {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.request(`/api/v1/diet/summary${queryParams ? `?${queryParams}` : ''}`);
  }

  // Health - Steps
  async createOrUpdateSteps(data: { date: string; step_count: number; source?: string }) {
    return this.request('/api/v1/health/steps', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getStepSummary(params?: { from?: string; to?: string }) {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.request(`/api/v1/health/steps/summary${queryParams ? `?${queryParams}` : ''}`);
  }

  // Health - Vitals
  async createVital(vital: any) {
    return this.request('/api/v1/health/vitals', {
      method: 'POST',
      body: JSON.stringify(vital),
    });
  }

  async getVitalsByType(type: string, params?: { from?: string; to?: string }) {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.request(`/api/v1/health/vitals/${type}${queryParams ? `?${queryParams}` : ''}`);
  }

  // Health - Activities
  async createActivity(activity: any) {
    return this.request('/api/v1/health/activities', {
      method: 'POST',
      body: JSON.stringify(activity),
    });
  }

  async getActivities(params?: { from?: string; to?: string }) {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.request(`/api/v1/health/activities${queryParams ? `?${queryParams}` : ''}`);
  }

  async updateActivity(id: number, updates: any) {
    return this.request(`/api/v1/health/activities/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteActivity(id: number) {
    return this.request(`/api/v1/health/activities/${id}`, {
      method: 'DELETE',
    });
  }

  // Insights
  async getTodayInsights() {
    return this.request('/api/v1/insights/today');
  }

  async dismissInsight(id: number) {
    return this.request(`/api/v1/insights/${id}/dismiss`, {
      method: 'POST',
    });
  }

  // Profile
  async getProfile() {
    return this.request('/api/v1/profile');
  }

  async updateProfile(updates: any) {
    return this.request('/api/v1/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async getGoals() {
    return this.request('/api/v1/profile/goals');
  }

  async updateGoals(goals: any) {
    return this.request('/api/v1/profile/goals', {
      method: 'PATCH',
      body: JSON.stringify(goals),
    });
  }

  async getConnections() {
    return this.request('/api/v1/profile/connections');
  }

  async updateConnections(connections: any) {
    return this.request('/api/v1/profile/connections', {
      method: 'PATCH',
      body: JSON.stringify(connections),
    });
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);
export default api;

