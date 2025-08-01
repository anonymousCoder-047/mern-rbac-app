
import _ from "lodash"

const apiErrors = {
  ECONNABORTED: 'The connection was aborted. Check your network.',
  ENETUNREACH: 'Network unreachable. Please verify your internet.',
  ERR_CONNECTION_RESET: 'Connection was reset. Try again later.',
  ERR_NETWORK_CHANGED: 'Network environment changed unexpectedly.',
  ECONNREFUSED: 'Connection refused. Check your network.',
  ENOTFOUND: 'DNS error. Server not found.',
  408: 'Request timeout. Your connection might be slow.',
  429: 'Too many requests. Please slow down.',
  503: 'Service temporarily unavailable. Please retry shortly.',
  401: 'Unauthorized. Please login.',
  403: 'Access denied.',
  500: 'Server error. Try again later.',
};

const authenticationError = {
    ERR_JWT_EXPIRED: 'Your session has expired. Please login again.',
    ERR_TOKEN_MISSING: 'Authentication token not found.',
    ERR_INVALID_CREDENTIALS: 'Invalid username or password.',
    ERR_ACCESS_DENIED: 'Access denied. You do not have permission.',
    ERR_AUTH_REQUIRED: 'Authentication is required to proceed.',
}

const validationError = {
    ERR_FIELD_REQUIRED: 'One or more required fields are missing.',
    ERR_EMAIL_INVALID: 'Please enter a valid email address.',
    ERR_PASSWORD_WEAK: 'Password does not meet security criteria.',
    ERR_FORM_INVALID: 'Please review the form fields for errors.',
    ERR_INVALID_PARAMS: 'Invalid parameters provided.',
}

const dbErrors = {
  ERR_DB_CONNECTION: 'Failed to connect to the database.',
  ERR_DATA_CONFLICT: 'Conflicting data. Please refresh and try again.',
  ERR_DATA_NOT_FOUND: 'The requested item could not be located.',
  ERR_QUERY_FAILED: 'Data retrieval failed. Try again later.',
  ERR_STORAGE_EXCEEDED: 'Storage limit exceeded. Please clear space.',
}

const appErrors = {
  ERR_MODULE_LOAD: 'Could not load application module. Please retry.',
  ERR_CONFIG_MISSING: 'Configuration missing or misconfigured.',
  ERR_FEATURE_DISABLED: 'This feature is currently unavailable.',
  ERR_UNSUPPORTED_BROWSER: 'Your browser may not support this feature.',
}

const DEFAULT_ERROR = 'Something went wrong. Please try again.';

// Combine error sources
const allErrorSources = [apiErrors, appErrors, authenticationError, validationError, dbErrors];

export function getErrorMessage(error, optional=false) {
  const keysToMatch = [
    _.get(error, 'response.status'),         // e.g. 404
    _.get(error, 'code'),                    // e.g. ECONNREFUSED
    _.get(error, 'message'),                 // e.g. ERR_INVALID_TOKEN
    _.get(error, 'name')                     // e.g. TypeError
  ];

  // Find the first match across maps
  for (const key of keysToMatch) {
    if (!key) continue;
    const match = _.find(allErrorSources, (errMap) => _.has(errMap, key));
    if (match) return match[key];
  }

  return optional ? error : DEFAULT_ERROR;
}
