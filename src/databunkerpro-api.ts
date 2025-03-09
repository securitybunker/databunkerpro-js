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

    const response = await fetch(`${this.baseURL}/v2/${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API request failed');
    }

    return result;
  }

  // User Management
  async createUser(profile: Record<string, any>, options: UserOptions = {}): Promise<any> {
    const data: any = { profile };

    // Handle groupname/groupid
    if (options.groupname) {
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

    return this.makeRequest('UserCreate', 'POST', data, options.request_metadata);
  }

  async getUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, requestMetadata);
  }

  async deleteUser(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, requestMetadata);
  }

  async changeUser(mode: string, identity: string, profile: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserChange', 'POST', { mode, identity, profile }, requestMetadata);
  }

  // App Data Management
  async createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async getAppData(mode: string, identity: string, appname: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname }, requestMetadata);
  }

  async listAppNames(requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataListAppNames', 'POST', null, requestMetadata);
  }

  // Agreement Management
  async acceptAgreement(mode: string, identity: string, brief: string, agreementmethod: string, referencecode: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementAccept', 'POST', { 
      mode, 
      identity, 
      brief, 
      agreementmethod, 
      referencecode 
    }, requestMetadata);
  }

  async getAgreement(mode: string, identity: string, brief: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async listUserAgreements(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity }, requestMetadata);
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

  async addUserToGroup(groupname: string | number, mode: string, identity: string, rolename?: string | number, requestMetadata?: RequestMetadata): Promise<any> {
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
  async listUserEvents(mode: string, identity: string, requestMetadata?: RequestMetadata): Promise<any> {
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
}

// Export for Node.js and browser environments
export default DatabunkerproAPI; 