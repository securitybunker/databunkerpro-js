interface RequestMetadata {
  [key: string]: any;
}

interface LegalBasisOptions {
  brief: string;
  status?: string;
  module?: string;
  fulldesc?: string;
  shortdesc?: string;
  basistype?: string;
  requiredmsg?: string;
  requiredflag?: boolean;
}

interface LegalBasisUpdateOptions {
  status?: string;
  module?: string;
  fulldesc?: string;
  shortdesc?: string;
  basistype?: string;
  requiredmsg?: string;
  requiredflag?: boolean;
}

interface UserOptions {
  groupname?: string | number;
  groupid?: number;
  rolename?: string | number;
  roleid?: number;
  slidingtime?: string;
  finaltime?: string;
}

interface ConnectorOptions {
  connectorname?: string;
  connectortype?: string;
  connectordesc?: string;
  connectorid?: string | number;
  username?: string;
  apikey?: string;
  dbhost?: string;
  dbport?: number;
  dbname?: string;
  tablename?: string;
  status?: string;
}



interface SharedRecordOptions {
  fields?: string;  // A string containing names of fields to share separated by commas
  partner?: string; // It is used as a reference to partner name. It is not enforced.
  appname?: string; // If defined, shows fields from the user app record instead of user profile
  finaltime?: string; // Expiration time for the shared record
}

interface BasicOptions {
  finaltime?: string;
  slidingtime?: string;
}

interface AgreementAcceptOptions {
  agreementmethod?: string;
  lastmodifiedby?: string;
  referencecode?: string;
  starttime?: string;
  finaltime?: string;
  status?: string;
}

interface ProcessingActivityOptions {
  activity: string;
  title?: string;
  script?: string;
  fulldesc?: string;
  applicableto?: string;
}

interface ProcessingActivityUpdateOptions {
  newactivity?: string;
  title?: string;
  script?: string;
  fulldesc?: string;
  applicableto?: string;
}

interface TenantOptions {
  tenantname: string;
  tenantorg: string;
  email: string;
}

interface GroupOptions {
  groupname: string;
  grouptype?: string;
  groupdesc?: string;
}

interface RoleOptions {
  rolename: string;
  roledesc?: string;
}

interface TokenOptions {
  unique?: boolean;
  slidingtime?: string;
  finaltime?: string;
}

interface TokenBulkOptions {
  unique?: boolean;
  slidingtime?: string;
  finaltime?: string;
}

interface PolicyOptions {
  policyname: string;
  policydesc?: string;
  policy: any;
}

interface PolicyUpdateOptions {
  policyname?: string;
  policydesc?: string;
  policy: any;
}

interface SessionOptions {
  slidingtime?: string;
  finaltime?: string;
}

interface XTokenOptions {
  tokentype?: string;
  slidingtime?: string;
  finaltime?: string;
}

