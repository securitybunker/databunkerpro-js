interface RequestOptions {
  method: string;
  headers: {
    [key: string]: string;
  };
  body?: string;
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

export class DatabunkerproAPI {
  private baseURL: string;
  private xBunkerToken: string;

  constructor(baseURL: string, xBunkerToken: string = '') {
    this.baseURL = baseURL;
    this.xBunkerToken = xBunkerToken;
  }

  private async makeRequest(endpoint: string, method: string = 'POST', data: any = null, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    if (this.xBunkerToken) {
      headers['X-Bunker-Token'] = this.xBunkerToken;
    }

    const options: RequestOptions = {
      method,
      headers,
    };

    if (data || requestMetadata) {
      const bodyData = data ? { ...data } : {};
      if (requestMetadata) {
        bodyData.request_metadata = requestMetadata;
      }
      options.body = JSON.stringify(bodyData);
    }

    const url = `${this.baseURL}/v2/${endpoint}`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        if (result.status) {
          return result;
        } else {
          throw new Error(result.message || 'API request failed');
        }
      }

      return result;
    } catch (error) {
      console.error('Error making request:', error);
    }
  }

  async rawRequest(endpoint: string, method: string = 'POST', data: any = null, requestMetadata: RequestMetadata | null = null): Promise<Blob> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    if (this.xBunkerToken) {
      headers['X-Bunker-Token'] = this.xBunkerToken;
    }

    const options: RequestOptions = {
      method,
      headers,
    };

    if (data || requestMetadata) {
      const bodyData = data ? { ...data } : {};
      if (requestMetadata) {
        bodyData.request_metadata = requestMetadata;
      }
      options.body = JSON.stringify(bodyData);
    }

    const response = await fetch(`${this.baseURL}/v2/${endpoint}`, options);
    const result = await response.blob();

    return result;
  }

  // User Management
  async createUser(profile: Record<string, any>, options: UserOptions = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { profile };
    // Handle groupname/groupid
    if (options.groupname) {
      // Check if groupname is actually a numeric id
      if (Number.isInteger(Number(options.groupname))) {
        data.groupid = options.groupname;
      } else {
        data.groupname = options.groupname;
      }
    } else if (options.groupid) {
      data.groupid = options.groupid;
    }
    // Handle rolename/roleid
    if (options.rolename) {
      // Check if rolename is actually a numeric id
      if (Number.isInteger(Number(options.rolename))) {
        data.roleid = options.rolename;
      } else {
        data.rolename = options.rolename;
      }
    } else if (options.roleid) {
      data.roleid = options.roleid;
    }
    // Handle time parameters
    if (options.slidingtime) {
      data.slidingtime = options.slidingtime;
    }
    if (options.finaltime) {
      data.finaltime = options.finaltime;
    }
    return this.makeRequest('UserCreate', 'POST', data, requestMetadata);
  }

  async getUser(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, requestMetadata);
  }

  async deleteUser(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, requestMetadata);
  }

  async requestUserDeletion(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserDeleteRequest', 'POST', { mode, identity }, requestMetadata);
  }

  async updateUser(mode: string, identity: string, profile: Record<string, any>, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserUpdate', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async requestUserUpdate(mode: string, identity: string, profile: Record<string, any>, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserUpdateRequest', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserPrelogin', 'POST', { mode, identity, code, captchacode }, requestMetadata);
  }

  async loginUser(mode: string, identity: string, smscode: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserLogin', 'POST', { mode, identity, smscode }, requestMetadata);
  }

  // App Data Management
  async createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async getUserAppData(mode: string, identity: string, appname: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname }, requestMetadata);
  }

  async updateAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataUpdate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async requestAppDataUpdate(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataUpdateRequest', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async listUserAppDataRecords(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataListUserAppNames', 'POST', { mode, identity }, requestMetadata);
  }

  async listAppNames(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataListAppNames', 'POST', null, requestMetadata);
  }

  // Agreement Management
  async createLegalBasis(options: LegalBasisOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('LegalBasisCreate', 'POST', options, requestMetadata);
  }

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
  async acceptAgreement(mode: string, identity: string, options: AgreementAcceptOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { 
      mode, 
      identity, 
      brief: options.brief,
      agreementmethod: options.agreementmethod,
      referencecode: options.referencecode,
      starttime: options.starttime,
      finaltime: options.finaltime,
      status: options.status,
      lastmodifiedby: options.lastmodifiedby
    };
    return this.makeRequest('AgreementAccept', 'POST', data, requestMetadata);
  }

  async cancelAgreement(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementCancel', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementCancelRequest', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async getUserAgreement(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async listUserAgreements(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity }, requestMetadata);
  }

  async listAgreements(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('LegalBasisListAgreements', 'POST', null, requestMetadata);
  }

  async listProcessingActivities(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityListActivities', 'POST', null, requestMetadata);
  }

  // Group Management
  async createGroup(groupname: string, groupdesc: string = '', requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('GroupCreate', 'POST', { groupname, groupdesc }, requestMetadata);
  }

  async getGroup(groupid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('GroupGet', 'POST', { groupid }, requestMetadata);
  }

  async listAllGroups(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('GroupListAllGroups', 'POST', null, requestMetadata);
  }

  /**
   * Adds a user to a group with an optional role
   * @param mode User identification mode (e.g., 'email', 'phone', 'token')
   * @param identity User's identifier corresponding to the mode
   * @param groupname Group name or ID to add the user to
   * @param rolename Optional role name or ID to assign to the user in the group
   * @param requestMetadata Additional metadata to include with the request
   */
  async addUserToGroup(mode: string, identity: string, groupname: string | number, rolename: string | number | null = null, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { mode, identity };
 
    // Check if groupname is an integer (group ID) or string (group name)
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }

    if (rolename) {
      // Check if rolename is an integer (role ID) or string (role name)
      if (Number.isInteger(Number(rolename))) {
        data.roleid = rolename;
      } else {
        data.rolename = rolename;
      }
    }
    
    return this.makeRequest('GroupAddUser', 'POST', data, requestMetadata);
  }

  // Token Management
  async createXToken(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('XTokenCreate', 'POST', { mode, identity }, requestMetadata);
  }

  // Audit Management
  async listUserAuditEvents(mode: string, identity: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, offset, limit };
    return this.makeRequest('AuditListUserEvents', 'POST', data, requestMetadata);
  }

  async getAuditEvent(auditeventuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid }, requestMetadata);
  }

  // Tenant Management
  async createTenant(data: Record<string, any>, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TenantCreate', 'POST', data, requestMetadata);
  }

  async getTenant(tenantid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TenantGet', 'POST', { tenantid }, requestMetadata);
  }

  async updateTenant(tenantid: string | number, tenantname: string, tenantorg: string, email: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { tenantid, tenantname, tenantorg, email };
    return this.makeRequest('TenantUpdate', 'POST', data, requestMetadata);
  }

  async deleteTenant(tenantid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TenantDelete', 'POST', { tenantid }, requestMetadata);
  }

  async listTenants(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TenantListTenants', 'POST', null, requestMetadata);
  }

  // Role Management
  async createRole(rolename: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('RoleCreate', 'POST', { rolename }, requestMetadata);
  }

  async linkPolicy(rolename: string, policyname: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('RoleLinkPolicy', 'POST', { rolename, policyname }, requestMetadata);
  }

  // Policy Management
  async createPolicy(data: Record<string, any>, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('PolicyCreate', 'POST', data, requestMetadata);
  }

  async listPolicies(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('PolicyListAllPolicies', 'POST', null, requestMetadata);
  }

  // Bulk Operations
  async bulkListUnlock(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('BulkListUnlock', 'POST', null, requestMetadata);
  }

  async bulkListUsers(unlockuuid: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, offset, limit };
    return this.makeRequest('BulkListUsers', 'POST', data, requestMetadata);
  }

  async bulkListGroupUsers(unlockuuid: string, groupname: string | number, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { unlockuuid, offset, limit };
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }
    return this.makeRequest('BulkListGroupUsers', 'POST', data, requestMetadata);
  }

  async bulkListUserRequests(unlockuuid: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, offset, limit };
    return this.makeRequest('BulkListUserRequests', 'POST', data, requestMetadata);
  }

  async bulkListAuditEvents(unlockuuid: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, offset, limit };
    return this.makeRequest('BulkListAuditEvents', 'POST', data, requestMetadata);
  }

  // System Configuration
  async getUIConf(): Promise<any> {
    return this.makeRequest('TenantGetUIConf', 'POST');
  }

  async getTenantConf(): Promise<any> {
    return this.makeRequest('TenantGetConf', 'POST');
  }

  // User Request Management
  async getUserRequest(requestuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserRequestGet', 'POST', { requestuuid }, requestMetadata);
  }

  async listUserRequests(mode: string, identity: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, offset, limit };
    return this.makeRequest('UserRequestListUserRequests', 'POST', data, requestMetadata);
  }

  async cancelUserRequest(requestuuid: string, reason: string | null = null, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserRequestCancel', 'POST', { requestuuid, reason }, requestMetadata);
  }

  async approveUserRequest(requestuuid: string, reason: string | null = null, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserRequestApprove', 'POST', { requestuuid, reason }, requestMetadata);
  }

  // Connector Management
  async listSupportedConnectors(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorsListSupportedConnectors', 'POST', null, requestMetadata);
  }

  async listConnectors(offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { offset, limit };
    return this.makeRequest('ConnectorsListConnectors', 'POST', data, requestMetadata);
  }

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
  async createConnector(options: ConnectorOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      connectorname: options.connectorname,
      connectortype: options.connectortype,
      connectordesc: options.connectordesc,
      username: options.username,
      apikey: options.apikey,
      dbhost: options.dbhost,
      dbport: options.dbport,
      dbname: options.dbname,
      tablename: options.tablename,
      status: options.status
    };
    return this.makeRequest('ConnectorsCreateConnector', 'POST', data, requestMetadata);
  }

  /**
   * Updates an existing connector configuration
   * @param {ConnectorOptions} options - The connector configuration options
   * @param {string|number} [options.connectorid] - ID of the connector to update
   * @param {string} [options.connectorname] - Updated name of the connector
   * @param {string} [options.connectortype] - Updated type of the connector
   * @param {string} [options.connectordesc] - Updated description of the connector
   * @param {string} [options.username] - Updated username for database connection
   * @param {string} [options.apikey] - Updated API key for authentication
   * @param {string} [options.dbhost] - Updated database host address
   * @param {number} [options.dbport] - Updated database port number
   * @param {string} [options.dbname] - Updated database name
   * @param {string} [options.status] - Updated connector status
   * @param {RequestMetadata} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<any>} The updated connector details
   */
  async updateConnector(options: ConnectorOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      connectorid: options.connectorid,
      connectorname: options.connectorname,
      connectortype: options.connectortype,
      connectordesc: options.connectordesc,
      username: options.username,
      apikey: options.apikey,
      dbhost: options.dbhost,
      dbport: options.dbport,
      dbname: options.dbname,
      tablename: options.tablename,
      status: options.status
    };
    return this.makeRequest('ConnectorsUpdateConnector', 'POST', data, requestMetadata);
  }

  async validateConnectorConnectivity(options: ConnectorOptions = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      connectorid: options.connectorid,
      connectorname: options.connectorname,
      connectortype: options.connectortype,
      connectordesc: options.connectordesc,
      username: options.username,
      apikey: options.apikey,
      dbhost: options.dbhost,
      dbport: options.dbport,
      dbname: options.dbname,
      tablename: options.tablename,
      status: options.status
    };
    return this.makeRequest('ConnectorsValidateConnectivity', 'POST', data, requestMetadata);
  }

  async getTableMetadata(options: ConnectorOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      connectorid: options.connectorid,
      connectorname: options.connectorname,
      connectortype: options.connectortype,
      connectordesc: options.connectordesc,
      username: options.username,
      apikey: options.apikey,
      dbhost: options.dbhost,
      dbport: options.dbport,
      dbname: options.dbname,
      tablename: options.tablename,
      status: options.status
    };
    return this.makeRequest('ConnectorGetTableMetaData', 'POST', data, requestMetadata);
  }

  async connectorsGetUserData(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorsGetUserData', 'POST', { mode, identity, connectorid }, requestMetadata);
  }

  async connectorsGetUserExtraData(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorsGetUserExtraData', 'POST', { mode, identity, connectorid }, requestMetadata);
  }

  async connectorsDeleteUser(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorsDeleteUser', 'POST', { mode, identity, connectorid }, requestMetadata);
  }
}

// Export for Node.js and browser environments
export default DatabunkerproAPI;
declare global {
  interface Window {
    DatabunkerproAPI: typeof DatabunkerproAPI;
  }
} 