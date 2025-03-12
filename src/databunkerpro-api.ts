interface RequestOptions {
  method: string;
  headers: {
    [key: string]: string;
  };
  body?: string;
}

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
  async getUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, requestMetadata);
  }

  async deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, requestMetadata);
  }

  async requestUserDeletion(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserDeleteRequest', 'POST', { mode, identity }, requestMetadata);
  }

  async updateUser(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserChange', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async requestUserUpdate(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserChangeRequest', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async preloginUser(mode: string, identity: string, code: string, captchacode: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserPrelogin', 'POST', { mode, identity, code, captchacode }, requestMetadata);
  }

  async loginUser(mode: string, identity: string, smscode: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserLogin', 'POST', { mode, identity, smscode }, requestMetadata);
  }

  // User Request Management
  async getUserRequest(mode: string, identity: string, requestuuid: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserRequestGet', 'POST', { mode, identity, requestuuid }, requestMetadata);
  }

  async listUserRequests(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserRequestListUserRequests', 'POST', { mode, identity }, requestMetadata);
  }

  async cancelUserRequest(mode: string, identity: string, requestuuid: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserRequestCancel', 'POST', { mode, identity, requestuuid }, requestMetadata);
  }

  async approveUserRequest(mode: string, identity: string, requestuuid: string, requestMetadata?: RequestMetadata, reason?: string): Promise<any> {
    return this.makeRequest('UserRequestApprove', 'POST', { mode, identity, requestuuid, reason }, requestMetadata);
  }

  // App Data Management
  async createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async getUserAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname }, requestMetadata);
  }

  async listUserAppDataRecords(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataListUserAppNames', 'POST', { mode, identity }, requestMetadata);
  }

  async listAppNames(requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataListAppNames', 'POST', null, requestMetadata);
  }

  // Agreement Management
  async acceptAgreement(mode: string, identity: string, brief: string, agreementmethod?: string | null, referencecode?: string | null, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementAccept', 'POST', { 
      mode, 
      identity, 
      brief, 
      agreementmethod, 
      referencecode 
    }, requestMetadata);
  }

  async cancelAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementCancel', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async requestAgreementCancellation(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementCancelRequest', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async getUserAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity }, requestMetadata);
  }

  async listAgreements(requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('LegalBasisListAgreements', 'POST', null, requestMetadata);
  }

  async listProcessingActivities(requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('ProcessingActivityListActivities', 'POST', null, requestMetadata);
  }

  // Group Management
  async createGroup(groupname: string, groupdesc: string = '', requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('GroupCreate', 'POST', { groupname, groupdesc }, requestMetadata);
  }

  async getGroup(groupid: string | number, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('GroupGet', 'POST', { groupid }, requestMetadata);
  }

  async listAllGroups(requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('GroupListAllGroups', 'POST', null, requestMetadata);
  }

  async addUserToGroup(groupname: string | number, mode: string, identity: string, rolename?: string | number | null, requestMetadata?: RequestMetadata): Promise<any> {
    const data: any = { mode, identity };
    
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }

    if (rolename) {
      if (Number.isInteger(Number(rolename))) {
        data.roleid = rolename;
      } else {
        data.rolename = rolename;
      }
    }
    
    return this.makeRequest('GroupAddUser', 'POST', data, requestMetadata);
  }

  // Token Management
  async createXToken(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('XTokenCreate', 'POST', { mode, identity }, requestMetadata);
  }

  // Audit Management
  async listUserAuditEvents(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AuditListUserEvents', 'POST', { mode, identity }, requestMetadata);
  }

  async getAuditEvent(auditeventuuid: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid }, requestMetadata);
  }

  // Tenant Management
  async createTenant(data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('TenantCreate', 'POST', data, requestMetadata);
  }

  async getTenant(tenantid: string | number, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('TenantGet', 'POST', { tenantid }, requestMetadata);
  }

  async renameTenant(tenantid: string | number, tenantname: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('TenantRename', 'POST', { tenantid, tenantname }, requestMetadata);
  }

  async listTenants(requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('TenantListTenants', 'POST', null, requestMetadata);
  }

  // Role Management
  async createRole(rolename: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('RoleCreate', 'POST', { rolename }, requestMetadata);
  }

  async linkPolicy(rolename: string, policyname: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('RoleLinkPolicy', 'POST', { rolename, policyname }, requestMetadata);
  }

  // Policy Management
  async createPolicy(data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('PolicyCreate', 'POST', data, requestMetadata);
  }

  async listPolicies(requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('PolicyListAllPolicies', 'POST', null, requestMetadata);
  }

  // Bulk Operations
  async bulkListUnlock(requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('BulkListUnlock', 'POST', null, requestMetadata);
  }

  async bulkListUsers(unlockuuid: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('BulkListUsers', 'POST', { unlockuuid }, requestMetadata);
  }

  async bulkListGroupUsers(unlockuuid: string, groupname: string | number, requestMetadata?: RequestMetadata): Promise<any> {
    const data: any = { unlockuuid };
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }
    return this.makeRequest('BulkListGroupUsers', 'POST', data, requestMetadata);
  }

  async bulkListUserRequests(unlockuuid: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('BulkListUserRequests', 'POST', { unlockuuid }, requestMetadata);
  }

  async bulkListAuditEvents(unlockuuid: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('BulkListAuditEvents', 'POST', { unlockuuid }, requestMetadata);
  }

  // System Configuration
  async getUIConf(): Promise<any> {
    return this.makeRequest('TenantGetUIConf', 'POST');
  }

  async getTenantConf(): Promise<any> {
    return this.makeRequest('TenantGetConf', 'POST');
  }
}

// Export for Node.js and browser environments
export default DatabunkerproAPI; 