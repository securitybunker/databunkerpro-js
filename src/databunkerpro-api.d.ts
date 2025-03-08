declare class DatabunkerproAPI {
  constructor(baseURL: string, xBunkerToken?: string);

  // Core request method
  private makeRequest(endpoint: string, method?: string, data?: any): Promise<any>;

  // User Management
  createUser(profile: object, options?: {
    groupname?: string | number;
    groupid?: number;
    rolename?: string | number;
    roleid?: number;
    slidingtime?: string;
    finaltime?: string;
  }): Promise<any>;
  getUser(mode: string, identity: string): Promise<any>;
  deleteUser(mode: string, identity: string): Promise<any>;
  changeUser(mode: string, identity: string, profile: object): Promise<any>;

  // App Data Management
  createAppData(mode: string, identity: string, appname: string, data: object): Promise<any>;
  getAppData(mode: string, identity: string, appname: string): Promise<any>;
  listAppNames(): Promise<any>;

  // Agreement Management
  acceptAgreement(mode: string, identity: string, brief: string, agreementmethod: string, referencecode: string): Promise<any>;
  getAgreement(mode: string, identity: string, brief: string): Promise<any>;
  listUserAgreements(mode: string, identity: string): Promise<any>;

  // Group Management
  createGroup(groupname: string, groupdesc?: string): Promise<any>;
  getGroup(groupid: string | number): Promise<any>;
  listAllGroups(): Promise<any>;
  addUserToGroup(groupname: string | number, mode: string, identity: string, rolename?: string | number): Promise<any>;

  // Token Management
  createXToken(mode: string, identity: string): Promise<any>;

  // Audit Management
  listUserEvents(mode: string, identity: string): Promise<any>;
  getAuditEvent(auditeventuuid: string): Promise<any>;

  // Tenant Management
  createTenant(data: object): Promise<any>;
  getTenant(tenantid: string | number): Promise<any>;
  renameTenant(tenantid: string | number, tenantname: string): Promise<any>;
  listTenants(): Promise<any>;

  // Role Management
  createRole(rolename: string): Promise<any>;
  linkPolicy(rolename: string, policyname: string): Promise<any>;

  // Policy Management
  createPolicy(data: object): Promise<any>;
  listPolicies(): Promise<any>;

  // Bulk Operations

  bulkListUnlock(): Promise<any>;
  bulkListUsers(unlockuuid: string): Promise<any>;
  bulkListGroupUsers(unlockuuid: string, groupname: string | number): Promise<any>;
  bulkListUserRequests(unlockuuid: string): Promise<any>;
  bulkListAuditEvents(unlockuuid: string): Promise<any>;
} 
