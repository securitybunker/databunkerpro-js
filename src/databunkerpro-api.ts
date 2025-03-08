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
}

export class DatabunkerproAPI {
  private baseURL: string;
  private xBunkerToken: string;

  constructor(baseURL: string, xBunkerToken: string = '') {
    this.baseURL = baseURL;
    this.xBunkerToken = xBunkerToken;
  }

  private async makeRequest(endpoint: string, method: string = 'POST', data: any = null): Promise<any> {
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

    if (data) {
      options.body = JSON.stringify(data);
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

    return this.makeRequest('UserCreate', 'POST', data);
  }

  async getUser(mode: string, identity: string): Promise<any> {
    return this.makeRequest('UserGet', 'POST', { mode, identity });
  }

  async deleteUser(mode: string, identity: string): Promise<any> {
    return this.makeRequest('UserDelete', 'POST', { mode, identity });
  }

  async changeUser(mode: string, identity: string, profile: Record<string, any>): Promise<any> {
    return this.makeRequest('UserChange', 'POST', { mode, identity, profile });
  }

  // App Data Management
  async createAppData(mode: string, identity: string, appname: string, data: Record<string, any>): Promise<any> {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data });
  }

  async getAppData(mode: string, identity: string, appname: string): Promise<any> {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname });
  }

  async listAppNames(): Promise<any> {
    return this.makeRequest('AppdataListAppNames', 'POST');
  }

  // Agreement Management
  async acceptAgreement(mode: string, identity: string, brief: string, agreementmethod: string, referencecode: string): Promise<any> {
    return this.makeRequest('AgreementAccept', 'POST', { 
      mode, 
      identity, 
      brief, 
      agreementmethod, 
      referencecode 
    });
  }

  async getAgreement(mode: string, identity: string, brief: string): Promise<any> {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief });
  }

  async listUserAgreements(mode: string, identity: string): Promise<any> {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity });
  }

  // Group Management
  async createGroup(groupname: string, groupdesc: string = ''): Promise<any> {
    return this.makeRequest('GroupCreate', 'POST', { groupname, groupdesc });
  }

  async getGroup(groupid: string | number): Promise<any> {
    return this.makeRequest('GroupGet', 'POST', { groupid });
  }

  async listAllGroups(): Promise<any> {
    return this.makeRequest('GroupListAllGroups', 'POST');
  }

  async addUserToGroup(groupname: string | number, mode: string, identity: string, rolename?: string | number): Promise<any> {
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
    
    return this.makeRequest('GroupAddUser', 'POST', data);
  }

  // Token Management
  async createXToken(mode: string, identity: string): Promise<any> {
    return this.makeRequest('XTokenCreate', 'POST', { mode, identity });
  }

  // Audit Management
  async listUserEvents(mode: string, identity: string): Promise<any> {
    return this.makeRequest('AuditListUserEvents', 'POST', { mode, identity });
  }

  async getAuditEvent(auditeventuuid: string): Promise<any> {
    return this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid });
  }

  // Tenant Management
  async createTenant(data: Record<string, any>): Promise<any> {
    return this.makeRequest('TenantCreate', 'POST', data);
  }

  async getTenant(tenantid: string | number): Promise<any> {
    return this.makeRequest('TenantGet', 'POST', { tenantid });
  }

  async renameTenant(tenantid: string | number, tenantname: string): Promise<any> {
    return this.makeRequest('TenantRename', 'POST', { tenantid, tenantname });
  }

  async listTenants(): Promise<any> {
    return this.makeRequest('TenantListTenants', 'POST');
  }

  // Role Management
  async createRole(rolename: string): Promise<any> {
    return this.makeRequest('RoleCreate', 'POST', { rolename });
  }

  async linkPolicy(rolename: string, policyname: string): Promise<any> {
    return this.makeRequest('RoleLinkPolicy', 'POST', { rolename, policyname });
  }

  // Policy Management
  async createPolicy(data: Record<string, any>): Promise<any> {
    return this.makeRequest('PolicyCreate', 'POST', data);
  }

  async listPolicies(): Promise<any> {
    return this.makeRequest('PolicyListAllPolicies', 'POST');
  }

  // Bulk Operations
  async bulkListUnlock(): Promise<any> {
    return this.makeRequest('BulkListUnlock', 'POST');
  }

  async bulkListUsers(unlockuuid: string): Promise<any> {
    return this.makeRequest('BulkListUsers', 'POST', { unlockuuid });
  }

  async bulkListGroupUsers(unlockuuid: string, groupname: string | number): Promise<any> {
    const data: any = { unlockuuid };
    
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }
    
    return this.makeRequest('BulkListGroupUsers', 'POST', data);
  }

  async bulkListUserRequests(unlockuuid: string): Promise<any> {
    return this.makeRequest('BulkListUserRequests', 'POST', { unlockuuid });
  }

  async bulkListAuditEvents(unlockuuid: string): Promise<any> {
    return this.makeRequest('BulkListAuditEvents', 'POST', { unlockuuid });
  }
}

// Export for Node.js and browser environments
export default DatabunkerproAPI; 