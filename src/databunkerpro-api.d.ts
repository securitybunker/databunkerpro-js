declare class DatabunkerproAPI {
  constructor(baseURL: string, xBunkerToken?: string);

  // Core request method
  private makeRequest(endpoint: string, method?: string, data?: any): Promise<any>;

  // User Management
  createUser(profile: object): Promise<any>;
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
  addUserToGroup(groupid: string | number, mode: string, identity: string, rolename?: string): Promise<any>;

  // Token Management
  createXToken(mode: string, identity: string): Promise<any>;

  // Audit Management
  listUserEvents(mode: string, identity: string): Promise<any>;
  getAuditEvent(auditeventuuid: string): Promise<any>;
} 
