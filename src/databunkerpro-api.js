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

    const url = `${this.baseURL}/v2/${endpoint}`;
    //console.log("Loading URL: " + url);
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
      //throw error;
    }
  }

  async rawRequest(endpoint, method = 'POST', data = null, requestMetadata = null) {
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
    const result = await response.blob();

    return result;
  }

  // User Management
  async createUser(profile, options = {}, requestMetadata = null) {
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
    return this.makeRequest('UserCreate', 'POST', data, requestMetadata);
  }

  async getUser(mode, identity, requestMetadata = null) {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, requestMetadata);
  }

  async deleteUser(mode, identity, requestMetadata = null) {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, requestMetadata);
  }

  async requestUserDeletion(mode, identity, requestMetadata = null) {
    return this.makeRequest('UserDeleteRequest', 'POST', { mode, identity }, requestMetadata);
  }

  async updateUser(mode, identity, profile, requestMetadata = null) {
    return this.makeRequest('UserUpdate', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async requestUserUpdate(mode, identity, profile, requestMetadata = null) {
    return this.makeRequest('UserUpdateRequest', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async preloginUser(mode, identity, code, captchacode, requestMetadata = null) {
    return this.makeRequest('UserPrelogin', 'POST', { mode, identity, code, captchacode }, requestMetadata);
  }

  async loginUser(mode, identity, smscode, requestMetadata = null) {
    return this.makeRequest('UserLogin', 'POST', { mode, identity, smscode }, requestMetadata);
  }

  // User Request Management
  async getUserRequest(requestuuid, requestMetadata = null) {
    return this.makeRequest('UserRequestGet', 'POST', { requestuuid }, requestMetadata);
  }

  async listUserRequests(mode, identity, offset = 0, limit = 10, requestMetadata = null) {
    const data = { mode, identity, offset, limit }
    return this.makeRequest('UserRequestListUserRequests', 'POST', data, requestMetadata);
  }

  async cancelUserRequest(requestuuid, reason = null, requestMetadata = null) {
    return this.makeRequest('UserRequestCancel', 'POST', { requestuuid, reason }, requestMetadata);
  }

  async approveUserRequest(requestuuid, reason = null, requestMetadata = null) {
    return this.makeRequest('UserRequestApprove', 'POST', { requestuuid, reason }, requestMetadata);
  }

  // App Data Management
  async createAppData(mode, identity, appname, data, requestMetadata = null) {
    return this.makeRequest('AppdataCreate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async getUserAppData(mode, identity, appname, requestMetadata = null) {
    return this.makeRequest('AppdataGet', 'POST', { mode, identity, appname }, requestMetadata);
  }

  async updateAppData(mode, identity, appname, data, requestMetadata = null) {
    return this.makeRequest('AppdataUpdate', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async requestAppDataUpdate(mode, identity, appname, data, requestMetadata = null) {
    return this.makeRequest('AppdataUpdateRequest', 'POST', { mode, identity, appname, data }, requestMetadata);
  }

  async listUserAppDataRecords(mode, identity, requestMetadata = null) {
    return this.makeRequest('AppdataListUserAppNames', 'POST', { mode, identity }, requestMetadata);
  }

  async listAppNames(requestMetadata = null) {
    return this.makeRequest('AppdataListAppNames', 'POST', null, requestMetadata);
  }

  // Agreement Management
  async acceptAgreement(mode, identity, brief, agreementmethod = null, referencecode = null, requestMetadata = null) {
    return this.makeRequest('AgreementAccept', 'POST', { 
      mode, 
      identity, 
      brief, 
      agreementmethod, 
      referencecode 
    }, requestMetadata);
  }

  async cancelAgreement(mode, identity, brief, requestMetadata = null) {
    return this.makeRequest('AgreementCancel', 'POST', {mode, identity, brief}, requestMetadata);
  }

  async requestAgreementCancellation(mode, identity, brief, requestMetadata = null) {
    return this.makeRequest('AgreementCancelRequest', 'POST', {mode, identity, brief}, requestMetadata);
  }

  async getUserAgreement(mode, identity, brief, requestMetadata = null) {
    return this.makeRequest('AgreementGet', 'POST', { mode, identity, brief }, requestMetadata);
  }

  async listUserAgreements(mode, identity, requestMetadata = null) {
    return this.makeRequest('AgreementListUserAgreements', 'POST', { mode, identity }, requestMetadata);
  }

  async listAgreements(requestMetadata = null) {
    return this.makeRequest('LegalBasisListAgreements', 'POST', null, requestMetadata);
  }

  async listProcessingActivities(requestMetadata = null) {
    return this.makeRequest('ProcessingActivityListActivities', 'POST', null, requestMetadata);
  }

  // Connector Management
  async listSupportedConnectors(requestMetadata = null) {
    return this.makeRequest('ConnectorsListSupportedConnectors', 'POST', null, requestMetadata);
  }

  async listConnectors(offset = 0, limit = 10, requestMetadata = null) {
    const data = { offset, limit };
    return this.makeRequest('ConnectorsListConnectors', 'POST', data, requestMetadata);
  }

  async createConnector(connectorname, connectortype, apikey, options = {}, requestMetadata = null) {
    const data = {
      connectorname,
      connectortype,
      apikey,
      ...options
    };
    return this.makeRequest('ConnectorsCreateConnector', 'POST', data, requestMetadata);
  }

  async updateConnector(connectorid, connectorname, connectortype, apikey, options = {}, requestMetadata = null) {
    const data = {
      connectorid,
      connectorname,
      connectortype,
      apikey,
      ...options
    };
    return this.makeRequest('ConnectorsUpdateConnector', 'POST', data, requestMetadata);
  }

  async validateConnectorConnectivity(options = {}, requestMetadata = null) {
    const data = {
      ...options
    };
    return this.makeRequest('ConnectorsValidateConnectivity', 'POST', data, requestMetadata);
  }

  async getTableMetadata(options = {}, requestMetadata = null) {
    const data = {
      ...options
    };
    return this.makeRequest('ConnectorGetTableMetaData', 'POST', data, requestMetadata);
  }
  
  async connectorsGetUserData(mode, identity, connectorid, requestMetadata = null) {
    return this.makeRequest('ConnectorsGetUserData', 'POST', { mode, identity, connectorid }, requestMetadata);
  }

  async connectorsGetUserExtraData(mode, identity, connectorid, requestMetadata = null) {
    return this.makeRequest('ConnectorsGetUserExtraData', 'POST', { mode, identity, connectorid }, requestMetadata);
  }

  async connectorsDeleteUser(mode, identity, connectorid, requestMetadata = null) {
    return this.makeRequest('ConnectorsDeleteUser', 'POST', { mode, identity, connectorid }, requestMetadata);
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

  // Access Token Management
  async createXToken(mode, identity, requestMetadata = null) {
    return this.makeRequest('XTokenCreate', 'POST', { mode, identity }, requestMetadata);
  }

  // Audit Management
  async listUserAuditEvents(mode, identity, offset = 0, limit = 10, requestMetadata = null) {
    const data = { mode, identity, offset, limit }
    return this.makeRequest('AuditListUserEvents', 'POST', data, requestMetadata);
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

  async updateTenant(tenantid, tenantname, tenantorg, email, requestMetadata = null) {
    const data = { tenantid, tenantname, tenantorg, email };
    return this.makeRequest('TenantUpdate', 'POST', data, requestMetadata);
  }

  async deleteTenant(tenantid, requestMetadata = null) {
    return this.makeRequest('TenantDelete', 'POST', { tenantid }, requestMetadata);
  }

  async listTenants(offset = 0, limit = 10, requestMetadata = null) {
    const data = { offset, limit };
    return this.makeRequest('TenantListTenants', 'POST', data, requestMetadata);
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

  async bulkListUsers(unlockuuid, offset = 0, limit = 10, requestMetadata = null) {
    const data = { unlockuuid, offset, limit }
    return this.makeRequest('BulkListUsers', 'POST', data, requestMetadata);
  }

  async bulkListGroupUsers(unlockuuid, groupname, offset = 0, limit = 10, requestMetadata = null) {
    const data = { unlockuuid, offset, limit };
    if (Number.isInteger(Number(groupname))) {
      data.groupid = groupname;
    } else {
      data.groupname = groupname;
    }
    return this.makeRequest('BulkListGroupUsers', 'POST', data, requestMetadata);
  }

  async bulkListUserRequests(unlockuuid, offset = 0, limit = 10, requestMetadata = null) {
    const data = { unlockuuid, offset, limit };
    return this.makeRequest('BulkListUserRequests', 'POST', data, requestMetadata);
  }

  async bulkListAuditEvents(unlockuuid, offset = 0, limit = 10, requestMetadata = null) {
    const data = { unlockuuid, offset, limit };
    return this.makeRequest('BulkListAuditEvents', 'POST', data, requestMetadata);
  }

  // System Configuration
  async getUIConf() {
    return this.makeRequest('TenantGetUIConf', 'POST');
  }

  async getTenantConf() {
    return this.makeRequest('TenantGetConf', 'POST');
  }

}

// Export for Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatabunkerproAPI;
} else {
  window.DatabunkerAPI = DatabunkerproAPI;
}
