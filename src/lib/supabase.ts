// MongoDB API client
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const getAuthToken = () => localStorage.getItem('authToken');

export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

// API wrapper for authenticated requests
export const apiCall = async (endpoint: string, options: any = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API Error' }));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
};

// Database types
export type Database = {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          name: string;
          email: string;
          mobile: string;
          college: string;
          batch: string;
          gender: "male" | "female";
          clothing_type: "shirt" | "pant" | "shoes";
          age: number;
          height: number;
          weight: number;
          morphology: string;
          fit_preference: string;
          collar_size?: string;
          chest?: number;
          waist?: number;
          hip?: number;
          shoulder?: number;
          inseam?: number;
          shoe_size?: number;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
