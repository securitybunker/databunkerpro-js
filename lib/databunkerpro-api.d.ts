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
interface RequestMetadata {
    [key: string]: any;
}
export declare class DatabunkerproAPI {
    private baseURL;
    private xBunkerToken;
    private xBunkerTenant;
    constructor(baseURL: string, xBunkerToken?: string, xBunkerTenant?: string);
    private makeRequest;
    rawRequest(endpoint: string, method?: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<Blob>;
    createUser(profile: Record<string, any>, options?: UserOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUser(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserDeletion(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateUser(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserUpdate(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    loginUser(mode: string, identity: string, smscode: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestAppDataUpdate(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserAppDataRecords(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
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
    sessionUpsert(sessionuuid: string, data: Record<string, any>, requestMetadata?: RequestMetadata | null): Promise<any>;
    sessionDelete(sessionuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    sessionGet(sessionuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
}
export default DatabunkerproAPI;
declare global {
    interface Window {
        DatabunkerproAPI: typeof DatabunkerproAPI;
    }
}
