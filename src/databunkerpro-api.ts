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

interface BasicOptions {
  finaltime?: string;
  slidingtime?: string;
}

interface RequestMetadata {
  [key: string]: any;
}

interface SharedRecordOptions {
  fields?: string;  // A string containing names of fields to share separated by commas
  partner?: string; // It is used as a reference to partner name. It is not enforced.
  appname?: string; // If defined, shows fields from the user app record instead of user profile
  finaltime?: string; // Expiration time for the shared record
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

export class DatabunkerproAPI {
  private baseURL: string;
  private xBunkerToken: string;
  private xBunkerTenant: string;

  constructor(baseURL: string, xBunkerToken: string = '', xBunkerTenant: string = '') {
    this.baseURL = baseURL;
    this.xBunkerToken = xBunkerToken;
    this.xBunkerTenant = xBunkerTenant;
  }

  private async makeRequest(endpoint: string, method: string = 'POST', data: any = null, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    if (this.xBunkerToken) {
      headers['X-Bunker-Token'] = this.xBunkerToken;
    }
    if (this.xBunkerTenant) {
      headers['X-Bunker-Tenant'] = this.xBunkerTenant;
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
  async createUser(profile: any, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
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
  async createUsersBulk(records: any[], options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = {
      records: records.map(record => {
        const userData: any = { profile: record.profile };
        
        // Handle groupname/groupid
        if (record.groupname) {
          if (Number.isInteger(Number(record.groupname))) {
            userData.groupid = record.groupname;
          } else {
            userData.groupname = record.groupname;
          }
        } else if (record.groupid) {
          userData.groupid = record.groupid;
        }

        // Handle rolename/roleid
        if (record.rolename) {
          if (Number.isInteger(Number(record.rolename))) {
            userData.roleid = record.rolename;
          } else {
            userData.rolename = record.rolename;
          }
        } else if (record.roleid) {
          userData.roleid = record.roleid;
        }

        return userData;
      })
    };

    // Add global time options if provided
    if (options.finaltime) {
      data.finaltime = options.finaltime;
    }
    if (options.slidingtime) {
      data.slidingtime = options.slidingtime;
    }

    return this.makeRequest('UserCreateBulk', 'POST', data, requestMetadata);
  }

  async getUser(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, requestMetadata);
  }

  async updateUser(mode: string, identity: string, profile: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserUpdate', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async requestUserUpdate(mode: string, identity: string, profile: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserUpdateRequest', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async patchUser(mode: string, identity: string, patch: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserPatch', 'POST', { mode, identity, patch }, requestMetadata);
  }

  async requestUserPatch(mode: string, identity: string, patch: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserPatchRequest', 'POST', { mode, identity, patch }, requestMetadata);
  }

  async deleteUser(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, requestMetadata);
  }

  async requestUserDeletion(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserDeleteRequest', 'POST', { mode, identity }, requestMetadata);
  }

  // User Authentication
  async preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserPrelogin', 'POST', { mode, identity, code, captchacode }, requestMetadata);
  }

  async loginUser(mode: string, identity: string, smscode: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserLogin', 'POST', { mode, identity, smscode }, requestMetadata);
  }

  async createCaptcha(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('CaptchaCreate', 'POST', null, requestMetadata);
  }

  // User Request Management
  async getUserRequest(requestuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserRequestGet', 'POST', { requestuuid }, requestMetadata);
  }

  async listUserRequests(mode: string, identity: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, offset, limit }
    return this.makeRequest('UserRequestListUserRequests', 'POST', data, requestMetadata);
  }

  async cancelUserRequest(requestuuid: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { requestuuid, ...options };
    return this.makeRequest('UserRequestCancel', 'POST', data, requestMetadata);
  }

  async approveUserRequest(requestuuid: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { requestuuid, ...options };
    return this.makeRequest('UserRequestApprove', 'POST', data, requestMetadata);
  }

  // App Data Management
  async createAppData(mode: string, identity: string, appname: string, data: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async getAppData(mode: string, identity: string, appname: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname }, requestMetadata);
  }

  async updateAppData(mode: string, identity: string, appname: string, data: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataUpdate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async requestAppDataUpdate(mode: string, identity: string, appname: string, data: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataUpdateRequest', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async listAppDataRecords(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataListUserAppNames', 'POST', { mode, identity }, requestMetadata);
  }

  async listAppDataNames(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataListUserAppNames', 'POST', { mode, identity }, requestMetadata);
  }

  async listAppNames(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataListAppNames', 'POST', null, requestMetadata);
  }

  // Legal Basis Management
  async createLegalBasis(options: LegalBasisOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('LegalBasisCreate', 'POST', options, requestMetadata);
  }

  async updateLegalBasis(brief: string, options: LegalBasisOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const { brief: _, ...optionsWithoutBrief } = options;
    const data = { brief, ...optionsWithoutBrief };
    return this.makeRequest('LegalBasisUpdate', 'POST', data, requestMetadata);
  }

