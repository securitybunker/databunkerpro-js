class DatabunkerproAPI {
  constructor(baseURL, xBunkerToken = '') {
    this.baseURL = baseURL;
    this.xBunkerToken = xBunkerToken;
  }

  async makeRequest(endpoint, method = 'POST', data = null) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.xBunkerToken) {
      headers['X-Bunker-Token'] = this.xBunkerToken;
    }

    const options = {
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
  async createUser(profile, options = {}) {
    const data = { profile };

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
    if (options.expirationtime) {
      data.expirationtime = options.expirationtime;
    }

    return this.makeRequest('UserCreate', 'POST', data);
  }

  async getUser(mode, identity) {
    return this.makeRequest('UserGet', 'POST', { mode, identity });
  }

  async deleteUser(mode, identity) {
    return this.makeRequest('UserDelete', 'POST', { mode, identity });
  }

  async changeUser(mode, identity, profile) {
    return this.makeRequest('UserChange', 'POST', { mode, identity, profile });
  }

  // App Data Management
  async createAppData(mode, identity, appname, data) {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data });
  }

  async getAppData(mode, identity, appname) {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname });
  }

  async listAppNames() {
    return this.makeRequest('AppdataListAppNames', 'POST');
  }

  // Agreement Management
  async acceptAgreement(mode, identity, brief, agreementmethod, referencecode) {
    return this.makeRequest('AgreementAccept', 'POST', { 
      mode, 
      identity, 
      brief, 
      agreementmethod, 
      referencecode 
    });
  }

  async getAgreement(mode, identity, brief) {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief });
  }

  async listUserAgreements(mode, identity) {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity });
  }

  // Group Management
  async createGroup(groupname, groupdesc = '') {
    return this.makeRequest('GroupCreate', 'POST', { groupname, groupdesc });
  }

  async getGroup(groupid) {
    return this.makeRequest('GroupGet', 'POST', { groupid });
  }

  async listAllGroups() {
    return this.makeRequest('GroupListAllGroups', 'POST');
  }

  async addUserToGroup(groupname, mode, identity, rolename = null) {
    const data = { mode, identity };
 
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
    
    return this.makeRequest('GroupAddUser', 'POST', data);
  }

  // Token Management
  async createXToken(mode, identity) {
    return this.makeRequest('XTokenCreate', 'POST', { mode, identity });
  }

  // Audit Management
  async listUserEvents(mode, identity) {
    return this.makeRequest('AuditListUserEvents', 'POST', { mode, identity });
  }

  async getAuditEvent(auditeventuuid) {
    return this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid });
  }

  // Tenant Management
  async createTenant(data) {
    return this.makeRequest('TenantCreate', 'POST', data);
  }

  async getTenant(tenantid) {
    return this.makeRequest('TenantGet', 'POST', { tenantid });
  }

  async renameTenant(tenantid, tenantname) {
    return this.makeRequest('TenantRename', 'POST', { tenantid, tenantname });
  }

  async listTenants() {
    return this.makeRequest('TenantListTenants', 'POST');
  }

  // Role Management
  async createRole(rolename) {
    return this.makeRequest('RoleCreate', 'POST', { rolename });
  }

  async linkPolicy(rolename, policyname) {
    return this.makeRequest('RoleLinkPolicy', 'POST', { rolename, policyname });
  }

  // Policy Management
  async createPolicy(data) {
    return this.makeRequest('PolicyCreate', 'POST', data);
  }

  async listPolicies() {
    return this.makeRequest('PolicyListAllPolicies', 'POST');
  }

  // Bulk Operations
  async bulkListUnlock() {
    return this.makeRequest('BulkListUnlock', 'POST');
  }

  async bulkListUsers(unlockuuid) {
    return this.makeRequest('BulkListUsers', 'POST', { unlockuuid });
  }

  async bulkListGroupUsers(unlockuuid, groupname) {
    const data = { unlockuuid };
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }    
    return this.makeRequest('BulkListGroupUsers', 'POST', data);
  }

  async bulkListUserRequests(unlockuuid) {
    return this.makeRequest('BulkListUserRequests', 'POST', { unlockuuid });
  }

  async bulkListAuditEvents(unlockuuid) {
    return this.makeRequest('BulkListAuditEvents', 'POST', { unlockuuid });
  }
}

// Export for Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatabunkerproAPI;
} else {
  window.DatabunkerAPI = DatabunkerproAPI;
}
