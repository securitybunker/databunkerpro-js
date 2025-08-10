interface BasicOptions {
    finaltime?: string;
    slidingtime?: string;
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
interface AgreementAcceptOptions {
    agreementmethod?: string;
    referencecode?: string;
    starttime?: string;
    finaltime?: string;
    status?: string;
    lastmodifiedby?: string;
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
    connectorid?: string | number;
    connectorname?: string;
    connectortype?: string;
    apikey?: string;
    username?: string;
    connectordesc?: string;
    dbhost?: string;
    dbport?: number;
    dbname?: string;
    tablename?: string;
    status?: string;
}
interface RequestMetadata {
    [key: string]: any;
}
interface SharedRecordOptions {
    fields?: string;
    partner?: string;
    appname?: string;
    finaltime?: string;
}
interface TenantOptions {
    tenantname: string;
    tenantorg: string;
    email: string;
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
interface PatchOperation {
    op: string;
    path: string;
    value?: any;
}
interface PolicyOptions {
    policyname: string;
    policydesc?: string;
    policy: any;
}
export declare class DatabunkerproAPI {
    private baseURL;
    private xBunkerToken;
    private xBunkerTenant;
    constructor(baseURL: string, xBunkerToken?: string, xBunkerTenant?: string);
    private makeRequest;
    rawRequest(endpoint: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<Blob>;
    createUser(profile: any, options?: UserOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates multiple users in bulk with their profiles and group information
     * @param {Array<Object>} records - Array of user records to create
     * @param {Object} [options={}] - Global options for all users
     * @param {string} [options.finaltime] - Global expiration time for all users
     * @param {string} [options.slidingtime] - Global sliding time period for all users
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The created users information
     * @example
     * // Create multiple users with global time settings
     * const users = await api.createUsersBulk([
     *   {
     *     profile: { email: 'user1@example.com', name: 'User One' },
     *     groupname: 'premium'
     *   },
     *   {
     *     profile: { email: 'user2@example.com', name: 'User Two' },
     *     groupid: 123
     *   }
     * ], {
     *   finaltime: '100d',
     *   slidingtime: '30d'
     * });
     */
    createUsersBulk(records: any[], options?: BasicOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUser(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateUser(mode: string, identity: string, profile: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserUpdate(mode: string, identity: string, profile: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    patchUser(mode: string, identity: string, patch: PatchOperation[], requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserPatch(mode: string, identity: string, patch: PatchOperation[], requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserDeletion(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    loginUser(mode: string, identity: string, smscode: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    createCaptcha(requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates an access token for a user
     * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
     * @param {string} identity - User's identifier corresponding to the mode
     * @param {Object} [options={}] - Optional parameters for token creation
     * @param {string} [options.finaltime] - Absolute expiration time for the token
     * @param {string} [options.slidingtime] - Sliding time period for the token
     * @param {Object} [requestMetadata=null] - Optional request metadata
     * @returns {Promise<Object>} The created token information
     */
    createUserXToken(mode: string, identity: string, options?: BasicOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates an access token for a role
     * @param {string|number} roleid - Role ID
     * @param {Object} [options={}] - Optional parameters for token creation
     * @param {string} [options.finaltime] - Absolute expiration time for the token
     * @param {string} [options.slidingtime] - Sliding time period for the token
     * @param {Object} [requestMetadata=null] - Optional request metadata
     * @returns {Promise<Object>} The created token information
     */
    createRoleXToken(roleref: string | number, options?: BasicOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserRequest(requestuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserRequests(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Cancels a user request
     * @param {string} requestuuid - UUID of the request to cancel
     * @param {Object} [options={}] - Optional parameters for cancellation
     * @param {string} [options.reason] - Reason for cancellation
     * @param {Object} [requestMetadata=null] - Optional request metadata
     * @returns {Promise<Object>} The cancellation result
     */
    cancelUserRequest(requestuuid: string, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    approveUserRequest(requestuuid: string, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    createAppData(mode: string, identity: string, appname: string, appdata: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    getAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateAppData(mode: string, identity: string, appname: string, appdata: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestAppDataUpdate(mode: string, identity: string, appname: string, appdata: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAppDataNames(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAppNames(requestMetadata?: RequestMetadata | null): Promise<any>;
    createLegalBasis(options: LegalBasisOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateLegalBasis(brief: string, options: LegalBasisUpdateOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteLegalBasis(brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAgreements(requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Records user's acceptance of a legal basis/agreement
     * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
     * @param {string} identity - User's identifier corresponding to the mode (e.g., email address, phone number)
     * @param {string} brief - Unique identifier of the legal basis/agreement being accepted
     * @param {Object} [options={}] - Optional parameters for agreement acceptance
     * @param {string} [options.agreementmethod] - Method of agreement (e.g., 'web-form', 'checkbox', 'signature')
     * @param {string} [options.lastmodifiedby] - Identifier of the person/system that last modified this agreement
     * @param {string} [options.referencecode] - External reference code or identifier for this acceptance
     * @param {string} [options.starttime] - Start time of the agreement validity (ISO 8601 format)
     * @param {string} [options.finaltime] - End time of the agreement validity (ISO 8601 format)
     * @param {string} [options.status] - Status of the agreement (e.g., 'pending', 'active', 'expired')
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The recorded agreement acceptance
     * @example
     * // Record user's acceptance of marketing consent with additional details
     * const acceptance = await api.acceptAgreement(
     *   'email',
     *   'user@example.com',
     *   'marketing-consent',
     *   {
     *     agreementmethod: 'web-form',
     *     referencecode: 'REF123',
     *     starttime: '10d',
     *     finaltime: '100d',
     *     status: 'active',
     *     lastmodifiedby: 'admin@company.com'
     *   }
     * );
     */
    acceptAgreement(mode: string, identity: string, brief: string, options: AgreementAcceptOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    cancelAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    revokeAllAgreements(brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listProcessingActivities(requestMetadata?: RequestMetadata | null): Promise<any>;
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
    createProcessingActivity(options: ProcessingActivityOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateProcessingActivity(activity: string, options: ProcessingActivityUpdateOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Deletes a processing activity
     * @param {string} activity - Activity identifier to delete
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The deletion result
     */
    deleteProcessingActivity(activity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Links a processing activity to a legal basis
     * @param {string} activity - Activity identifier
     * @param {string} brief - Legal basis brief identifier
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The linking result
     */
    linkProcessingActivityToLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Unlinks a processing activity from a legal basis
     * @param {string} activity - Activity identifier
     * @param {string} brief - Legal basis brief identifier
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The unlinking result
     */
    unlinkProcessingActivityFromLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listSupportedConnectors(requestMetadata?: RequestMetadata | null): Promise<any>;
    listConnectors(offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    createConnector(options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateConnector(connectorid: number, options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    validateConnectorConnectivity(connectorref: string | number, options?: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteConnector(connectorref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    getTableMetadata(connectorref: string | number, options?: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorGetUserData(mode: string, identity: string, connectorref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorGetUserExtraData(mode: string, identity: string, connectorref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorDeleteUser(mode: string, identity: string, connectorref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    createGroup(options: GroupOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getGroup(groupref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAllGroups(requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserGroups(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateGroup(groupid: number, options: GroupOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteGroup(groupref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    removeUserFromGroup(mode: string, identity: string, groupref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    addUserToGroup(mode: string, identity: string, groupref: string | number, roleref?: string | number | null, requestMetadata?: RequestMetadata | null): Promise<any>;
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
     * @example
     * // Create a token with expiration
     * const token = await api.createToken('creditcard', '1234567890', {
     *   slidingtime: '1d',
     *   finaltime: '10d',
     *   unique: true
     * });
     */
    createToken(tokentype: string, record: string, options?: TokenOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates multiple tokens in bulk for sensitive data
     * @param {Array<Object>} records - Array of records to tokenize, each containing tokentype and record
     * @param {Object} [options={}] - Optional parameters for token creation
     * @param {string} [options.slidingtime] - Time period for token validity (e.g., '1d', '1h')
     * @param {string} [options.finaltime] - Absolute expiration time for the token
     * @param {boolean} [options.unique] - Whether to create unique tokens for each request
     * @param {Object} [requestMetadata=null] - Optional request metadata
     * @returns {Promise<Object>} The created tokens information
     * @example
     * // Create multiple tokens with expiration
     * const tokens = await api.createTokensBulk([
     *   { tokentype: 'creditcard', record: '1234567890' },
     *   { tokentype: 'creditcard', record: '0987654321' }
     * ], {
     *   slidingtime: '1d',
     *   finaltime: '10d',
     *   unique: true
     * });
     */
    createTokensBulk(records: any[], options?: TokenOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getToken(token: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteToken(token: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserAuditEvents(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    getAuditEvent(auditeventuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates a new tenant
     * @param {Object} options - Tenant creation options
     * @param {string} options.tenantname - Name of the tenant
     * @param {string} options.tenantorg - Organization name
     * @param {string} options.email - Email address for tenant contact
     * @param {Object} [requestMetadata=null] - Optional request metadata
     * @returns {Promise<Object>} The created tenant information
     * @example
     * // Create a tenant with organization and contact email
     * const tenant = await api.createTenant({
     *   tenantname: 'My Company',
     *   tenantorg: 'My Company',
     *   email: 'contact@mycompany.com'
     * });
     */
    createTenant(options: TenantOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getTenant(tenantid: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateTenant(tenantid: number, options: TenantOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteTenant(tenantid: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    listTenants(offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    createRole(options: RoleOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateRole(roleid: number, options: RoleOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    linkPolicy(roleref: string | number, policyref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    createPolicy(options: PolicyOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updatePolicy(policyid: number, options: PolicyOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getPolicy(policyref: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    listPolicies(requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListUnlock(requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListUsers(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListGroupUsers(unlockuuid: string, groupref: string | number, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListUserRequests(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListAuditEvents(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListTokens(unlockuuid: string, tokens: string[], requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkDeleteTokens(unlockuuid: string, tokens: string[], requestMetadata?: RequestMetadata | null): Promise<any>;
    getUIConf(): Promise<any>;
    getTenantConf(): Promise<any>;
    getUserHTMLReport(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserReport(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    upsertSession(sessionuuid: string, sessiondata: any, options?: BasicOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteSession(sessionuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserSessions(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getSession(sessionuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
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
    getSystemStats(requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Generates a wrapping key from three Shamir's Secret Sharing keys
     * @param {string} key1 - First Shamir secret sharing key
     * @param {string} key2 - Second Shamir secret sharing key
     * @param {string} key3 - Third Shamir secret sharing key
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} Generated wrapping key
     *
     * Response format:
     * {
     *   "status": "ok",
     *   "wrappingkey": "generated-wrapping-key-value"
     * }
     */
    generateWrappingKey(key1: string, key2: string, key3: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    parsePrometheusMetrics(metricsText: string): Promise<any>;
    getSystemMetrics(requestMetadata?: RequestMetadata | null): Promise<any>;
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
     * @example
     * // Create a shared record with specific fields
     * const sharedRecord = await api.createSharedRecord('email', 'user@example.com', {
     *   fields: 'name,email',
     *   partner: 'partner-org',
     *   appname: 'myapp',
     *   finaltime: '100d'
     * });
     */
    createSharedRecord(mode: string, identity: string, options?: SharedRecordOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Gets a shared record by its UUID
     * @param {string} recorduuid - UUID of the shared record to retrieve
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The shared record information
     * @example
     * // Get a shared record by UUID
     * const sharedRecord = await api.getSharedRecord('123e4567-e89b-12d3-a456-426614174000');
     */
    getSharedRecord(recorduuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
}
export default DatabunkerproAPI;
declare global {
    interface Window {
        DatabunkerAPI: typeof DatabunkerproAPI;
    }
}
