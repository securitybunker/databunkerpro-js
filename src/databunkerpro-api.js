class DatabunkerproAPI {
  constructor(baseURL, xBunkerToken = '') {
    this.baseURL = baseURL;
    this.xBunkerToken = xBunkerToken;
  }

  async makeRequest(endpoint, method = 'POST', data = null, request_metadata = null) {
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
    if (options.finaltime) {
      data.finaltime = options.finaltime;
    }

    return this.makeRequest('UserCreate', 'POST', data, options.request_metadata);
  }

  async getUser(mode, identity, request_metadata = null) {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, request_metadata);
  }

  async deleteUser(mode, identity, request_metadata = null) {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, request_metadata);
  }

  async changeUser(mode, identity, profile, request_metadata = null) {
    return this.makeRequest('UserChange', 'POST', { mode, identity, profile }, request_metadata);
  }

  // App Data Management
  async createAppData(mode, identity, appname, data, request_metadata = null) {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data }, request_metadata);
  }

  async getAppData(mode, identity, appname, request_metadata = null) {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname }, request_metadata);
  }

  async listAppNames(request_metadata = null) {
    return this.makeRequest('AppdataListAppNames', 'POST', null, request_metadata);
  }

  // Agreement Management
  async acceptAgreement(mode, identity, brief, agreementmethod, referencecode, request_metadata = null) {
    return this.makeRequest('AgreementAccept', 'POST', { 
      mode, 
      identity, 
      brief, 
      agreementmethod, 
      referencecode 
    }, request_metadata);
  }

  async getAgreement(mode, identity, brief, request_metadata = null) {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief }, request_metadata);
  }

  async listUserAgreements(mode, identity, request_metadata = null) {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity }, request_metadata);
  }

  // Group Management
  async createGroup(groupname, groupdesc = '', request_metadata = null) {
    return this.makeRequest('GroupCreate', 'POST', { groupname, groupdesc }, request_metadata);
  }

  async getGroup(groupid, request_metadata = null) {
    return this.makeRequest('GroupGet', 'POST', { groupid }, request_metadata);
  }

  async listAllGroups(request_metadata = null) {
    return this.makeRequest('GroupListAllGroups', 'POST', null, request_metadata);
  }

  async addUserToGroup(groupname, mode, identity, rolename = null, request_metadata = null) {
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
    
    return this.makeRequest('GroupAddUser', 'POST', data, request_metadata);
  }

  // Token Management
  async createXToken(mode, identity, request_metadata = null) {
    return this.makeRequest('XTokenCreate', 'POST', { mode, identity }, request_metadata);
  }

  // Audit Management
  async listUserEvents(mode, identity, request_metadata = null) {
    return this.makeRequest('AuditListUserEvents', 'POST', { mode, identity }, request_metadata);
  }

  async getAuditEvent(auditeventuuid, request_metadata = null) {
    return this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid }, request_metadata);
  }

  // Tenant Management
  async createTenant(data, request_metadata = null) {
    return this.makeRequest('TenantCreate', 'POST', data, request_metadata);
  }

  async getTenant(tenantid, request_metadata = null) {
    return this.makeRequest('TenantGet', 'POST', { tenantid }, request_metadata);
  }

  async renameTenant(tenantid, tenantname, request_metadata = null) {
    return this.makeRequest('TenantRename', 'POST', { tenantid, tenantname }, request_metadata);
  }

  async listTenants(request_metadata = null) {
    return this.makeRequest('TenantListTenants', 'POST', null, request_metadata);
  }

  // Role Management
  async createRole(rolename, request_metadata = null) {
    return this.makeRequest('RoleCreate', 'POST', { rolename }, request_metadata);
  }

  async linkPolicy(rolename, policyname, request_metadata = null) {
    return this.makeRequest('RoleLinkPolicy', 'POST', { rolename, policyname }, request_metadata);
  }

  // Policy Management
  async createPolicy(data, request_metadata = null) {
    return this.makeRequest('PolicyCreate', 'POST', data, request_metadata);
  }

  async listPolicies(request_metadata = null) {
    return this.makeRequest('PolicyListAllPolicies', 'POST', null, request_metadata);
  }

  // Bulk Operations
  async bulkListUnlock(request_metadata = null) {
    return this.makeRequest('BulkListUnlock', 'POST', null, request_metadata);
  }

  async bulkListUsers(unlockuuid, request_metadata = null) {
    return this.makeRequest('BulkListUsers', 'POST', { unlockuuid }, request_metadata);
  }

  async bulkListGroupUsers(unlockuuid, groupname, request_metadata = null) {
    const data = { unlockuuid };
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }
    return this.makeRequest('BulkListGroupUsers', 'POST', data, request_metadata);
  }

  async bulkListUserRequests(unlockuuid, request_metadata = null) {
    return this.makeRequest('BulkListUserRequests', 'POST', { unlockuuid }, request_metadata);
  }

  async bulkListAuditEvents(unlockuuid, request_metadata = null) {
    return this.makeRequest('BulkListAuditEvents', 'POST', { unlockuuid }, request_metadata);
  }
}

// Export for Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatabunkerproAPI;
} else {
  window.DatabunkerAPI = DatabunkerproAPI;
}
