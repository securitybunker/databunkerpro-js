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

  private async makeRequest(endpoint: string, method: string = 'POST', data: any = null, request_metadata: RequestMetadata | null = null): Promise<any> {
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

    if (data || request_metadata) {
      const bodyData = data ? { ...data } : {};
      if (request_metadata) {
        bodyData.request_metadata = request_metadata;
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

  async getUser(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, request_metadata);
  }

  async deleteUser(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, request_metadata);
  }

  async changeUser(mode: string, identity: string, profile: Record<string, any>, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('UserChange', 'POST', { mode, identity, profile }, request_metadata);
  }

  // App Data Management
  async createAppData(mode: string, identity: string, appname: string, data: Record<string, any>, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data }, request_metadata);
  }

  async getAppData(mode: string, identity: string, appname: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname }, request_metadata);
  }

  async listAppNames(request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AppdataListAppNames', 'POST', null, request_metadata);
  }

  // Agreement Management
  async acceptAgreement(mode: string, identity: string, brief: string, agreementmethod: string, referencecode: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementAccept', 'POST', { 
      mode, 
      identity, 
      brief, 
      agreementmethod, 
      referencecode 
    }, request_metadata);
  }

  async getAgreement(mode: string, identity: string, brief: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief }, request_metadata);
  }

  async listUserAgreements(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity }, request_metadata);
  }

  // Group Management
  async createGroup(groupname: string, groupdesc: string = '', request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('GroupCreate', 'POST', { groupname, groupdesc }, request_metadata);
  }

  async getGroup(groupid: string | number, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('GroupGet', 'POST', { groupid }, request_metadata);
  }

  async listAllGroups(request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('GroupListAllGroups', 'POST', null, request_metadata);
  }

  async addUserToGroup(groupname: string | number, mode: string, identity: string, rolename?: string | number, request_metadata?: RequestMetadata): Promise<any> {
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
    
    return this.makeRequest('GroupAddUser', 'POST', data, request_metadata);
  }

  // Token Management
  async createXToken(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('XTokenCreate', 'POST', { mode, identity }, request_metadata);
  }

  // Audit Management
  async listUserEvents(mode: string, identity: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AuditListUserEvents', 'POST', { mode, identity }, request_metadata);
  }

  async getAuditEvent(auditeventuuid: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid }, request_metadata);
  }

  // Tenant Management
  async createTenant(data: Record<string, any>, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('TenantCreate', 'POST', data, request_metadata);
  }

  async getTenant(tenantid: string | number, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('TenantGet', 'POST', { tenantid }, request_metadata);
  }

  async renameTenant(tenantid: string | number, tenantname: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('TenantRename', 'POST', { tenantid, tenantname }, request_metadata);
  }

  async listTenants(request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('TenantListTenants', 'POST', null, request_metadata);
  }

  // Role Management
  async createRole(rolename: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('RoleCreate', 'POST', { rolename }, request_metadata);
  }

  async linkPolicy(rolename: string, policyname: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('RoleLinkPolicy', 'POST', { rolename, policyname }, request_metadata);
  }

  // Policy Management
  async createPolicy(data: Record<string, any>, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('PolicyCreate', 'POST', data, request_metadata);
  }

  async listPolicies(request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('PolicyListAllPolicies', 'POST', null, request_metadata);
  }

  // Bulk Operations
  async bulkListUnlock(request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('BulkListUnlock', 'POST', null, request_metadata);
  }

  async bulkListUsers(unlockuuid: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('BulkListUsers', 'POST', { unlockuuid }, request_metadata);
  }

  async bulkListGroupUsers(unlockuuid: string, groupname: string | number, request_metadata?: RequestMetadata): Promise<any> {
    const data: any = { unlockuuid };
    
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }
    
    return this.makeRequest('BulkListGroupUsers', 'POST', data, request_metadata);
  }

  async bulkListUserRequests(unlockuuid: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('BulkListUserRequests', 'POST', { unlockuuid }, request_metadata);
  }

  async bulkListAuditEvents(unlockuuid: string, request_metadata?: RequestMetadata): Promise<any> {
    return this.makeRequest('BulkListAuditEvents', 'POST', { unlockuuid }, request_metadata);
  }
}

// Export for Node.js and browser environments
export default DatabunkerproAPI; 