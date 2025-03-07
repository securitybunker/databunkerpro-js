interface UserOptions {
    groupname?: string | number;
    groupid?: number;
    rolename?: string | number;
    roleid?: number;
    slidingtime?: string;
    expirationtime?: string;
}
export declare class DatabunkerproAPI {
    private baseURL;
    private xBunkerToken;
    constructor(baseURL: string, xBunkerToken?: string);
    private makeRequest;
    createUser(profile: Record<string, any>, options?: UserOptions): Promise<any>;
    getUser(mode: string, identity: string): Promise<any>;
    deleteUser(mode: string, identity: string): Promise<any>;
    changeUser(mode: string, identity: string, profile: Record<string, any>): Promise<any>;
    createAppData(mode: string, identity: string, appname: string, data: Record<string, any>): Promise<any>;
    getAppData(mode: string, identity: string, appname: string): Promise<any>;
    listAppNames(): Promise<any>;
    acceptAgreement(mode: string, identity: string, brief: string, agreementmethod: string, referencecode: string): Promise<any>;
    getAgreement(mode: string, identity: string, brief: string): Promise<any>;
    listUserAgreements(mode: string, identity: string): Promise<any>;
    createGroup(groupname: string, groupdesc?: string): Promise<any>;
    getGroup(groupid: string | number): Promise<any>;
    listAllGroups(): Promise<any>;
    addUserToGroup(groupname: string | number, mode: string, identity: string, rolename?: string | number): Promise<any>;
    createXToken(mode: string, identity: string): Promise<any>;
    listUserEvents(mode: string, identity: string): Promise<any>;
    getAuditEvent(auditeventuuid: string): Promise<any>;
    createTenant(data: Record<string, any>): Promise<any>;
    getTenant(tenantid: string | number): Promise<any>;
    renameTenant(tenantid: string | number, tenantname: string): Promise<any>;
    listTenants(): Promise<any>;
    createRole(rolename: string): Promise<any>;
    linkPolicy(rolename: string, policyname: string): Promise<any>;
    createPolicy(data: Record<string, any>): Promise<any>;
    listPolicies(): Promise<any>;
}
export default DatabunkerproAPI;