  async deleteLegalBasis(brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('LegalBasisDelete', 'POST', { brief }, requestMetadata);
  }

  async listAgreements(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('LegalBasisListAgreements', 'POST', null, requestMetadata);
  }

  // Agreement Management
  async acceptAgreement(mode: string, identity: string, options: AgreementAcceptOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      mode, 
      identity, 
      brief: options.brief,
      agreementmethod: options.agreementmethod,
      lastmodifiedby: options.lastmodifiedby,
      referencecode: options.referencecode,
      starttime: options.starttime,
      finaltime: options.finaltime,
      status: options.status
    };
    return this.makeRequest('AgreementAccept', 'POST', data, requestMetadata);
  }

  async getUserAgreement(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async listUserAgreements(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity }, requestMetadata);
  }

  async cancelAgreement(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementCancel', 'POST', {mode, identity, brief}, requestMetadata);
  }

  async requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementCancelRequest', 'POST', {mode, identity, brief}, requestMetadata);
  }

  async revokeAllAgreements(brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementRevokeAll', 'POST', { brief }, requestMetadata);
  }

  // Processing Activity Management
  async listProcessingActivities(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityListActivities', 'POST', null, requestMetadata);
  }

  async createProcessingActivity(options: ProcessingActivityOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      activity: options.activity,
      title: options.title,
      script: options.script,
      fulldesc: options.fulldesc,
      applicableto: options.applicableto
    };
    return this.makeRequest('ProcessingActivityCreate', 'POST', data, requestMetadata);
  }

  async updateProcessingActivity(activity: string, options: ProcessingActivityUpdateOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { activity, ...options };
    return this.makeRequest('ProcessingActivityUpdate', 'POST', data, requestMetadata);
  }

  async deleteProcessingActivity(activity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityDelete', 'POST', { activity }, requestMetadata);
  }

  async linkProcessingActivityToLegalBasis(activity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityLinkLegalBasis', 'POST', { activity, brief }, requestMetadata);
  }

  async unlinkProcessingActivityFromLegalBasis(activity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityUnlinkLegalBasis', 'POST', { activity, brief }, requestMetadata);
  }

  // Connector Management
  async listSupportedConnectors(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorListSupportedConnectors', 'POST', null, requestMetadata);
  }

  async listConnectors(offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { offset, limit };
    return this.makeRequest('ConnectorListConnectors', 'POST', data, requestMetadata);
  }

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
    return this.makeRequest('ConnectorCreate', 'POST', data, requestMetadata);
  }

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
    return this.makeRequest('ConnectorUpdate', 'POST', data, requestMetadata);
  }

  async validateConnectorConnectivity(options: ConnectorOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
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
    return this.makeRequest('ConnectorValidateConnectivity', 'POST', data, requestMetadata);
  }

  async deleteConnector(connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorDelete', 'POST', { connectorid }, requestMetadata);
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
  
  async connectorGetUserData(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorGetUserData', 'POST', { mode, identity, connectorid }, requestMetadata);
  }

  async connectorGetUserExtraData(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorGetUserExtraData', 'POST', { mode, identity, connectorid }, requestMetadata);
  }

  async connectorDeleteUser(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorDeleteUser', 'POST', { mode, identity, connectorid }, requestMetadata);
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

  async listUserGroups(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('GroupListUserGroups', 'POST', { mode, identity }, requestMetadata);
  }

  async updateGroup(groupid: string | number, groupname: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { groupid, groupname, ...options };
    return this.makeRequest('GroupUpdate', 'POST', data, requestMetadata);
  }

  async deleteGroup(groupid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('GroupDelete', 'POST', { groupid }, requestMetadata);
  }

  async removeUserFromGroup(mode: string, identity: string, groupid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('GroupDeleteUser', 'POST', { mode, identity, groupid }, requestMetadata);
  }

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

  // Access Token Management
  async createXToken(mode: string, identity: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, ...options };
    return this.makeRequest('XTokenCreate', 'POST', data, requestMetadata);
  }

  // Token Management (for example for credit cards)
  async createToken(tokentype: string, record: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {tokentype, record, ...options};
    return this.makeRequest('TokenCreate', 'POST', data, requestMetadata);
  }

  async createTokensBulk(records: any[], options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {records, ...options};
    return this.makeRequest('TokenCreateBulk', 'POST', data, requestMetadata);
  }

  async getToken(token: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TokenGet', 'POST', { token }, requestMetadata);
  }

  async deleteToken(token: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TokenDelete', 'POST', { token }, requestMetadata);
  }

  // Audit Management
  async listUserAuditEvents(mode: string, identity: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, offset, limit }
    return this.makeRequest('AuditListUserEvents', 'POST', data, requestMetadata);
  }

  async getAuditEvent(auditeventuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid }, requestMetadata);
  }

  // Tenant Management
  async createTenant(options: TenantOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      tenantname: options.tenantname,
      tenantorg: options.tenantorg,
      email: options.email
    };
    return this.makeRequest('TenantCreate', 'POST', data, requestMetadata);
  }

  async getTenant(tenantid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TenantGet', 'POST', { tenantid }, requestMetadata);
  }

  async updateTenant(tenantid: string | number, options: TenantOptions, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { tenantid, ...options };
    return this.makeRequest('TenantUpdate', 'POST', data, requestMetadata);
  }

  async deleteTenant(tenantid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TenantDelete', 'POST', { tenantid }, requestMetadata);
  }

  async listTenants(offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { offset, limit };
    return this.makeRequest('TenantListTenants', 'POST', data, requestMetadata);
  }

  // Role Management
  async createRole(rolename: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('RoleCreate', 'POST', { rolename }, requestMetadata);
  }

  async linkPolicy(rolename: string, policyname: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('RoleLinkPolicy', 'POST', { rolename, policyname }, requestMetadata);
  }

  // Policy Management
  async createPolicy(data: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('PolicyCreate', 'POST', data, requestMetadata);
  }

  async updatePolicy(policyid: string | number, data: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('PolicyUpdate', 'POST', { policyid, ...data }, requestMetadata);
  }

  async getPolicy(policyname: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = {};
    if (policyname) {
      // Check if policyname is an integer (policy ID) or string (policy name)
      if (Number.isInteger(Number(policyname))) {
        data.policyid = policyname;
      } else {
        data.policyname = policyname;
      }
    }
    return this.makeRequest('PolicyGet', 'POST', data, requestMetadata);
  }

  async listPolicies(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('PolicyListAllPolicies', 'POST', null, requestMetadata);
  }

  // Bulk Operations
  async bulkListUnlock(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('BulkListUnlock', 'POST', null, requestMetadata);
  }

  async bulkListUsers(unlockuuid: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, offset, limit }
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

  async bulkListTokens(unlockuuid: string, tokens: string[], requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, tokens };
    return this.makeRequest('BulkListTokens', 'POST', data, requestMetadata);
  }

  async bulkDeleteTokens(unlockuuid: string, tokens: string[], requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, tokens };
    return this.makeRequest('BulkDeleteTokens', 'POST', data, requestMetadata);
  }

  // System Configuration
  async getUIConf(): Promise<any> {
    return this.makeRequest('TenantGetUIConf', 'POST');
  }

  async getTenantConf(): Promise<any> {
    return this.makeRequest('TenantGetConf', 'POST');
  }

  async getUserHTMLReport(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SystemGetUserHTMLReport', 'POST', { mode, identity }, requestMetadata);
  }

  async getUserReport(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SystemGetUserReport', 'POST', { mode, identity }, requestMetadata);
  }

  // Session Management
  async upsertSession(sessionuuid: string, sessiondata: any, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { sessionuuid, sessiondata, ...options };
    return this.makeRequest('SessionUpsert', 'POST', data, requestMetadata);
  }

  async deleteSession(sessionuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SessionDelete', 'POST', { sessionuuid }, requestMetadata);
  }

  async listUserSessions(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SessionListUserSessions', 'POST', { mode, identity }, requestMetadata);
  }

  async getSession(sessionuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SessionGet', 'POST', { sessionuuid }, requestMetadata);
  }

  async getSystemStats(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SystemGetSystemStats', 'POST', null, requestMetadata);
  }

  async parsePrometheusMetrics(metricsText: string): Promise<any> {
    const lines = metricsText.split('\n');
    const metrics: any = {};
    
    for (const line of lines) {
      // Skip comments and empty lines
      if (line.startsWith('#') || !line.trim()) continue;
      
      // Parse metric line
      const match = line.match(/^([a-zA-Z0-9_]+)(?:{([^}]+)})?\s+([0-9.]+)$/);
      if (match) {
        const [, name, labels, value] = match;
        const metricKey = labels ? `${name}{${labels}}` : name;
        metrics[metricKey] = parseFloat(value);
      }
    }
    return metrics;
  }
  
  async getSystemMetrics(requestMetadata: RequestMetadata | null = null): Promise<any> {
    // call /metrics
    const response = await fetch(this.baseURL + '/metrics');
    const metricsText = await response.text();
    return this.parsePrometheusMetrics(metricsText);
  }

  async createSharedRecord(mode: string, identity: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      mode,
      identity,
      fields: options.fields,
      partner: options.partner,
      appname: options.appname,
      finaltime: options.finaltime
    };
    return this.makeRequest('SharedRecordCreate', 'POST', data, requestMetadata);
  }

  async getSharedRecord(recorduuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SharedRecordGet', 'POST', { recorduuid }, requestMetadata);
  }
}

export default DatabunkerproAPI;
declare global {
  interface Window {
    DatabunkerproAPI: typeof DatabunkerproAPI;
  }
}