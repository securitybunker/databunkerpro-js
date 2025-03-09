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
    getUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
    deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
    changeUser(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
    createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
    getAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata): Promise<any>;
    listAppNames(requestMetadata?: RequestMetadata): Promise<any>;
    acceptAgreement(mode: string, identity: string, brief: string, agreementmethod: string, referencecode: string, requestMetadata?: RequestMetadata): Promise<any>;
    getAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
    listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
    createGroup(groupname: string, groupdesc?: string, requestMetadata?: RequestMetadata): Promise<any>;
    getGroup(groupid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
    listAllGroups(requestMetadata?: RequestMetadata): Promise<any>;
    addUserToGroup(groupname: string | number, mode: string, identity: string, rolename?: string | number, requestMetadata?: RequestMetadata): Promise<any>;
    createXToken(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
    listUserEvents(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
    getAuditEvent(auditeventuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
    createTenant(data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
    getTenant(tenantid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
    renameTenant(tenantid: string | number, tenantname: string, requestMetadata?: RequestMetadata): Promise<any>;
    listTenants(requestMetadata?: RequestMetadata): Promise<any>;
    createRole(rolename: string, requestMetadata?: RequestMetadata): Promise<any>;
    linkPolicy(rolename: string, policyname: string, requestMetadata?: RequestMetadata): Promise<any>;
    createPolicy(data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
    listPolicies(requestMetadata?: RequestMetadata): Promise<any>;
    bulkListUnlock(requestMetadata?: RequestMetadata): Promise<any>;
    bulkListUsers(unlockuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
    bulkListGroupUsers(unlockuuid: string, groupname: string | number, requestMetadata?: RequestMetadata): Promise<any>;
    bulkListUserRequests(unlockuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
    bulkListAuditEvents(unlockuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
}
export default DatabunkerproAPI;
