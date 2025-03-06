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
  async createUser(profile) {
    return this.makeRequest('UserCreate', 'POST', { profile });
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

  async addUserToGroup(groupid, mode, identity, rolename = null) {
    const data = { groupid, mode, identity };
    if (rolename) {
      data.rolename = rolename;
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

}

// Export for Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatabunkerproAPI;
} else {
  window.DatabunkerAPI = DatabunkerproAPI;
}