interface XTokenRoleOptions {
  rolename?: string;
  slidingtime?: string;
  finaltime?: string;
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
  patchUser(mode: string, identity: string, patch: any, requestMetadata?: RequestMetadata): Promise<any>;
  requestUserPatch(mode: string, identity: string, patch: any, requestMetadata?: RequestMetadata): Promise<any>;
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
   * @param {Object} [options={}] - Optional parameters for token creation
   * @param {string} [options.tokentype] - Type of token (e.g., 'access', 'refresh')
   * @param {string} [options.finaltime] - Absolute expiration time for the token
   * @param {string} [options.slidingtime] - Sliding time period for the token
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The created token information
   */
  createXToken(mode: string, identity: string, options?: XTokenOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Creates an access token for a role
   * @param {string|number} roleid - Role ID
   * @param {Object} [options={}] - Optional parameters for token creation
   * @param {string} [options.rolename] - Role name (alternative to roleid)
   * @param {string} [options.finaltime] - Absolute expiration time for the token
   * @param {string} [options.slidingtime] - Sliding time period for the token
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The created token information
   */
  createXTokenForRole(roleid: string | number, options?: XTokenRoleOptions, requestMetadata?: RequestMetadata): Promise<any>;

  // User Request Management
  getUserRequest(requestuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserRequests(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Cancels a user request
   * @param {string} requestuuid - UUID of the request to cancel
   * @param {Object} [options={}] - Optional parameters for cancellation
   * @param {string} [options.reason] - Reason for cancellation
   * @param {Object} [requestMetadata=null] - Optional request metadata
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
   * @param {Object} options - Agreement acceptance options
   * @param {string} options.brief - Unique identifier of the legal basis/agreement being accepted
   * @param {string} [options.agreementmethod] - Method of agreement (e.g., 'web-form', 'checkbox', 'signature')
   * @param {string} [options.lastmodifiedby] - Identifier of the person/system that last modified this agreement
   * @param {string} [options.referencecode] - External reference code or identifier for this acceptance
   * @param {string} [options.starttime] - Start time of the agreement validity (ISO 8601 format)
   * @param {string} [options.finaltime] - End time of the agreement validity (ISO 8601 format)
   * @param {string} [options.status] - Status of the agreement (e.g., 'pending', 'active', 'expired')
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
   * @param {Object} options - The processing activity options
   * @param {string} options.activity - Unique identifier for the processing activity
   * @param {string} [options.title] - Title of the processing activity
   * @param {string} [options.script] - Script or description of the processing activity
   * @param {string} [options.fulldesc] - Full description of the processing activity
   * @param {string} [options.applicableto] - What this activity applies to
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created processing activity
   */
  createProcessingActivity(options: ProcessingActivityOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Updates an existing processing activity
   * @param {string} activity - Current activity identifier
   * @param {Object} options - The processing activity update options
   * @param {string} [options.newactivity] - New activity identifier
   * @param {string} [options.title] - Title of the processing activity
   * @param {string} [options.script] - Script or description of the processing activity
   * @param {string} [options.fulldesc] - Full description of the processing activity
   * @param {string} [options.applicableto] - What this activity applies to
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The updated processing activity
   */
  updateProcessingActivity(activity: string, options: ProcessingActivityUpdateOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Deletes a processing activity
   * @param {string} activity - Activity identifier to delete
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The deletion result
   */
  deleteProcessingActivity(activity: string, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Links a processing activity to a legal basis
   * @param {string} activity - Activity identifier
   * @param {string} brief - Legal basis brief identifier
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The linking result
   */
  linkProcessingActivityToLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Unlinks a processing activity from a legal basis
   * @param {string} activity - Activity identifier
   * @param {string} brief - Legal basis brief identifier
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The unlinking result
   */
  unlinkProcessingActivityFromLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Connector Management
  listSupportedConnectors(requestMetadata?: RequestMetadata): Promise<any>;
  listConnectors(offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Creates a new database connector with the specified configuration
   * @param {Object} options - The connector configuration options
   * @param {string} options.connectorname - Name of the connector (e.g., "MySQL Production")
   * @param {string} options.connectortype - Type of the connector (e.g., 'mysql', 'postgresql', 'mongodb')
   * @param {string} options.apikey - API key for authentication with the database
   * @param {string} [options.username] - Username for database connection
   * @param {string} [options.connectordesc] - Description of the connector's purpose
   * @param {string} [options.dbhost] - Database host address (e.g., "db.example.com")
   * @param {number} [options.dbport] - Database port number (e.g., 3306 for MySQL)
   * @param {string} [options.dbname] - Name of the database to connect to
   * @param {string} [options.tablename] - Specific table name if applicable
   * @param {string} [options.status] - Status of the connector (e.g., 'active', 'inactive')
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
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
   * @param {string|number} groupname - Group name or ID to add the user to
   * @param {string|number|null} [rolename=null] - Optional role name or ID to assign to the user in the group
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<any>} The result of adding the user to the group
   */
  addUserToGroup(mode: string, identity: string, groupref: string | number, roleref?: string | number | null, requestMetadata?: RequestMetadata | null): Promise<any>;

  // Token Management (for example for credit cards)
  /**
   * Creates a token for sensitive data like credit card numbers
   * @param {string} tokentype - Type of token (e.g., 'creditcard') or 'email'
   * @param {string} record - The sensitive data to tokenize
   * @param {Object} [options={}] - Optional parameters for token creation
   * @param {string} [options.slidingtime] - Time period for token validity (e.g., '1d', '1h')
   * @param {string} [options.finaltime] - Absolute expiration time for the token
   * @param {boolean} [options.unique] - Whether to create a unique token for each request
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The created token information
   */
  createToken(tokentype: string, record: string, options?: TokenOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Creates multiple tokens in bulk for sensitive data
   * @param {Array<Object>} records - Array of records to tokenize, each containing tokentype and record
   * @param {Object} [options={}] - Optional parameters for token creation
   * @param {string} [options.slidingtime] - Time period for token validity (e.g., '1d', '1h')
   * @param {string} [options.finaltime] - Absolute expiration time for the token
   * @param {boolean} [options.unique] - Whether to create unique tokens for each request
   * @param {Object} [requestMetadata=null] - Optional request metadata
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
   * @param {Object} options - Tenant creation options
   * @param {string} options.tenantname - Name of the tenant
   * @param {string} options.tenantorg - Organization name
   * @param {string} options.email - Email address for tenant contact
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The created tenant information
   */
  createTenant(options: TenantOptions, requestMetadata?: RequestMetadata): Promise<any>;
  getTenant(tenantid: number, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Updates an existing tenant
   * @param {string} tenantid - ID of the tenant to update
   * @param {Object} options - Tenant update options
   * @param {string} options.tenantname - New name of the tenant
   * @param {string} options.tenantorg - New organization name
   * @param {string} options.email - New email address for tenant admin
   * @param {Object} [requestMetadata=null] - Optional request metadata
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

  // System Configuration
  getUIConf(): Promise<any>;
  getTenantConf(): Promise<any>;
  getUserHTMLReport(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  getUserReport(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Session Management
  upsertSession(sessionuuid: string, sessiondata: any, options?: SessionOptions, requestMetadata?: RequestMetadata): Promise<any>;
  deleteSession(sessionuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserSessions(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  getSession(sessionuuid: string, requestMetadata?: RequestMetadata): Promise<any>;

  // System Monitoring
  /**
   * Gets system statistics
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
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
  parsePrometheusMetrics(metricsText: string): Promise<any>;
  getSystemMetrics(requestMetadata?: RequestMetadata): Promise<any>;

  // Shared Records
  /**
   * Creates a shared record for a user
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode
   * @param {Object} [options={}] - Optional parameters for shared record creation
   * @param {Array<string>} [options.fields] - A string containing names of fields to share separated by commas
   * @param {string} [options.partner] - It is used as a refference to partner name. It is not enforced.
   * @param {string} [options.appname] - If defined, shows fields from the user app record instead user profile
   * @param {string} [options.finaltime] - Expiration time for the shared record
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created shared record information
   */
  createSharedRecord(mode: string, identity: string, options?: SharedRecordOptions, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Gets a shared record by its UUID
   * @param {string} recorduuid - UUID of the shared record to retrieve
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
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