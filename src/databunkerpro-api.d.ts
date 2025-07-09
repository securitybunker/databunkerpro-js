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
  connectorname?: string;
  connectortype?: string;
  connectordesc?: string;
  connectorid?: string | number;
  username?: string;
  apikey?: string;
  dbhost?: string;
  dbport?: number;
  dbname?: string;
  tablename?: string;
  status?: string;
}

interface AgreementOptions {
  brief: string;
  agreementmethod?: string;
  lastmodifiedby?: string;
  referencecode?: string;
  starttime?: string;
  finaltime?: string;
  status?: string;
}

interface SharedRecordOptions {
  fields?: string;  // A string containing names of fields to share separated by commas
  partner?: string; // It is used as a reference to partner name. It is not enforced.
  appname?: string; // If defined, shows fields from the user app record instead of user profile
  finaltime?: string; // Expiration time for the shared record
}

interface BasicOptions {
  finaltime?: string;
  slidingtime?: string;
}

interface AgreementAcceptOptions {
  brief: string;
  agreementmethod?: string;
  lastmodifiedby?: string;
  referencecode?: string;
  starttime?: string;
  finaltime?: string;
  status?: string;
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

interface TenantOptions {
  tenantname: string;
  tenantorg: string;
  email: string;
}

declare class DatabunkerproAPI {
  constructor(baseURL: string, xBunkerToken?: string, xBunkerTenant?: string);

