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
interface AgreementAcceptOptions {
    brief: string;
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
interface BasicOptions {
    finaltime?: string;
    slidingtime?: string;
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
export declare class DatabunkerproAPI {
    private baseURL;
    private xBunkerToken;
    private xBunkerTenant;
    constructor(baseURL: string, xBunkerToken?: string, xBunkerTenant?: string);
    private makeRequest;
    rawRequest(endpoint: string, method?: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<Blob>;
    createUser(profile: Record<string, any>, options?: UserOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates multiple users in bulk with their profiles and group information
     * @param records - Array of user records to create
     * @param options - Global options for all users
     * @param options.finaltime - Global expiration time for all users
     * @param options.slidingtime - Global sliding time period for all users
     * @param requestMetadata - Additional metadata to include with the request
     * @returns {Promise<any>} The created users information
     * @example
     * // Create multiple users with global time settings
     * const users = await api.createUsersBulk([
     *   {
     *     profile: { email: 'user1@example.com', name: 'User One' },
     *     groupname: 'premium',
     *     rolename: 'admin'
     *   },
     *   {
     *     profile: { email: 'user2@example.com', name: 'User Two' },
     *     groupid: 123,
     *     rolename: 'team-member'
     *   }
     * ], {
     *   finaltime: '2024-12-31',
     *   slidingtime: '30d'
     * });
     */
    createUsersBulk(records: Array<{
        profile: Record<string, any>;
        groupname?: string | number;
        groupid?: number;
        rolename?: string | number;
        roleid?: number;
    }>, options?: BasicOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUser(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserDeletion(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateUser(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserUpdate(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    loginUser(mode: string, identity: string, smscode: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    getAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestAppDataUpdate(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAppDataRecords(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAppNames(requestMetadata?: RequestMetadata | null): Promise<any>;
    createLegalBasis(options: LegalBasisOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Records user's acceptance of a legal basis/agreement
     * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
     * @param {string} identity - User's identifier corresponding to the mode (e.g., email address, phone number)
     * @param {AgreementAcceptOptions} options - Agreement acceptance options
     * @param {string} options.brief - Unique identifier of the legal basis/agreement being accepted
     * @param {string} [options.agreementmethod] - Method of agreement (e.g., 'web-form', 'checkbox', 'signature')
     * @param {string} [options.referencecode] - External reference code or identifier for this acceptance
     * @param {string} [options.starttime] - Start time of the agreement validity (ISO 8601 format)
     * @param {string} [options.finaltime] - End time of the agreement validity (ISO 8601 format)
     * @param {string} [options.status] - Status of the agreement (e.g., 'pending', 'active', 'expired')
     * @param {string} [options.lastmodifiedby] - Identifier of the person/system that last modified this agreement
     * @param {RequestMetadata} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<any>} The recorded agreement acceptance
     * @example
     * // Record user's acceptance of marketing consent with additional details
     * const acceptance = await api.acceptAgreement(
     *   'email',
     *   'user@example.com',
     *   {
     *     brief: 'marketing-consent',
     *     agreementmethod: 'web-form',
     *     referencecode: 'REF123',
     *     starttime: '2024-01-01T00:00:00Z',
     *     finaltime: '2025-01-01T00:00:00Z',
     *     status: 'active',
     *     lastmodifiedby: 'admin@company.com'
     *   }
     * );
     */
    acceptAgreement(mode: string, identity: string, options: AgreementAcceptOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    cancelAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAgreements(requestMetadata?: RequestMetadata | null): Promise<any>;
    listProcessingActivities(requestMetadata?: RequestMetadata | null): Promise<any>;
    createGroup(groupname: string, groupdesc?: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getGroup(groupid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAllGroups(requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Adds a user to a group with an optional role
     * @param mode User identification mode (e.g., 'email', 'phone', 'token')
     * @param identity User's identifier corresponding to the mode
     * @param groupname Group name or ID to add the user to
     * @param rolename Optional role name or ID to assign to the user in the group
     * @param requestMetadata Additional metadata to include with the request
     */
    addUserToGroup(mode: string, identity: string, groupname: string | number, rolename?: string | number | null, requestMetadata?: RequestMetadata | null): Promise<any>;
    createXToken(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates a token for sensitive data like credit card numbers
     * @param tokentype - Type of token (e.g., 'creditcard')
     * @param record - The sensitive data to tokenize
     * @param options - Optional parameters for token creation
     * @param options.slidingtime - Time period for token validity (e.g., '1d', '1h')
     * @param options.finaltime - Absolute expiration time for the token
     * @param options.unique - Whether to create a unique token for each request
     * @param requestMetadata - Optional request metadata
     */
    createToken(tokentype: string, record: string, options?: {
        slidingtime?: string;
        finaltime?: string;
        unique?: boolean;
    }, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates multiple tokens in bulk for sensitive data
     * @param records - Array of records to tokenize, each containing tokentype and record
     * @param options - Optional parameters for token creation
     * @param options.slidingtime - Time period for token validity (e.g., '1d', '1h')
     * @param options.finaltime - Absolute expiration time for the token
     * @param options.unique - Whether to create unique tokens for each request
     * @param requestMetadata - Optional request metadata
     */
    createTokensBulk(records: Record<string, any>[], options?: {
        slidingtime?: string;
        finaltime?: string;
        unique?: boolean;
    }, requestMetadata?: RequestMetadata | null): Promise<any>;
    getToken(token: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteToken(token: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserAuditEvents(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    getAuditEvent(auditeventuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    createTenant(data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    getTenant(tenantid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateTenant(tenantid: string | number, tenantname: string, tenantorg: string, email: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteTenant(tenantid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    listTenants(offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    createRole(rolename: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    linkPolicy(rolename: string, policyname: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    createPolicy(data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    updatePolicy(policyid: string | number, data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    getPolicy(policyname: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    listPolicies(requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListUnlock(requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListUsers(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListGroupUsers(unlockuuid: string, groupname: string | number, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListUserRequests(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListAuditEvents(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkListTokens(unlockuuid: string, tokens: string[], requestMetadata?: RequestMetadata | null): Promise<any>;
    bulkDeleteTokens(unlockuuid: string, tokens: string[], requestMetadata?: RequestMetadata | null): Promise<any>;
    getUIConf(): Promise<any>;
    getTenantConf(): Promise<any>;
    getUserHTMLReport(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserReport(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserRequest(requestuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserRequests(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    cancelUserRequest(requestuuid: string, reason?: string | null, requestMetadata?: RequestMetadata | null): Promise<any>;
    approveUserRequest(requestuuid: string, reason?: string | null, requestMetadata?: RequestMetadata | null): Promise<any>;
    listSupportedConnectors(requestMetadata?: RequestMetadata | null): Promise<any>;
    listConnectors(offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Creates a new database connector with the specified configuration
     * @param {ConnectorOptions} options - The connector configuration options
     * @param {string} [options.connectorname] - Name of the connector (e.g., "MySQL Production")
     * @param {string} [options.connectortype] - Type of the connector (e.g., 'mysql', 'postgresql', 'mongodb')
     * @param {string} [options.connectordesc] - Description of the connector's purpose
     * @param {string} [options.username] - Username for database connection
     * @param {string} [options.apikey] - API key for authentication with the database
     * @param {string} [options.dbhost] - Database host address (e.g., "db.example.com")
     * @param {number} [options.dbport] - Database port number (e.g., 3306 for MySQL)
     * @param {string} [options.dbname] - Name of the database to connect to
     * @param {string} [options.tablename] - Specific table name if applicable
     * @param {string} [options.status] - Status of the connector (e.g., 'active', 'inactive')
     * @param {RequestMetadata} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<any>} The created connector details
     */
    createConnector(options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateConnector(options: ConnectorOptions & {
        connectorid: string | number;
    }, requestMetadata?: RequestMetadata | null): Promise<any>;
    validateConnectorConnectivity(options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteConnector(connectorid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    getTableMetadata(options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorGetUserData(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorGetUserExtraData(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorDeleteUser(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    upsertSession(sessionuuid: string, sessiondata: Record<string, any>, options?: {
        slidingtime?: string;
        finaltime?: string;
    }, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteSession(sessionuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getSession(sessionuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Gets system statistics
     * @param {RequestMetadata} [requestMetadata=null] - Additional metadata to include with the request
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
    parsePrometheusMetrics(metricsText: string): Promise<Record<string, number>>;
    getSystemMetrics(requestMetadata?: RequestMetadata | null): Promise<Record<string, number>>;
    /**
     * Creates a shared record for a user
     * @param mode - User identification mode (e.g., 'email', 'phone', 'token')
     * @param identity - User's identifier corresponding to the mode
     * @param options - Optional parameters for shared record creation
     * @param requestMetadata - Additional metadata to include with the request
     * @returns {Promise<any>} The created shared record information
     * @example
     * // Create a shared record with specific fields
     * const sharedRecord = await api.createSharedRecord('email', 'user@example.com', {
     *   fields: 'name,email',
     *   partner: 'partner-org',
     *   appname: 'myapp',
     *   finaltime: '1d'
     * });
     */
    createSharedRecord(mode: string, identity: string, options?: SharedRecordOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    /**
     * Gets a shared record by its UUID
     * @param recorduuid - UUID of the shared record to retrieve
     * @param requestMetadata - Additional metadata to include with the request
     * @returns {Promise<any>} The shared record information
     * @example
     * // Get a shared record by UUID
     * const sharedRecord = await api.getSharedRecord('123e4567-e89b-12d3-a456-426614174000');
     */
    getSharedRecord(recorduuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
}
export default DatabunkerproAPI;
declare global {
    interface Window {
        DatabunkerproAPI: typeof DatabunkerproAPI;
    }
}
