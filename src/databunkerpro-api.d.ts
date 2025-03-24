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

interface UserOptions {
  groupname?: string | number;
  groupid?: number;
  rolename?: string | number;
  roleid?: number;
  slidingtime?: string;
  finaltime?: string;
}

interface ConnectorOptions {
  connectorname: string;
  connectortype: string;
  apikey: string;
  connectorid?: string | number;
  username?: string;
  connectordesc?: string;
  dbhost?: string;
  dbport?: number;
  dbname?: string;
  tablename?: string;
  status?: string;
}

declare class DatabunkerproAPI {
  constructor(baseURL: string, xBunkerToken?: string);

  // Core request methods
  private makeRequest(endpoint: string, method?: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
  rawRequest(endpoint: string, method?: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<Blob>;

  // User Management
  createUser(profile: Record<string, any>, options?: UserOptions, requestMetadata?: RequestMetadata): Promise<any>;
  getUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  requestUserDeletion(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  updateUser(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
  requestUserUpdate(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
  preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata?: RequestMetadata): Promise<any>;
  loginUser(mode: string, identity: string, smscode: string, requestMetadata?: RequestMetadata): Promise<any>;

  // User Request Management
  getUserRequest(requestuuid: string, requestMetadata?: RequestMetadata | null): Promise<any>;
  listUserRequests(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  cancelUserRequest(requestuuid: string, reason?: string | null, requestMetadata?: RequestMetadata): Promise<any>;
  approveUserRequest(requestuuid: string, reason?: string | null, requestMetadata?: RequestMetadata): Promise<any>;

  // App Data Management
  createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
  getUserAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata): Promise<any>;
  updateAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
  requestAppDataUpdate(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
  listUserAppDataRecords(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  listAppNames(requestMetadata?: RequestMetadata): Promise<any>;

  // Agreement Management
  createLegalBasis(options: LegalBasisOptions, requestMetadata?: RequestMetadata): Promise<any>;
  acceptAgreement(mode: string, identity: string, brief: string, agreementmethod?: string | null, referencecode?: string | null, requestMetadata?: RequestMetadata): Promise<any>;
  cancelAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  getUserAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  listAgreements(requestMetadata?: RequestMetadata): Promise<any>;
  listProcessingActivities(requestMetadata?: RequestMetadata): Promise<any>;

  // Connector Management
  listSupportedConnectors(requestMetadata?: RequestMetadata): Promise<any>;
  listConnectors(offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  createConnector(options: ConnectorOptions, requestMetadata?: RequestMetadata): Promise<any>;
  updateConnector(options: ConnectorOptions & { connectorid: string | number }, requestMetadata?: RequestMetadata): Promise<any>;
  validateConnectorConnectivity(options?: ConnectorOptions, requestMetadata?: RequestMetadata): Promise<any>;
  connectorsGetUserData(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  connectorsGetUserExtraData(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  connectorsDeleteUser(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  connectorsGetTableMetadata(connectorid: string | number, apikey: string, username: string, connectortype: string, dbhost: string, dbname: string, tablename: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Group Management
  createGroup(groupname: string, groupdesc?: string, requestMetadata?: RequestMetadata): Promise<any>;
  getGroup(groupid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  listAllGroups(requestMetadata?: RequestMetadata): Promise<any>;
  addUserToGroup(mode: string, identity: string, groupname: string | number, rolename?: string | number | null, requestMetadata?: RequestMetadata): Promise<any>;

  // Token Management
  createXToken(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Audit Management
  listUserAuditEvents(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  getAuditEvent(auditeventuuid: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Tenant Management
  createTenant(data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
  getTenant(tenantid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  updateTenant(tenantid: string | number, tenantname: string, tenantorg: string, email: string, requestMetadata?: RequestMetadata): Promise<any>;
  deleteTenant(tenantid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  listTenants(requestMetadata?: RequestMetadata): Promise<any>;

  // Role Management
  createRole(rolename: string, requestMetadata?: RequestMetadata): Promise<any>;
  linkPolicy(rolename: string, policyname: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Policy Management
  createPolicy(data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any>;
  listPolicies(requestMetadata?: RequestMetadata): Promise<any>;

  // Bulk Operations
  bulkListUnlock(requestMetadata?: RequestMetadata): Promise<any>;
  bulkListUsers(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  bulkListGroupUsers(unlockuuid: string, groupname: string | number, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  bulkListUserRequests(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  bulkListAuditEvents(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;

  // System Configuration
  getUIConf(): Promise<any>;
  getTenantConf(): Promise<any>;
}

declare global {
  interface Window {
    DatabunkerproAPI: typeof DatabunkerproAPI;
  }
}

export default DatabunkerproAPI; 
