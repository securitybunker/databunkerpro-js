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
export declare class DatabunkerproAPI {
    private baseURL;
    private xBunkerToken;
    private xBunkerTenant;
    constructor(baseURL: string, xBunkerToken?: string, xBunkerTenant?: string);
    private makeRequest;
    rawRequest(endpoint: string, method?: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<Blob>;
    createUser(profile: any, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
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
     *   finaltime: '100d',
     *   slidingtime: '30d'
     * });
     */
    createUsersBulk(records: any[], options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUser(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateUser(mode: string, identity: string, profile: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserUpdate(mode: string, identity: string, profile: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    patchUser(mode: string, identity: string, patch: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserPatch(mode: string, identity: string, patch: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestUserDeletion(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    loginUser(mode: string, identity: string, smscode: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    createCaptcha(requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserRequest(requestuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserRequests(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    cancelUserRequest(requestuuid: string, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    approveUserRequest(requestuuid: string, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    createAppData(mode: string, identity: string, appname: string, data: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    getAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateAppData(mode: string, identity: string, appname: string, data: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestAppDataUpdate(mode: string, identity: string, appname: string, data: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAppDataRecords(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAppDataNames(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAppNames(requestMetadata?: RequestMetadata | null): Promise<any>;
    createLegalBasis(options: LegalBasisOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateLegalBasis(brief: string, options: LegalBasisOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteLegalBasis(brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAgreements(requestMetadata?: RequestMetadata | null): Promise<any>;
    acceptAgreement(mode: string, identity: string, options: AgreementAcceptOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getUserAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    cancelAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    revokeAllAgreements(brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listProcessingActivities(requestMetadata?: RequestMetadata | null): Promise<any>;
    createProcessingActivity(options: ProcessingActivityOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateProcessingActivity(activity: string, options: ProcessingActivityUpdateOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteProcessingActivity(activity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    linkProcessingActivityToLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    unlinkProcessingActivityFromLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listSupportedConnectors(requestMetadata?: RequestMetadata | null): Promise<any>;
    listConnectors(offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    createConnector(options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateConnector(options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    validateConnectorConnectivity(options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteConnector(connectorid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    getTableMetadata(options: ConnectorOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorGetUserData(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorGetUserExtraData(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    connectorDeleteUser(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    createGroup(groupname: string, groupdesc?: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getGroup(groupid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    listAllGroups(requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserGroups(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateGroup(groupid: string | number, groupname: string, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteGroup(groupid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    removeUserFromGroup(mode: string, identity: string, groupid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    addUserToGroup(mode: string, identity: string, groupname: string | number, rolename?: string | number | null, requestMetadata?: RequestMetadata | null): Promise<any>;
    createXToken(mode: string, identity: string, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    createToken(tokentype: string, record: string, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    createTokensBulk(records: any[], options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    getToken(token: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteToken(token: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserAuditEvents(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    getAuditEvent(auditeventuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    createTenant(options: TenantOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    getTenant(tenantid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    updateTenant(tenantid: string | number, options: TenantOptions, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteTenant(tenantid: string | number, requestMetadata?: RequestMetadata | null): Promise<any>;
    listTenants(offset?: number, limit?: number, requestMetadata?: RequestMetadata | null): Promise<any>;
    createRole(rolename: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    linkPolicy(rolename: string, policyname: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    createPolicy(data: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    updatePolicy(policyid: string | number, data: any, requestMetadata?: RequestMetadata | null): Promise<any>;
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
    upsertSession(sessionuuid: string, sessiondata: any, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    deleteSession(sessionuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    listUserSessions(mode: string, identity: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getSession(sessionuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
    getSystemStats(requestMetadata?: RequestMetadata | null): Promise<any>;
    parsePrometheusMetrics(metricsText: string): Promise<any>;
    getSystemMetrics(requestMetadata?: RequestMetadata | null): Promise<any>;
    createSharedRecord(mode: string, identity: string, options?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
    getSharedRecord(recorduuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
}
export default DatabunkerproAPI;
declare global {
    interface Window {
        DatabunkerproAPI: typeof DatabunkerproAPI;
    }
}