  // Core request methods
  private makeRequest(endpoint: string, method?: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<any>;
  rawRequest(endpoint: string, method?: string, data?: any, requestMetadata?: RequestMetadata | null): Promise<Blob>;

  // User Management
  createUser(profile: any, options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  /**
   * Creates multiple users in bulk with their profiles and group information
   * @param records - Array of user records to create
   * @param options - Global options for all users
   * @param options.finaltime - Global expiration time for all users
   * @param options.slidingtime - Global sliding time period for all users
   * @param requestMetadata - Additional metadata to include with the request
   */
  createUsersBulk(records: any[], options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  getUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  updateUser(mode: string, identity: string, profile: any, requestMetadata?: RequestMetadata): Promise<any>;
  requestUserUpdate(mode: string, identity: string, profile: any, requestMetadata?: RequestMetadata): Promise<any>;
  patchUser(mode: string, identity: string, patch: any, requestMetadata?: RequestMetadata): Promise<any>;
  requestUserPatch(mode: string, identity: string, patch: any, requestMetadata?: RequestMetadata): Promise<any>;
  deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  requestUserDeletion(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;

  // User Authentication
  preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata?: RequestMetadata): Promise<any>;
  loginUser(mode: string, identity: string, smscode: string, requestMetadata?: RequestMetadata): Promise<any>;
  createCaptcha(requestMetadata?: RequestMetadata): Promise<any>;

  // User Request Management
  getUserRequest(requestuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserRequests(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  cancelUserRequest(requestuuid: string, options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  approveUserRequest(requestuuid: string, options?: any, requestMetadata?: RequestMetadata): Promise<any>;

  // App Data Management
  createAppData(mode: string, identity: string, appname: string, data: any, requestMetadata?: RequestMetadata): Promise<any>;
  getAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata): Promise<any>;
  updateAppData(mode: string, identity: string, appname: string, data: any, requestMetadata?: RequestMetadata): Promise<any>;
  requestAppDataUpdate(mode: string, identity: string, appname: string, data: any, requestMetadata?: RequestMetadata): Promise<any>;
  listAppDataRecords(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  listAppDataNames(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  listAppNames(requestMetadata?: RequestMetadata): Promise<any>;

  // Legal Basis Management
  createLegalBasis(options: LegalBasisOptions, requestMetadata?: RequestMetadata): Promise<any>;
  updateLegalBasis(brief: string, options: LegalBasisOptions, requestMetadata?: RequestMetadata): Promise<any>;
  deleteLegalBasis(brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  listAgreements(requestMetadata?: RequestMetadata): Promise<any>;

  // Agreement Management
  acceptAgreement(mode: string, identity: string, options: AgreementAcceptOptions, requestMetadata?: RequestMetadata): Promise<any>;
  getUserAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  cancelAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  revokeAllAgreements(brief: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Processing Activity Management
  listProcessingActivities(requestMetadata?: RequestMetadata): Promise<any>;
  createProcessingActivity(options: ProcessingActivityOptions, requestMetadata?: RequestMetadata): Promise<any>;
  updateProcessingActivity(activity: string, options: ProcessingActivityUpdateOptions, requestMetadata?: RequestMetadata): Promise<any>;
  deleteProcessingActivity(activity: string, requestMetadata?: RequestMetadata): Promise<any>;
  linkProcessingActivityToLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;
  unlinkProcessingActivityFromLegalBasis(activity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Connector Management
  listSupportedConnectors(requestMetadata?: RequestMetadata): Promise<any>;
  listConnectors(offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  createConnector(options: ConnectorOptions, requestMetadata?: RequestMetadata): Promise<any>;
  updateConnector(options: ConnectorOptions, requestMetadata?: RequestMetadata): Promise<any>;
  validateConnectorConnectivity(options: ConnectorOptions, requestMetadata?: RequestMetadata): Promise<any>;
  deleteConnector(connectorid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  getTableMetadata(options: ConnectorOptions, requestMetadata?: RequestMetadata): Promise<any>;
  connectorGetUserData(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  connectorGetUserExtraData(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  connectorDeleteUser(mode: string, identity: string, connectorid: string | number, requestMetadata?: RequestMetadata): Promise<any>;

  // Group Management
  createGroup(groupname: string, groupdesc?: string, requestMetadata?: RequestMetadata): Promise<any>;
  getGroup(groupid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  listAllGroups(requestMetadata?: RequestMetadata): Promise<any>;
  listUserGroups(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  updateGroup(groupid: string | number, groupname: string, options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  deleteGroup(groupid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  removeUserFromGroup(mode: string, identity: string, groupid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  addUserToGroup(mode: string, identity: string, groupname: string | number, rolename?: string | number, requestMetadata?: RequestMetadata): Promise<any>;

  // Token Management
  createXToken(mode: string, identity: string, options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  createToken(tokentype: string, record: string, options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  createTokensBulk(records: any[], options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  getToken(token: string, requestMetadata?: RequestMetadata): Promise<any>;
  deleteToken(token: string, requestMetadata?: RequestMetadata): Promise<any>;
  listTokensBulk(tokens: string[], requestMetadata?: RequestMetadata): Promise<any>;
  deleteTokensBulk(tokens: string[], requestMetadata?: RequestMetadata): Promise<any>;

  // Audit Management
  listUserAuditEvents(mode: string, identity: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  getAuditEvent(auditeventuuid: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Tenant Management
  createTenant(options: TenantOptions, requestMetadata?: RequestMetadata): Promise<any>;
  getTenant(tenantid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  updateTenant(tenantid: string | number, options: TenantOptions, requestMetadata?: RequestMetadata): Promise<any>;
  deleteTenant(tenantid: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  listTenants(offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;

  // Role Management
  createRole(rolename: string, requestMetadata?: RequestMetadata): Promise<any>;
  linkPolicy(rolename: string, policyname: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Policy Management
  createPolicy(data: any, requestMetadata?: RequestMetadata): Promise<any>;
  updatePolicy(policyid: string | number, data: any, requestMetadata?: RequestMetadata): Promise<any>;
  getPolicy(policyname: string | number, requestMetadata?: RequestMetadata): Promise<any>;
  listPolicies(requestMetadata?: RequestMetadata): Promise<any>;

  // Bulk Operations
  bulkListUnlock(requestMetadata?: RequestMetadata): Promise<any>;
  bulkListUsers(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  bulkListGroupUsers(unlockuuid: string, groupname: string | number, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  bulkListUserRequests(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  bulkListAuditEvents(unlockuuid: string, offset?: number, limit?: number, requestMetadata?: RequestMetadata): Promise<any>;
  bulkListTokens(unlockuuid: string, tokens: string[], requestMetadata?: RequestMetadata): Promise<any>;
  bulkDeleteTokens(unlockuuid: string, tokens: string[], requestMetadata?: RequestMetadata): Promise<any>;

  // System Configuration
  getUIConf(): Promise<any>;
  getTenantConf(): Promise<any>;
  getUserHTMLReport(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  getUserReport(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;

  // Session Management
  upsertSession(sessionuuid: string, sessiondata: any, options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  deleteSession(sessionuuid: string, requestMetadata?: RequestMetadata): Promise<any>;
  listUserSessions(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any>;
  getSession(sessionuuid: string, requestMetadata?: RequestMetadata): Promise<any>;

  // System Monitoring
  getSystemStats(requestMetadata?: RequestMetadata): Promise<any>;
  parsePrometheusMetrics(metricsText: string): Promise<any>;
  getSystemMetrics(requestMetadata?: RequestMetadata): Promise<any>;

  // Shared Records
  createSharedRecord(mode: string, identity: string, options?: any, requestMetadata?: RequestMetadata): Promise<any>;
  getSharedRecord(recorduuid: string, requestMetadata?: RequestMetadata): Promise<any>;
}

declare global {
  interface Window {
    DatabunkerproAPI: typeof DatabunkerproAPI;
  }
}
export default DatabunkerproAPI; 