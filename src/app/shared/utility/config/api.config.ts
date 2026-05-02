export const API_CONFIG = {
  // API Base URLs
  BASE_URL: 'http://localhost:5268', // .NET Backend API URL
  MOCK_BASE_URL: '/assets/mock-data',
  
  // Feature flags
  USE_MOCK_DATA: false, // Changed to false to use real API
  
  // API Endpoints
  ENDPOINTS: {
    // Form Types
    FORM_TYPES: '/api/form-types',
    FORM_TYPES_BY_ID: '/api/form-types/:id',
    
    // Form Groups
    FORM_GROUPS: '/api/FormGroups', 
    FORM_GROUPS_BY_ID: '/api/FormGroups/:id',
    
    // Assignments
    ASSIGNMENTS: '/api/form-groups/:groupId/assignments',
    
    // Migrations
    MIGRATIONS: '/api/migrations',
    MIGRATIONS_BY_ID: '/api/migrations/:id',
    
    // Users/Auth
    CURRENT_USER: '/api/auth/current-user',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    
    // Audit
    AUDIT_LOG: '/api/audit/log'
  },
  
  // Mock Data Files
  MOCK_FILES: {
    FORM_TYPES: '/form-types.json',
    FORM_GROUPS: '/form-groups.json',
    MIGRATION_HISTORY: '/migration-history.json'
  },
  
  // Request timeout in milliseconds
  REQUEST_TIMEOUT: 10000,
  
  // Retry configuration
  RETRY_CONFIG: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000
  }
};

// Helper function to get the appropriate URL
export function getApiUrl(endpointKey: string): string {
  const endpoint = API_CONFIG.ENDPOINTS[endpointKey as keyof typeof API_CONFIG.ENDPOINTS];
  
  if (API_CONFIG.USE_MOCK_DATA) {
    const mockFile = API_CONFIG.MOCK_FILES[endpointKey as keyof typeof API_CONFIG.MOCK_FILES];
    return API_CONFIG.MOCK_BASE_URL + mockFile;
  } else {
    return API_CONFIG.BASE_URL + endpoint;
  }
}

// Helper function to replace path parameters
export function replacePathParams(endpoint: string, params: { [key: string]: string }): string {
  let result = endpoint;
  Object.keys(params).forEach(key => {
    result = result.replace(`:${key}`, params[key]);
  });
  return result;
}
