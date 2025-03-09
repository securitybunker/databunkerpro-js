class DatabunkerproAPI {
  constructor(baseURL, xBunkerToken = '') {
    this.baseURL = baseURL;
    this.xBunkerToken = xBunkerToken;
  }

  async makeRequest(endpoint, method = 'POST', data = null, requestMetadata = null) {
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

  async getUser(mode, identity, requestMetadata = null) {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, requestMetadata);
  }

  async deleteUser(mode, identity, requestMetadata = null) {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, requestMetadata);
  }

  async changeUser(mode, identity, profile, requestMetadata = null) {
    return this.makeRequest('UserChange', 'POST', { mode, identity, profile }, requestMetadata);
  }

  // App Data Management
  async createAppData(mode, identity, appname, data, requestMetadata = null) {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async getAppData(mode, identity, appname, requestMetadata = null) {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname }, requestMetadata);
  }

  async listAppNames(requestMetadata = null) {
    return this.makeRequest('AppdataListAppNames', 'POST', null, requestMetadata);
  }

  // Agreement Management
  async acceptAgreement(mode, identity, brief, agreementmethod, referencecode, requestMetadata = null) {
    return this.makeRequest('AgreementAccept', 'POST', { 
      mode, 
      identity, 
      brief, 
      agreementmethod, 
      referencecode 
    }, requestMetadata);
  }

  async getAgreement(mode, identity, brief, requestMetadata = null) {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async listUserAgreements(mode, identity, requestMetadata = null) {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity }, requestMetadata);
  }

  // Group Management
  async createGroup(groupname, groupdesc = '', requestMetadata = null) {
    return this.makeRequest('GroupCreate', 'POST', { groupname, groupdesc }, requestMetadata);
  }

  async getGroup(groupid, requestMetadata = null) {
    return this.makeRequest('GroupGet', 'POST', { groupid }, requestMetadata);
  }

  async listAllGroups(requestMetadata = null) {
    return this.makeRequest('GroupListAllGroups', 'POST', null, requestMetadata);
  }

  async addUserToGroup(groupname, mode, identity, rolename = null, requestMetadata = null) {
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
    
    return this.makeRequest('GroupAddUser', 'POST', data, requestMetadata);
  }

  // Token Management
  async createXToken(mode, identity, requestMetadata = null) {
    return this.makeRequest('XTokenCreate', 'POST', { mode, identity }, requestMetadata);
  }

  // Audit Management
  async listUserEvents(mode, identity, requestMetadata = null) {
    return this.makeRequest('AuditListUserEvents', 'POST', { mode, identity }, requestMetadata);
  }

  async getAuditEvent(auditeventuuid, requestMetadata = null) {
    return this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid }, requestMetadata);
  }

  // Tenant Management
  async createTenant(data, requestMetadata = null) {
    return this.makeRequest('TenantCreate', 'POST', data, requestMetadata);
  }

  async getTenant(tenantid, requestMetadata = null) {
    return this.makeRequest('TenantGet', 'POST', { tenantid }, requestMetadata);
  }

  async renameTenant(tenantid, tenantname, requestMetadata = null) {
    return this.makeRequest('TenantRename', 'POST', { tenantid, tenantname }, requestMetadata);
  }

  async listTenants(requestMetadata = null) {
    return this.makeRequest('TenantListTenants', 'POST', null, requestMetadata);
  }

  // Role Management
  async createRole(rolename, requestMetadata = null) {
    return this.makeRequest('RoleCreate', 'POST', { rolename }, requestMetadata);
  }

  async linkPolicy(rolename, policyname, requestMetadata = null) {
    return this.makeRequest('RoleLinkPolicy', 'POST', { rolename, policyname }, requestMetadata);
  }

  // Policy Management
  async createPolicy(data, requestMetadata = null) {
    return this.makeRequest('PolicyCreate', 'POST', data, requestMetadata);
  }

  async listPolicies(requestMetadata = null) {
    return this.makeRequest('PolicyListAllPolicies', 'POST', null, requestMetadata);
  }

  // Bulk Operations
  async bulkListUnlock(requestMetadata = null) {
    return this.makeRequest('BulkListUnlock', 'POST', null, requestMetadata);
  }

  async bulkListUsers(unlockuuid, requestMetadata = null) {
    return this.makeRequest('BulkListUsers', 'POST', { unlockuuid }, requestMetadata);
  }

  async bulkListGroupUsers(unlockuuid, groupname, requestMetadata = null) {
    const data = { unlockuuid };
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }
    return this.makeRequest('BulkListGroupUsers', 'POST', data, requestMetadata);
  }

  async bulkListUserRequests(unlockuuid, requestMetadata = null) {
    return this.makeRequest('BulkListUserRequests', 'POST', { unlockuuid }, requestMetadata);
  }

  async bulkListAuditEvents(unlockuuid, requestMetadata = null) {
    return this.makeRequest('BulkListAuditEvents', 'POST', { unlockuuid }, requestMetadata);
  }
}

// Export for Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatabunkerproAPI;
} else {
  window.DatabunkerAPI = DatabunkerproAPI;
}
