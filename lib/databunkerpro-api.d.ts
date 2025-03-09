interface UserOptions {
    groupname?: string | number;
    groupid?: number;
    rolename?: string | number;
    roleid?: number;
    slidingtime?: string;
    finaltime?: string;
    request_metadata?: Record<string, any>;
}
interface RequestMetadata {
    [key: string]: any;
}
export declare class DatabunkerproAPI {
    private baseURL;
    private xBunkerToken;
    constructor(baseURL: string, xBunkerToken?: string);
    private makeRequest;
    createUser(profile: Record<string, any>, options?: UserOptions): Promise<any>;
    getUser(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any>;
    deleteUser(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any>;
    changeUser(mode: string, identity: string, profile: Record<string, any>, request_metadata?: RequestMetadata): Promise<any>;
    createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, request_metadata?: RequestMetadata): Promise<any>;
    getAppData(mode: string, identity: string, appname: string, request_metadata?: RequestMetadata): Promise<any>;
    listAppNames(request_metadata?: RequestMetadata): Promise<any>;
    acceptAgreement(mode: string, identity: string, brief: string, agreementmethod: string, referencecode: string, request_metadata?: RequestMetadata): Promise<any>;
    getAgreement(mode: string, identity: string, brief: string, request_metadata?: RequestMetadata): Promise<any>;
    listUserAgreements(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any>;
    createGroup(groupname: string, groupdesc?: string, request_metadata?: RequestMetadata): Promise<any>;
    getGroup(groupid: string | number, request_metadata?: RequestMetadata): Promise<any>;
    listAllGroups(request_metadata?: RequestMetadata): Promise<any>;
    addUserToGroup(groupname: string | number, mode: string, identity: string, rolename?: string | number, request_metadata?: RequestMetadata): Promise<any>;
    createXToken(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any>;
    listUserEvents(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any>;
    getAuditEvent(auditeventuuid: string, request_metadata?: RequestMetadata): Promise<any>;
    createTenant(data: Record<string, any>, request_metadata?: RequestMetadata): Promise<any>;
    getTenant(tenantid: string | number, request_metadata?: RequestMetadata): Promise<any>;
    renameTenant(tenantid: string | number, tenantname: string, request_metadata?: RequestMetadata): Promise<any>;
    listTenants(request_metadata?: RequestMetadata): Promise<any>;
    createRole(rolename: string, request_metadata?: RequestMetadata): Promise<any>;
    linkPolicy(rolename: string, policyname: string, request_metadata?: RequestMetadata): Promise<any>;
    createPolicy(data: Record<string, any>, request_metadata?: RequestMetadata): Promise<any>;
    listPolicies(request_metadata?: RequestMetadata): Promise<any>;
    bulkListUnlock(request_metadata?: RequestMetadata): Promise<any>;
    bulkListUsers(unlockuuid: string, request_metadata?: RequestMetadata): Promise<any>;
    bulkListGroupUsers(unlockuuid: string, groupname: string | number, request_metadata?: RequestMetadata): Promise<any>;
    bulkListUserRequests(unlockuuid: string, request_metadata?: RequestMetadata): Promise<any>;
    bulkListAuditEvents(unlockuuid: string, request_metadata?: RequestMetadata): Promise<any>;
}
export default DatabunkerproAPI;
