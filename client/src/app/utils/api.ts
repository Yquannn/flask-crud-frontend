import axios from 'axios';

// Get the base URL for API calls
export const getBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
  
  // In production, ensure we're not using localhost
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    if (baseUrl.includes('127.0.0.1') || baseUrl.includes('localhost')) {
      console.warn('Using localhost API URL in production. Please set NEXT_PUBLIC_API_URL environment variable.');
    }
  }
  
  return baseUrl;
};

// Create axios instance with default configuration
export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - no response received');
      throw new Error('Network error. Please check your connection.');
    }
    
    // Handle specific HTTP status codes
    switch (error.response.status) {
      case 404:
        throw new Error('Resource not found.');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw error;
    }
  }
);

// Helper function to handle API errors
export const handleApiError = (error: any): string => {
  if (error.message) {
    return error.message;
  }
  
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  return 'An unexpected error occurred. Please try again.';
}; 