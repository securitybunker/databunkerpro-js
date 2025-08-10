interface RequestMetadata {
  [key: string]: any;
}

interface LegalBasisOptions {
  brief: string;           // Unique identifier for the legal basis
  status?: string;         // Status of the legal basis (e.g., 'active', 'inactive')
  module?: string;         // Module this legal basis belongs to
  fulldesc?: string;       // Full description of the legal basis
  shortdesc?: string;      // Short description of the legal basis
  basistype?: string;      // Type of legal basis (e.g., 'consent', 'contract', 'legitimate_interest')
  requiredmsg?: string;    // Required message to display to users
  requiredflag?: boolean;  // Whether this legal basis is required
}

interface LegalBasisUpdateOptions {
  status?: string;         // Status of the legal basis (e.g., 'active', 'inactive')
  module?: string;         // Module this legal basis belongs to
  fulldesc?: string;       // Full description of the legal basis
  shortdesc?: string;      // Short description of the legal basis
  basistype?: string;      // Type of legal basis (e.g., 'consent', 'contract', 'legitimate_interest')
  requiredmsg?: string;    // Required message to display to users
  requiredflag?: boolean;  // Whether this legal basis is required
}

interface UserOptions {
  groupname?: string | number;  // Name or ID of the group to assign the user to
  groupid?: number;             // ID of the group to assign the user to
  rolename?: string | number;   // Name or ID of the role to assign to the user
  roleid?: number;              // ID of the role to assign to the user
  slidingtime?: string;         // Sliding time period for user data retention
  finaltime?: string;           // Absolute expiration time for user data
}

interface ConnectorOptions {
  connectorname?: string;   // Name of the connector (e.g., "MySQL Production")
  connectortype?: string;   // Type of the connector (e.g., 'mysql', 'postgresql', 'mongodb')
  connectordesc?: string;   // Description of the connector's purpose
  connectorid?: string | number;  // ID of the connector
  username?: string;        // Username for database connection
  apikey?: string;          // API key for authentication with the database
  dbhost?: string;          // Database host address (e.g., "db.example.com")
  dbport?: number;          // Database port number (e.g., 3306 for MySQL)
  dbname?: string;          // Name of the database to connect to
  tablename?: string;       // Specific table name if applicable
  status?: string;          // Status of the connector (e.g., 'active', 'inactive')
}

interface SharedRecordOptions {
  fields?: string;  // A string containing names of fields to share separated by commas
  partner?: string; // It is used as a reference to partner name. It is not enforced.
  appname?: string; // If defined, shows fields from the user app record instead of user profile
  finaltime?: string; // Expiration time for the shared record
}

interface BasicOptions {
  finaltime?: string;    // Absolute expiration time
  slidingtime?: string;  // Sliding time period (e.g., '1d', '1h')
}

interface AgreementAcceptOptions {
  agreementmethod?: string;  // Method used for agreement acceptance
  lastmodifiedby?: string;   // User who last modified the agreement
  referencecode?: string;    // Reference code for the agreement
  starttime?: string;        // Start time for the agreement
  finaltime?: string;        // Expiration time for the agreement
  status?: string;           // Current status of the agreement
}

interface ProcessingActivityOptions {
  activity: string;      // Unique identifier for the processing activity
  title?: string;        // Title of the processing activity
  script?: string;       // Script or description of the processing activity
  fulldesc?: string;     // Full description of the processing activity
  applicableto?: string; // What this activity applies to
}

interface ProcessingActivityUpdateOptions {
  newactivity?: string;   // New activity identifier
  title?: string;         // Title of the processing activity
  script?: string;        // Script or description of the processing activity
  fulldesc?: string;      // Full description of the processing activity
  applicableto?: string;  // What this activity applies to
}

interface TenantOptions {
  tenantname: string;  // Name of the tenant
  tenantorg: string;   // Organization name
  email: string;       // Email address for tenant contact
}

interface GroupOptions {
  groupname: string;   // Name of the group
  grouptype?: string;  // Type of the group
  groupdesc?: string;  // Description of the group
}

interface RoleOptions {
  rolename: string;   // Name of the role
  roledesc?: string;  // Description of the role
}

interface TokenOptions {
  unique?: boolean;     // Whether to create a unique token for each request
  slidingtime?: string; // Time period for token validity (e.g., '1d', '1h')
  finaltime?: string;   // Absolute expiration time for the token
}

