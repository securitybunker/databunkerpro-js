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

  private async makeRequest(endpoint: string, data: any = null, requestMetadata: RequestMetadata | null = null): Promise<any> {
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
      method: 'POST',
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

  async rawRequest(endpoint: string, data: any = null, requestMetadata: RequestMetadata | null = null): Promise<Blob> {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };
    if (this.xBunkerToken) {
      headers['X-Bunker-Token'] = this.xBunkerToken;
    }

    const options: RequestOptions = {
      method: 'POST',
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
    return this.makeRequest('UserCreate', data, requestMetadata);
  }

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

    return this.makeRequest('UserCreateBulk', data, requestMetadata);
  }

  async getUser(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserGet', { mode, identity }, requestMetadata);
  }

  async updateUser(mode: string, identity: string, profile: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserUpdate', { mode, identity, profile }, requestMetadata);
  }

  async requestUserUpdate(mode: string, identity: string, profile: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserUpdateRequest', { mode, identity, profile }, requestMetadata);
  }

  async patchUser(mode: string, identity: string, patch: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserPatch', { mode, identity, patch }, requestMetadata);
  }

  async requestUserPatch(mode: string, identity: string, patch: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserPatchRequest', { mode, identity, patch }, requestMetadata);
  }

  async deleteUser(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserDelete', { mode, identity }, requestMetadata);
  }

  async requestUserDeletion(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserDeleteRequest', { mode, identity }, requestMetadata);
  }

  // User Authentication
  async preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserPrelogin', { mode, identity, code, captchacode }, requestMetadata);
  }

  async loginUser(mode: string, identity: string, smscode: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserLogin', { mode, identity, smscode }, requestMetadata);
  }

  async createCaptcha(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('CaptchaCreate', null, requestMetadata);
  }

  // Create user API Access Token
  async createXToken(mode: string, identity: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, ...options };
    return this.makeRequest('XTokenCreate', data, requestMetadata);
  }

  // User Request Management
  async getUserRequest(requestuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('UserRequestGet', { requestuuid }, requestMetadata);
  }

  async listUserRequests(mode: string, identity: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, offset, limit }
    return this.makeRequest('UserRequestListUserRequests', data, requestMetadata);
  }

  async cancelUserRequest(requestuuid: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { requestuuid };
    if (options.reason) {
      data.reason = options.reason;
    }
    return this.makeRequest('UserRequestCancel', data, requestMetadata);
  }

  async approveUserRequest(requestuuid: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { requestuuid };
    if (options.reason) {
      data.reason = options.reason;
    }
    return this.makeRequest('UserRequestApprove', data, requestMetadata);
  }

  // App Data Management
  async createAppData(mode: string, identity: string, appname: string, appdata: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, appname, appdata };
    return this.makeRequest('AppdataCreate', data, requestMetadata);
  }

  async getAppData(mode: string, identity: string, appname: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, appname };
    return this.makeRequest('AppdataGet', data, requestMetadata);
  }

  async updateAppData(mode: string, identity: string, appname: string, appdata: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, appname, appdata };
    return this.makeRequest('AppdataUpdate', data, requestMetadata);
  }

  async requestAppDataUpdate(mode: string, identity: string, appname: string, appdata: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, appname, appdata };
    return this.makeRequest('AppdataUpdateRequest', data, requestMetadata);
  }

  async listAppDataNames(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataListUserAppNames', { mode, identity }, requestMetadata);
  }

  async listAppNames(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AppdataListAppNames', null, requestMetadata);
  }

  // Legal Basis Management
  async createLegalBasis(options: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      brief: options.brief,
      status: options.status,
      module: options.module,
      fulldesc: options.fulldesc,
      shortdesc: options.shortdesc,
      basistype: options.basistype,
      requiredmsg: options.requiredmsg,
      requiredflag: options.requiredflag
    };
    return this.makeRequest('LegalBasisCreate', data, requestMetadata);
  }

  async updateLegalBasis(brief: string, options: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { brief, ...options };
    return this.makeRequest('LegalBasisUpdate', data, requestMetadata);
  }

  async deleteLegalBasis(brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('LegalBasisDelete', { brief }, requestMetadata);
  }

  async listAgreements(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('LegalBasisListAgreements', null, requestMetadata);
  }

  // Agreement Management
  async acceptAgreement(mode: string, identity: string, brief: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { mode, identity, brief };
    if (options.agreementmethod) {
      data.agreementmethod = options.agreementmethod;
    }
    if (options.lastmodifiedby) {
      data.lastmodifiedby = options.lastmodifiedby;
    }
    if (options.referencecode) {
      data.referencecode = options.referencecode;
    }
    if (options.starttime) {
      data.starttime = options.starttime;
    }
    if (options.finaltime) {
      data.finaltime = options.finaltime;
    }
    if (options.status) {
      data.status = options.status;
    }
    return this.makeRequest('AgreementAccept', data, requestMetadata);
  }

  async getUserAgreement(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, brief };
    return this.makeRequest('AgreementGet', data, requestMetadata);
  }

  async listUserAgreements(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity };
    return this.makeRequest('AgreementListUserAgreements', data, requestMetadata);
  }

  async cancelAgreement(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, brief };
    return this.makeRequest('AgreementCancel', data, requestMetadata);
  }

  async requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, brief };
    return this.makeRequest('AgreementCancelRequest', data, requestMetadata);
  }

  async revokeAllAgreements(brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AgreementRevokeAll', { brief }, requestMetadata);
  }

  // Processing Activity Management
  async listProcessingActivities(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityListActivities', null, requestMetadata);
  }

  async createProcessingActivity(options: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      activity: options.activity,
      title: options.title,
      script: options.script,
      fulldesc: options.fulldesc,
      applicableto: options.applicableto
    };
    return this.makeRequest('ProcessingActivityCreate', data, requestMetadata);
  }

  async updateProcessingActivity(activity: string, options: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { activity, ...options };
    return this.makeRequest('ProcessingActivityUpdate', data, requestMetadata);
  }

  async deleteProcessingActivity(activity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityDelete', { activity }, requestMetadata);
  }

  async linkProcessingActivityToLegalBasis(activity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityLinkLegalBasis', { activity, brief }, requestMetadata);
  }

  async unlinkProcessingActivityFromLegalBasis(activity: string, brief: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ProcessingActivityUnlinkLegalBasis', { activity, brief }, requestMetadata);
  }

  // Connector Management
  async listSupportedConnectors(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('ConnectorListSupportedConnectors', null, requestMetadata);
  }

  async listConnectors(offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { offset, limit };
    return this.makeRequest('ConnectorListConnectors', data, requestMetadata);
  }

  async createConnector(options: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
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
    return this.makeRequest('ConnectorCreate', data, requestMetadata);
  }

  async updateConnector(connectorid: string | number, options: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { connectorid, ...options };
    return this.makeRequest('ConnectorUpdate', data, requestMetadata);
  }

  async validateConnectorConnectivity(connectorid: string | number, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { ...options };
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorValidateConnectivity', data, requestMetadata);
  }

  async deleteConnector(connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = {};
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorDelete', data, requestMetadata);
  }

  async getTableMetadata(connectorid: string | number, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { ...options };
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorGetTableMetaData', data, requestMetadata);
  }
  
  async connectorGetUserData(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { mode, identity };
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorGetUserData', data, requestMetadata);
  }

  async connectorGetUserExtraData(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { mode, identity };
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorGetUserExtraData', data, requestMetadata);
  }

  async connectorDeleteUser(mode: string, identity: string, connectorid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { mode, identity };
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorDeleteUser', data, requestMetadata);
  }

  // Group Management
  async createGroup(options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      groupname: options.groupname,
      groupdesc: options.groupdesc,
      grouptype: options.grouptype,
    };
    return this.makeRequest('GroupCreate', data, requestMetadata);
  }

  async getGroup(groupid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = {};
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('GroupGet', data, requestMetadata);
  }

  async listAllGroups(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('GroupListAllGroups', null, requestMetadata);
  }

  async listUserGroups(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('GroupListUserGroups', { mode, identity }, requestMetadata);
  }

  async updateGroup(groupid: string | number, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { ...options };
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('GroupUpdate', data, requestMetadata);
  }

  async deleteGroup(groupid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = {};
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('GroupDelete', data, requestMetadata);
  }

  async removeUserFromGroup(mode: string, identity: string, groupid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { mode, identity };
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('GroupDeleteUser', data, requestMetadata);
  }

  async addUserToGroup(mode: string, identity: string, groupid: string | number, roleid: string | number | null = null, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { mode, identity };
    // Check if groupid is an integer (group ID) or string (group name)
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    if (roleid) {
      // Check if rolename is an integer (role ID) or string (role name)
      if (Number.isInteger(Number(roleid))) {
        data.roleid = roleid;
      } else {
        data.rolename = roleid;
      }
    }
    return this.makeRequest('GroupAddUser', data, requestMetadata);
  }

  // Token Management (for example for credit cards)
  async createToken(tokentype: string, record: string, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {tokentype, record, ...options};
    return this.makeRequest('TokenCreate', data, requestMetadata);
  }

  async createTokensBulk(records: any[], options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {records, ...options};
    return this.makeRequest('TokenCreateBulk', data, requestMetadata);
  }

  async getToken(token: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TokenGet', { token }, requestMetadata);
  }

  async deleteToken(token: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TokenDelete', { token }, requestMetadata);
  }

  // Audit Management
  async listUserAuditEvents(mode: string, identity: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { mode, identity, offset, limit }
    return this.makeRequest('AuditListUserEvents', data, requestMetadata);
  }

  async getAuditEvent(auditeventuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('AuditGetEvent', { auditeventuuid }, requestMetadata);
  }

  // Tenant Management
  async createTenant(options: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      tenantname: options.tenantname,
      tenantorg: options.tenantorg,
      email: options.email
    };
    return this.makeRequest('TenantCreate', data, requestMetadata);
  }

  async getTenant(tenantid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('TenantGet', { tenantid }, requestMetadata);
  }

  async updateTenant(tenantid: string | number, options: any, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { tenantid, ...options };
    return this.makeRequest('TenantUpdate', data, requestMetadata);
  }

  async deleteTenant(tenantid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {tenantid};
    return this.makeRequest('TenantDelete', data, requestMetadata);
  }

  async listTenants(offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { offset, limit };
    return this.makeRequest('TenantListTenants', data, requestMetadata);
  }

  // Role Management
  async createRole(options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {
      rolename: options.rolename,
      roledesc: options.roledesc,
    };
    return this.makeRequest('RoleCreate', data, requestMetadata);
  }

  async updateRole(roleid: string | number, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = {roleid, ...options};
    return this.makeRequest('RoleUpdate', data, requestMetadata);
  }

  async linkPolicy(roleid: string | number, policyid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = {};
    if (Number.isInteger(Number(roleid))) {
      data.roleid = roleid;
    } else {
      data.rolename = roleid;
    }
    if (Number.isInteger(Number(policyid))) {
      data.policyid = policyid;
    } else {
      data.policyname = policyid;
    }
    return this.makeRequest('RoleLinkPolicy', data, requestMetadata);
  }

  // Policy Management
  async createPolicy(options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { 
      policyname: options.policyname,
      policydesc: options.policydesc,
      policy: options.policy
    };
    return this.makeRequest('PolicyCreate', data, requestMetadata);
  }

  async updatePolicy(policyid: string | number, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { ...options };
    if (Number.isInteger(Number(policyid))) {
      data.policyid = policyid;
    } else {
      data.policyname = policyid;
    }
    return this.makeRequest('PolicyUpdate', data, requestMetadata);
  }

  async getPolicy(policyid: string | number, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = {};
    if (Number.isInteger(Number(policyid))) {
      data.policyid = policyid;
    } else {
      data.policyname = policyid;
    }
    return this.makeRequest('PolicyGet', data, requestMetadata);
  }

  async listPolicies(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('PolicyListAllPolicies', null, requestMetadata);
  }

  // Bulk Operations
  async bulkListUnlock(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('BulkListUnlock', null, requestMetadata);
  }

  async bulkListUsers(unlockuuid: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, offset, limit }
    return this.makeRequest('BulkListUsers', data, requestMetadata);
  }

  async bulkListGroupUsers(unlockuuid: string, groupid: string | number, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data: any = { unlockuuid, offset, limit };
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('BulkListGroupUsers', data, requestMetadata);
  }

  async bulkListUserRequests(unlockuuid: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, offset, limit };
    return this.makeRequest('BulkListUserRequests', data, requestMetadata);
  }

  async bulkListAuditEvents(unlockuuid: string, offset: number = 0, limit: number = 10, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, offset, limit };
    return this.makeRequest('BulkListAuditEvents', data, requestMetadata);
  }

  async bulkListTokens(unlockuuid: string, tokens: string[], requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, tokens };
    return this.makeRequest('BulkListTokens', data, requestMetadata);
  }

  async bulkDeleteTokens(unlockuuid: string, tokens: string[], requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { unlockuuid, tokens };
    return this.makeRequest('BulkDeleteTokens', data, requestMetadata);
  }

  // System Configuration
  async getUIConf(): Promise<any> {
    return this.makeRequest('TenantGetUIConf');
  }

  async getTenantConf(): Promise<any> {
    return this.makeRequest('TenantGetConf');
  }

  async getUserHTMLReport(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SystemGetUserHTMLReport', { mode, identity }, requestMetadata);
  }

  async getUserReport(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SystemGetUserReport', { mode, identity }, requestMetadata);
  }

  // Session Management
  async upsertSession(sessionuuid: string, sessiondata: any, options: any = {}, requestMetadata: RequestMetadata | null = null): Promise<any> {
    const data = { sessionuuid, sessiondata, ...options };
    return this.makeRequest('SessionUpsert', data, requestMetadata);
  }

  async deleteSession(sessionuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SessionDelete', { sessionuuid }, requestMetadata);
  }

  async listUserSessions(mode: string, identity: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SessionListUserSessions', { mode, identity }, requestMetadata);
  }

  async getSession(sessionuuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SessionGet', { sessionuuid }, requestMetadata);
  }

  async getSystemStats(requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SystemGetSystemStats', null, requestMetadata);
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
    return this.makeRequest('SharedRecordCreate', data, requestMetadata);
  }

  async getSharedRecord(recorduuid: string, requestMetadata: RequestMetadata | null = null): Promise<any> {
    return this.makeRequest('SharedRecordGet', { recorduuid }, requestMetadata);
  }
}

export default DatabunkerproAPI;
declare global {
  interface Window {
    DatabunkerproAPI: typeof DatabunkerproAPI;
  }
}