interface PatchOperation {
  op: string;    // Operation type (e.g., 'add', 'replace', 'remove')
  path: string;  // JSON path to the field to modify
  value?: any;   // New value for the field
}

interface TokenBulkOptions {
  unique?: boolean;     // Whether to create unique tokens for each request
  slidingtime?: string; // Time period for token validity (e.g., '1d', '1h')
  finaltime?: string;   // Absolute expiration time for the token
}

interface PolicyOptions {
  policyname: string;   // Name of the policy
  policydesc?: string;  // Description of the policy
  policy: any;          // Policy configuration object
}

interface PolicyUpdateOptions {
  policyname?: string;  // New name of the policy
  policydesc?: string;  // New description of the policy
  policy: any;          // Updated policy configuration object
}

interface SessionOptions {
  slidingtime?: string; // Sliding time period for session validity
  finaltime?: string;   // Absolute expiration time for the session
}

declare class DatabunkerproAPI {
  constructor(baseURL: string, xBunkerToken?: string, xBunkerTenant?: string);

  // Core request methods
  private makeRequest(endpoint: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
  rawRequest(endpoint: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<Blob>;

  // User Management
  createUser(profile: any, options?: UserOptions, requestMetadata?: RequestMetadata): Promise<any>;
  createUsersBulk(records: any[], options?: BasicOptions, requestMetadata?: RequestMetadata): Promise<any>;
  getUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  updateUser(mode: string, identity: string, profile: any, requestMetadata?: RequestMetadata): Promise<any>;
  requestUserUpdate(mode: string, identity: string, profile: any, requestMetadata?: RequestMetadata): Promise<any>;
  patchUser(mode: string, identity: string, patch: PatchOperation[], requestMetadata?: RequestMetadata): Promise<any>;
  requestUserPatch(mode: string, identity: string, patch: PatchOperation[], requestMetadata?: RequestMetadata): Promise<any>;
  deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  requestUserDeletion(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;

  // User Authentication
  preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata?: RequestMetadata): Promise<any>;
  loginUser(mode: string, identity: string, smscode: string, requestMetadata?: RequestMetadata): Promise<any>;
  createCaptcha(requestMetadata?: RequestMetadata): Promise<any>;

  // Create user API Access Token
  /**
   * Creates an access token for a user
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode
   * @param {BasicOptions} [options] - Optional parameters for token creation
   * @param {RequestMetadata} [requestMetadata] - Optional request metadata
   * @returns {Promise<Object>} The created token information
   */
  createUserXToken(mode: string, identity: string, options?: BasicOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Creates an access token for a role
   * @param {string|number} roleref - Role ID or name
   * @param {BasicOptions} [options] - Optional parameters for token creation
   * @param {RequestMetadata} [requestMetadata] - Optional request metadata
   * @returns {Promise<Object>} The created token information
   */
  createRoleXToken(roleref: string | number, options?: BasicOptions, requestMetadata?: RequestMetadata): Promise<any>;

  // User Request Management
  getUserRequest(requestuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserRequests(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Cancels a user request
   * @param {string} requestuuid - UUID of the request to cancel
   * @param {Object} [options] - Optional parameters for cancellation
   * @param {RequestMetadata} [requestMetadata] - Optional request metadata
   * @returns {Promise<Object>} The cancellation result
   */
  cancelUserRequest(requestuuid: string, options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  approveUserRequest(requestuuid: string, options?: any, requestMetadata?: RequestMetadata): Promise<any>;

  // App Data Management
  createAppData(mode: string, identity: string, appname: string, appdata: any, requestMetadata?: RequestMetadata): Promise<any>;
  getAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata): Promise<any>;
  updateAppData(mode: string, identity: string, appname: string, appdata: any, requestMetadata?: RequestMetadata): Promise<any>;
  requestAppDataUpdate(mode: string, identity: string, appname: string, appdata: any, requestMetadata?: RequestMetadata): Promise<any>;
  listAppDataNames(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  listAppNames(requestMetadata?: RequestMetadata): Promise<any>;

  // Legal Basis Management
  createLegalBasis(options: LegalBasisOptions, requestMetadata?: RequestMetadata): Promise<any>;
  updateLegalBasis(brief: string, options: LegalBasisUpdateOptions, requestMetadata?: RequestMetadata): Promise<any>;
  deleteLegalBasis(brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  listAgreements(requestMetadata?: RequestMetadata): Promise<any>;

  // Agreement Management
  /**
   * Records user's acceptance of a legal basis/agreement
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode (e.g., email address, phone number)
   * @param {string} brief - Unique identifier of the legal basis/agreement being accepted
   * @param {AgreementAcceptOptions} options - Agreement acceptance options
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The recorded agreement acceptance
   */
  acceptAgreement(mode: string, identity: string, brief: string, options?: AgreementAcceptOptions, requestMetadata?: RequestMetadata): Promise<any>;
  getUserAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  cancelAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  revokeAllAgreements(brief: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Processing Activity Management
  listProcessingActivities(requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Creates a new processing activity
   * @param {ProcessingActivityOptions} options - The processing activity options
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created processing activity
   */
  createProcessingActivity(options: ProcessingActivityOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Updates an existing processing activity
   * @param {string} activity - Current activity identifier
   * @param {ProcessingActivityUpdateOptions} options - The processing activity update options
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} The updated processing activity
   */
  updateProcessingActivity(activity: string, options: ProcessingActivityUpdateOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Deletes a processing activity
   * @param {string} activity - Activity identifier to delete
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} The deletion result
   */
  deleteProcessingActivity(activity: string, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Links a processing activity to a legal basis
   * @param {string} activity - Activity identifier
   * @param {string} brief - Legal basis brief identifier
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} The linking result
   */
  linkProcessingActivityToLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Unlinks a processing activity from a legal basis
   * @param {string} activity - Activity identifier
   * @param {string} brief - Legal basis brief identifier
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} The unlinking result
   */
  unlinkProcessingActivityFromLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Connector Management
  listSupportedConnectors(requestMetadata?: RequestMetadata): Promise<any>;
  listConnectors(offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Creates a new database connector with the specified configuration
   * @param {ConnectorOptions} options - The connector configuration options
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created connector details
   */
  createConnector(options: ConnectorOptions, requestMetadata?: RequestMetadata): Promise<any>;
  updateConnector(connectorid: number, options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
  validateConnectorConnectivity(connectorref: string | number, options?: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
  deleteConnector(connectorref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
  getTableMetadata(connectorref: string | number, options?: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
  connectorGetUserData(mode: string, identity: string, connectorref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
  connectorGetUserExtraData(mode: string, identity: string, connectorref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
  connectorDeleteUser(mode: string, identity: string, connectorref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;

  // Group Management
  createGroup(options: GroupOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
  getGroup(groupref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
  listAllGroups(requestMetadata?: RequestMetadata | null): Promise<any>;
  listUserGroups(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
  updateGroup(groupid: number, options: GroupOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
  deleteGroup(groupref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
  removeUserFromGroup(mode: string, identity: string, groupref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
  /**
   * Adds a user to a group with an optional role
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode
   * @param {string|number} groupref - Group name or ID to add the user to
   * @param {string|number|null} [roleref] - Optional role name or ID to assign to the user in the group
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<any>} The result of adding the user to the group
   */
  addUserToGroup(mode: string, identity: string, groupref: string | number, roleref?: string | number | null, requestMetadata?: RequestMetadata | null): Promise<any>;

  // Token Management (for example for credit cards)
  /**
   * Creates a token for sensitive data like credit card numbers
   * @param {string} tokentype - Type of token (e.g., 'creditcard') or 'email'
   * @param {string} record - The sensitive data to tokenize
   * @param {TokenOptions} [options] - Optional parameters for token creation
   * @param {RequestMetadata} [requestMetadata] - Optional request metadata
   * @returns {Promise<Object>} The created token information
   */
  createToken(tokentype: string, record: string, options?: TokenOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Creates multiple tokens in bulk for sensitive data
   * @param {Array<Object>} records - Array of records to tokenize, each containing tokentype and record
   * @param {TokenBulkOptions} [options] - Optional parameters for token creation
   * @param {RequestMetadata} [requestMetadata] - Optional request metadata
   * @returns {Promise<Object>} The created tokens information
   */
  createTokensBulk(records: any[], options?: TokenBulkOptions, requestMetadata?: RequestMetadata): Promise<any>;
  getToken(token: string, requestMetadata?: RequestMetadata): Promise<any>;
  deleteToken(token: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Audit Management
  listUserAuditEvents(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  getAuditEvent(auditeventuuid: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Tenant Management
  /**
   * Creates a new tenant
   * @param {TenantOptions} options - Tenant creation options
   * @param {RequestMetadata} [requestMetadata] - Optional request metadata
   * @returns {Promise<Object>} The created tenant information
   */
  createTenant(options: TenantOptions, requestMetadata?: RequestMetadata): Promise<any>;
  getTenant(tenantid: number, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Updates an existing tenant
   * @param {number} tenantid - ID of the tenant to update
   * @param {TenantOptions} options - Tenant update options
   * @param {RequestMetadata} [requestMetadata] - Optional request metadata
   * @returns {Promise<Object>} The updated tenant information
   */
  updateTenant(tenantid: number, options: TenantOptions, requestMetadata?: RequestMetadata): Promise<any>;
  deleteTenant(tenantid: number, requestMetadata?: RequestMetadata): Promise<any>;
  listTenants(offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;

  // Role Management
  createRole(options: RoleOptions, requestMetadata?: RequestMetadata): Promise<any>;
  updateRole(roleid: string | number, options: RoleOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
  linkPolicy(roleref: string | number, policyref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;

  // Policy Management
  createPolicy(options: PolicyOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
  updatePolicy(policyid: string | number, options?: PolicyUpdateOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
  getPolicy(policyref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
  listPolicies(requestMetadata?: RequestMetadata | null): Promise<any>;

  // Bulk Operations
  bulkListUnlock(requestMetadata?: RequestMetadata | null): Promise<any>;
  bulkListUsers(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
  bulkListGroupUsers(unlockuuid: string, groupref: string | number, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
  bulkListUserRequests(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
  bulkListAuditEvents(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
  bulkListTokens(unlockuuid: string, tokens: string[], requestMetadata?: RequestMetadata | null): Promise<any>;
  bulkDeleteTokens(unlockuuid: string, tokens: string[], requestMetadata?: RequestMetadata | null): Promise<any>;

  // Session Management
  upsertSession(sessionuuid: string, sessiondata: any, options?: BasicOptions, requestMetadata?: RequestMetadata): Promise<any>;
  deleteSession(sessionuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserSessions(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  getSession(sessionuuid: string, requestMetadata?: RequestMetadata): Promise<any>;

  // System Configuration
  getUIConf(): Promise<any>;
  getTenantConf(): Promise<any>;
  getUserHTMLReport(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  getUserReport(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  generateWrappingKey(key1: string, key2: string, key3: string, requestMetadata?: RequestMetadata): Promise<any>;

  // System Monitoring
  /**
   * Gets system statistics
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} System statistics
   * 
   * Response format:
   * {
   *   "status": "ok",
   *   "stats": {
   *     "numusers": 123,      // Total number of users in the system
   *     "numtenants": 123,    // Total number of tenants
   *     "numtokens": 123,     // Total number of tokens
   *     "numsessions": 123    // Total number of active sessions
   *   }
   * }
   */
  getSystemStats(requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Generates a wrapping key from three Shamir's Secret Sharing keys
   * @param {string} key1 - First Shamir secret sharing key
   * @param {string} key2 - Second Shamir secret sharing key
   * @param {string} key3 - Third Shamir secret sharing key
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} Generated wrapping key
   *
   * Response format:
   * {
   *   "status": "ok",
   *   "wrappingkey": "generated-wrapping-key-value"
   * }
   */
  getSystemMetrics(requestMetadata?: RequestMetadata): Promise<any>;
  parsePrometheusMetrics(metricsText: string): Promise<any>;

  // Shared Records
  /**
   * Creates a shared record for a user
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode
   * @param {SharedRecordOptions} [options] - Optional parameters for shared record creation
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created shared record information
   */
  createSharedRecord(mode: string, identity: string, options?: SharedRecordOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Gets a shared record by its UUID
   * @param {string} recorduuid - UUID of the shared record to retrieve
   * @param {RequestMetadata} [requestMetadata] - Additional metadata to include with the request
   * @returns {Promise<Object>} The shared record information
   */
  getSharedRecord(recorduuid: string, requestMetadata?: RequestMetadata): Promise<any>;
}

declare global {
  interface Window {
    DatabunkerproAPI: typeof DatabunkerproAPI;
  }
}
export default DatabunkerproAPI; 