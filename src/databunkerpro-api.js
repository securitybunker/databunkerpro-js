class DatabunkerproAPI {
  constructor(baseURL, xBunkerToken = '', xBunkerTenant = '') {
    this.baseURL = baseURL;
    this.xBunkerToken = xBunkerToken;
    this.xBunkerTenant = xBunkerTenant;
  }

  async makeRequest(endpoint, method = 'POST', data = null, requestMetadata = null) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.xBunkerToken) {
      headers['X-Bunker-Token'] = this.xBunkerToken;
    }
    if (this.xBunkerTenant) {
      headers['X-Bunker-Tenant'] = this.xBunkerTenant;
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

  /**
   * Creates multiple users in bulk with their profiles and group information
   * @param {Array<Object>} records - Array of user records to create
   * @param {Object} [options={}] - Global options for all users
   * @param {string} [options.finaltime] - Global expiration time for all users
   * @param {string} [options.slidingtime] - Global sliding time period for all users
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created users information
   * @example
   * // Create multiple users with global time settings
   * const users = await api.createUsersBulk([
   *   {
   *     profile: { email: 'user1@example.com', name: 'User One' },
   *     groupname: 'premium'
   *   },
   *   {
   *     profile: { email: 'user2@example.com', name: 'User Two' },
   *     groupid: 123
   *   }
   * ], {
   *   finaltime: '100d',
   *   slidingtime: '30d'
   * });
   */
  async createUsersBulk(records, options = {}, requestMetadata = null) {
    const data = {
      records: records.map(record => {
        const userData = { profile: record.profile };
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

    return this.makeRequest('UserCreateBulk', 'POST', data, requestMetadata);
  }

  async getUser(mode, identity, requestMetadata = null) {
    return this.makeRequest('UserGet', 'POST', { mode, identity }, requestMetadata);
  }

  async updateUser(mode, identity, profile, requestMetadata = null) {
    return this.makeRequest('UserUpdate', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async requestUserUpdate(mode, identity, profile, requestMetadata = null) {
    return this.makeRequest('UserUpdateRequest', 'POST', { mode, identity, profile }, requestMetadata);
  }

  async patchUser(mode, identity, patch, requestMetadata = null) {
    return this.makeRequest('UserPatch', 'POST', { mode, identity, patch }, requestMetadata);
  }

  async requestUserPatch(mode, identity, patch, requestMetadata = null) {
    return this.makeRequest('UserPatchRequest', 'POST', { mode, identity, patch }, requestMetadata);
  }

  async deleteUser(mode, identity, requestMetadata = null) {
    return this.makeRequest('UserDelete', 'POST', { mode, identity }, requestMetadata);
  }

  async requestUserDeletion(mode, identity, requestMetadata = null) {
    return this.makeRequest('UserDeleteRequest', 'POST', { mode, identity }, requestMetadata);
  }

  // User Authentication
  async preloginUser(mode, identity, code, captchacode, requestMetadata = null) {
    return this.makeRequest('UserPrelogin', 'POST', { mode, identity, code, captchacode }, requestMetadata);
  }

  async loginUser(mode, identity, smscode, requestMetadata = null) {
    return this.makeRequest('UserLogin', 'POST', { mode, identity, smscode }, requestMetadata);
  }

  async createCaptcha(requestMetadata = null) {
    return this.makeRequest('CaptchaCreate', 'POST', null, requestMetadata);
  }

  // Create user API Access Token
  /**
   * Creates an access token for a user
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode
   * @param {Object} [options={}] - Optional parameters for token creation
   * @param {string} [options.tokentype] - Type of token (e.g., 'access', 'refresh')
   * @param {string} [options.finaltime] - Absolute expiration time for the token
   * @param {string} [options.slidingtime] - Sliding time period for the token
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The created token information
   */
  async createXToken(mode, identity, options = {}, requestMetadata = null) {
    const data = { mode, identity, ...options };
    return this.makeRequest('XTokenCreate', 'POST', data, requestMetadata);
  }

  // User Request Management
  async getUserRequest(requestuuid, requestMetadata = null) {
    return this.makeRequest('UserRequestGet', 'POST', { requestuuid }, requestMetadata);
  }

  async listUserRequests(mode, identity, offset = 0, limit = 10, requestMetadata = null) {
    const data = { mode, identity, offset, limit }
    return this.makeRequest('UserRequestListUserRequests', 'POST', data, requestMetadata);
  }

  /**
   * Cancels a user request
   * @param {string} requestuuid - UUID of the request to cancel
   * @param {Object} [options={}] - Optional parameters for cancellation
   * @param {string} [options.reason] - Reason for cancellation
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The cancellation result
   */
  async cancelUserRequest(requestuuid, options = {}, requestMetadata = null) {
    const data = { requestuuid, reason: options.reason };
    return this.makeRequest('UserRequestCancel', 'POST', data, requestMetadata);
  }

  async approveUserRequest(requestuuid, options = {}, requestMetadata = null) {
    const data = { requestuuid, reason: options.reason };
    return this.makeRequest('UserRequestApprove', 'POST', data, requestMetadata);
  }

  // App Data Management
  async createAppData(mode, identity, appname, appdata, requestMetadata = null) {
    const data = { mode, identity, appname, appdata };
    return this.makeRequest('AppdataCreate', 'POST', data, requestMetadata);
  }

  async getAppData(mode, identity, appname, requestMetadata = null) {
    const data = { mode, identity, appname };
    return this.makeRequest('AppdataGet', 'POST', data, requestMetadata);
  }

  async updateAppData(mode, identity, appname, appdata, requestMetadata = null) {
    const data = { mode, identity, appname, appdata };
    return this.makeRequest('AppdataUpdate', 'POST', data, requestMetadata);
  }

  async requestAppDataUpdate(mode, identity, appname, appdata, requestMetadata = null) {
    const data = { mode, identity, appname, appdata };
    return this.makeRequest('AppdataUpdateRequest', 'POST', data, requestMetadata);
  }

  async listAppDataNames(mode, identity, requestMetadata = null) {
    return this.makeRequest('AppdataListUserAppNames', 'POST', { mode, identity }, requestMetadata);
  }

  async listAppNames(requestMetadata = null) {
    return this.makeRequest('AppdataListAppNames', 'POST', null, requestMetadata);
  }

  // Legal Basis Management
  async createLegalBasis(options, requestMetadata = null) {
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
    return this.makeRequest('LegalBasisCreate', 'POST', data, requestMetadata);
  }

  async updateLegalBasis(brief, options, requestMetadata = null) {
    const data = { brief, ...options };
    return this.makeRequest('LegalBasisUpdate', 'POST', data, requestMetadata);
  }

  async deleteLegalBasis(brief, requestMetadata = null) {
    return this.makeRequest('LegalBasisDelete', 'POST', { brief }, requestMetadata);
  }

  async listAgreements(requestMetadata = null) {
    return this.makeRequest('LegalBasisListAgreements', 'POST', null, requestMetadata);
  }

  // Agreement Management
  /**
   * Records user's acceptance of a legal basis/agreement
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode (e.g., email address, phone number)
   * @param {Object} options - Agreement acceptance options
   * @param {string} options.brief - Unique identifier of the legal basis/agreement being accepted
   * @param {string} [options.agreementmethod] - Method of agreement (e.g., 'web-form', 'checkbox', 'signature')
   * @param {string} [options.lastmodifiedby] - Identifier of the person/system that last modified this agreement
   * @param {string} [options.referencecode] - External reference code or identifier for this acceptance
   * @param {string} [options.starttime] - Start time of the agreement validity (ISO 8601 format)
   * @param {string} [options.finaltime] - End time of the agreement validity (ISO 8601 format)
   * @param {string} [options.status] - Status of the agreement (e.g., 'pending', 'active', 'expired')
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The recorded agreement acceptance
   * @example
   * // Record user's acceptance of marketing consent with additional details
   * const acceptance = await api.acceptAgreement(
   *   'email',
   *   'user@example.com',
   *   {
   *     brief: 'marketing-consent',
   *     agreementmethod: 'web-form',
   *     referencecode: 'REF123',
   *     starttime: '10d',
   *     finaltime: '100d',
   *     status: 'active',
   *     lastmodifiedby: 'admin@company.com'
   *   }
   * );
   */
  async acceptAgreement(mode, identity, brief, options, requestMetadata = null) {
    const data = {
      mode, 
      identity, 
      brief,
      agreementmethod: options.agreementmethod,
      lastmodifiedby: options.lastmodifiedby,
      referencecode: options.referencecode,
      starttime: options.starttime,
      finaltime: options.finaltime,
      status: options.status
    };
    return this.makeRequest('AgreementAccept', 'POST', data, requestMetadata);
  }

  async getUserAgreement(mode, identity, brief, requestMetadata = null) {
    const data = { mode, identity, brief };
    return this.makeRequest('AgreementGet', 'POST', data, requestMetadata);
  }

  async listUserAgreements(mode, identity, requestMetadata = null) {
    const data = { mode, identity };
    return this.makeRequest('AgreementListUserAgreements', 'POST', data, requestMetadata);
  }

  async cancelAgreement(mode, identity, brief, requestMetadata = null) {
    const data = { mode, identity, brief };
    return this.makeRequest('AgreementCancel', 'POST', data, requestMetadata);
  }

  async requestAgreementCancellation(mode, identity, brief, requestMetadata = null) {
    const data = { mode, identity, brief };
    return this.makeRequest('AgreementCancelRequest', 'POST', data, requestMetadata);
  }

  async revokeAllAgreements(brief, requestMetadata = null) {
    return this.makeRequest('AgreementRevokeAll', 'POST', { brief }, requestMetadata);
  }

  // Processing Activity Management
  async listProcessingActivities(requestMetadata = null) {
    return this.makeRequest('ProcessingActivityListActivities', 'POST', null, requestMetadata);
  }

  /**
   * Creates a new processing activity
   * @param {Object} options - The processing activity options
   * @param {string} options.activity - Unique identifier for the processing activity
   * @param {string} [options.title] - Title of the processing activity
   * @param {string} [options.script] - Script or description of the processing activity
   * @param {string} [options.fulldesc] - Full description of the processing activity
   * @param {string} [options.applicableto] - What this activity applies to
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created processing activity
   */
  async createProcessingActivity(options, requestMetadata = null) {
    const data = {
      activity: options.activity,
      title: options.title,
      script: options.script,
      fulldesc: options.fulldesc,
      applicableto: options.applicableto
    };
    return this.makeRequest('ProcessingActivityCreate', 'POST', data, requestMetadata);
  }

  /**
   * Updates an existing processing activity
   * @param {string} activity - Current activity identifier
   * @param {Object} options - The processing activity update options
   * @param {string} [options.newactivity] - New activity identifier
   * @param {string} [options.title] - Title of the processing activity
   * @param {string} [options.script] - Script or description of the processing activity
   * @param {string} [options.fulldesc] - Full description of the processing activity
   * @param {string} [options.applicableto] - What this activity applies to
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The updated processing activity
   */
  async updateProcessingActivity(activity, options, requestMetadata = null) {
    const data = { activity, ...options };
    return this.makeRequest('ProcessingActivityUpdate', 'POST', data, requestMetadata);
  }

  /**
   * Deletes a processing activity
   * @param {string} activity - Activity identifier to delete
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The deletion result
   */
  async deleteProcessingActivity(activity, requestMetadata = null) {
    return this.makeRequest('ProcessingActivityDelete', 'POST', { activity }, requestMetadata);
  }

  /**
   * Links a processing activity to a legal basis
   * @param {string} activity - Activity identifier
   * @param {string} brief - Legal basis brief identifier
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The linking result
   */
  async linkProcessingActivityToLegalBasis(activity, brief, requestMetadata = null) {
    return this.makeRequest('ProcessingActivityLinkLegalBasis', 'POST', { activity, brief }, requestMetadata);
  }

  /**
   * Unlinks a processing activity from a legal basis
   * @param {string} activity - Activity identifier
   * @param {string} brief - Legal basis brief identifier
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The unlinking result
   */
  async unlinkProcessingActivityFromLegalBasis(activity, brief, requestMetadata = null) {
    return this.makeRequest('ProcessingActivityUnlinkLegalBasis', 'POST', { activity, brief }, requestMetadata);
  }

  // Connector Management
  async listSupportedConnectors(requestMetadata = null) {
    return this.makeRequest('ConnectorListSupportedConnectors', 'POST', null, requestMetadata);
  }

  async listConnectors(offset = 0, limit = 10, requestMetadata = null) {
    const data = { offset, limit };
    return this.makeRequest('ConnectorListConnectors', 'POST', data, requestMetadata);
  }

  /**
   * Creates a new database connector with the specified configuration
   * @param {Object} options - The connector configuration options
   * @param {string} options.connectorname - Name of the connector (e.g., "MySQL Production")
   * @param {string} options.connectortype - Type of the connector (e.g., 'mysql', 'postgresql', 'mongodb')
   * @param {string} options.apikey - API key for authentication with the database
   * @param {string} [options.username] - Username for database connection
   * @param {string} [options.connectordesc] - Description of the connector's purpose
   * @param {string} [options.dbhost] - Database host address (e.g., "db.example.com")
   * @param {number} [options.dbport] - Database port number (e.g., 3306 for MySQL)
   * @param {string} [options.dbname] - Name of the database to connect to
   * @param {string} [options.tablename] - Specific table name if applicable
   * @param {string} [options.status] - Status of the connector (e.g., 'active', 'inactive')
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created connector details
   * @example
   * // Create a MySQL database connector
   * const connector = await api.createConnector({
   *   connectorname: "MySQL Production",
   *   connectortype: "mysql",
   *   connectordesc: "Production user database",
   *   username: "admin",
   *   apikey: "api-key-123",
   *   dbhost: "prod-db.example.com",
   *   dbport: 3306,
   *   dbname: "users",
   *   status: "active"
   * });
   * 
   * // Create a PostgreSQL database connector
   * const pgConnector = await api.createConnector({
   *   connectorname: "PostgreSQL Analytics",
   *   connectortype: "postgresql",
   *   connectordesc: "Analytics database for user behavior",
   *   username: "analyst",
   *   apikey: "pg-api-key",
   *   dbhost: "analytics.example.com",
   *   dbport: 5432,
   *   dbname: "analytics",
   *   status: "active"
   * });
   */
  async createConnector(options, requestMetadata = null) {
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
    return this.makeRequest('ConnectorCreate', 'POST', data, requestMetadata);
  }

  async updateConnector(connectorid, options, requestMetadata = null) {
    const data = {
      connectorid,
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
    return this.makeRequest('ConnectorUpdate', 'POST', data, requestMetadata);
  }

  async validateConnectorConnectivity(connectorid, options, requestMetadata = null) {
    const data = {
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
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
      data.connectorname = options.connectorname;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorValidateConnectivity', 'POST', data, requestMetadata);
  }

  async deleteConnector(connectorid, requestMetadata = null) {
    const data = {};
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorDelete', 'POST', data, requestMetadata);
  }

  async getTableMetadata(connectorid, options, requestMetadata = null) {
    const data = {
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
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
      data.connectorname = options.connectorname;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorGetTableMetaData', 'POST', data, requestMetadata);
  }
  
  async connectorGetUserData(mode, identity, connectorid, requestMetadata = null) {
    const data = { mode, identity };
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorGetUserData', 'POST', data, requestMetadata);
  }

  async connectorGetUserExtraData(mode, identity, connectorid, requestMetadata = null) {
    const data = { mode, identity };
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorGetUserExtraData', 'POST', data, requestMetadata);
  }

  async connectorDeleteUser(mode, identity, connectorid, requestMetadata = null) {
    const data = { mode, identity };
    if (Number.isInteger(Number(connectorid))) {
      data.connectorid = connectorid;
    } else {
      data.connectorname = connectorid;
    }
    return this.makeRequest('ConnectorDeleteUser', 'POST', data, requestMetadata);
  }

  // Group Management
  async createGroup(options = {}, requestMetadata = null) {
    const data = {
      groupname: options.groupname,
      groupdesc: options.groupdesc,
      grouptype: options.grouptype,
    };
    return this.makeRequest('GroupCreate', 'POST', data, requestMetadata);
  }

  async getGroup(groupid, requestMetadata = null) {
    const data = {};
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('GroupGet', 'POST', data, requestMetadata);
  }

  async listAllGroups(requestMetadata = null) {
    return this.makeRequest('GroupListAllGroups', 'POST', null, requestMetadata);
  }

  async listUserGroups(mode, identity, requestMetadata = null) {
    return this.makeRequest('GroupListUserGroups', 'POST', { mode, identity }, requestMetadata);
  }

  async updateGroup(groupid, options = {}, requestMetadata = null) {
    const data = { ...options };
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('GroupUpdate', 'POST', data, requestMetadata);
  }

  async deleteGroup(groupid, requestMetadata = null) {
    const data = {};
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('GroupDelete', 'POST', data, requestMetadata);
  }

  async removeUserFromGroup(mode, identity, groupid, requestMetadata = null) {
    const data = { mode, identity };
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
    }
    return this.makeRequest('GroupDeleteUser', 'POST', data, requestMetadata);
  }

  /**
   * Adds a user to a group with an optional role
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode
   * @param {string|number} groupname - Group name or ID to add the user to
   * @param {string|number|null} [rolename=null] - Optional role name or ID to assign to the user in the group
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<any>} The result of adding the user to the group
   */
  async addUserToGroup(mode, identity, groupid, roleid = null, requestMetadata = null) {
    const data = { mode, identity };
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
    return this.makeRequest('GroupAddUser', 'POST', data, requestMetadata);
  }

  // Token Management (for example for credit cards)
  /**
   * Creates a token for sensitive data like credit card numbers
   * @param {string} tokentype - Type of token (e.g., 'creditcard') or 'email'
   * @param {string} record - The sensitive data to tokenize
   * @param {Object} [options={}] - Optional parameters for token creation
   * @param {string} [options.slidingtime] - Time period for token validity (e.g., '1d', '1h')
   * @param {string} [options.finaltime] - Absolute expiration time for the token
   * @param {boolean} [options.unique] - Whether to create a unique token for each request
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The created token information
   * @example
   * // Create a token with expiration
   * const token = await api.createToken('creditcard', '1234567890', {
   *   slidingtime: '1d',
   *   finaltime: '10d',
   *   unique: true
   * });
   */
  async createToken(tokentype, record, options = {}, requestMetadata = null) {
    const data = {tokentype, record, ...options};
    return this.makeRequest('TokenCreate', 'POST', data, requestMetadata);
  }

  /**
   * Creates multiple tokens in bulk for sensitive data
   * @param {Array<Object>} records - Array of records to tokenize, each containing tokentype and record
   * @param {Object} [options={}] - Optional parameters for token creation
   * @param {string} [options.slidingtime] - Time period for token validity (e.g., '1d', '1h')
   * @param {string} [options.finaltime] - Absolute expiration time for the token
   * @param {boolean} [options.unique] - Whether to create unique tokens for each request
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The created tokens information
   * @example
   * // Create multiple tokens with expiration
   * const tokens = await api.createTokensBulk([
   *   { tokentype: 'creditcard', record: '1234567890' },
   *   { tokentype: 'creditcard', record: '0987654321' }
   * ], {
   *   slidingtime: '1d',
   *   finaltime: '10d',
   *   unique: true
   * });
   */
  async createTokensBulk(records, options = {}, requestMetadata = null) {
    const data = {records, ...options};
    return this.makeRequest('TokenCreateBulk', 'POST', data, requestMetadata);
  }

  async getToken(token, requestMetadata = null) {
    return this.makeRequest('TokenGet', 'POST', { token }, requestMetadata);
  }

  async deleteToken(token, requestMetadata = null) {
    return this.makeRequest('TokenDelete', 'POST', { token }, requestMetadata);
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
  /**
   * Creates a new tenant
   * @param {Object} options - Tenant creation options
   * @param {string} options.tenantname - Name of the tenant
   * @param {string} options.tenantorg - Organization name
   * @param {string} options.email - Email address for tenant contact
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The created tenant information
   * @example
   * // Create a tenant with organization and contact email
   * const tenant = await api.createTenant({
   *   tenantname: 'My Company',
   *   tenantorg: 'My Company', 
   *   email: 'contact@mycompany.com'
   * });
   */
  async createTenant(options, requestMetadata = null) {
    const data = {
      tenantname: options.tenantname,
      tenantorg: options.tenantorg,
      email: options.email
    };
    return this.makeRequest('TenantCreate', 'POST', data, requestMetadata);
  }

  async getTenant(tenantid, requestMetadata = null) {
    return this.makeRequest('TenantGet', 'POST', { tenantid }, requestMetadata);
  }

  /**
   * Updates an existing tenant
   * @param {string} tenantid - ID of the tenant to update
   * @param {Object} options - Tenant update options
   * @param {string} options.tenantname - New name of the tenant
   * @param {string} options.tenantorg - New organization name
   * @param {string} options.email - New email address for tenant admin
   * @param {Object} [requestMetadata=null] - Optional request metadata
   * @returns {Promise<Object>} The updated tenant information
   */
  async updateTenant(tenantid, options, requestMetadata = null) {
    const data = { tenantid, ...options };
    return this.makeRequest('TenantUpdate', 'POST', data, requestMetadata);
  }

  async deleteTenant(tenantid, requestMetadata = null) {
    const data = {tenantid};
    return this.makeRequest('TenantDelete', 'POST', data, requestMetadata);
  }

  async listTenants(offset = 0, limit = 10, requestMetadata = null) {
    const data = { offset, limit };
    return this.makeRequest('TenantListTenants', 'POST', data, requestMetadata);
  }

  // Role Management
  async createRole(options = {}, requestMetadata = null) {
    const data = {
      rolename: options.rolename,
      roledesc: options.roledesc,
    };
    return this.makeRequest('RoleCreate', 'POST', data, requestMetadata);
  }

  async updateRole(roleid, options = {}, requestMetadata = null) {
    const data = {roleid, ...options};
    return this.makeRequest('RoleUpdate', 'POST', data, requestMetadata);
  }

  async linkPolicy(roleid, policyid, requestMetadata = null) {
    const data = {};
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
    return this.makeRequest('RoleLinkPolicy', 'POST', data, requestMetadata);
  }

  // Policy Management
  async createPolicy(options = {}, requestMetadata = null) {
    const data = { 
      policyname: options.policyname,
      policydesc: options.policydesc,
      policy: options.policy
    };
    return this.makeRequest('PolicyCreate', 'POST', data, requestMetadata);
  }

  async updatePolicy(policyid, options = {}, requestMetadata = null) {
    const data = { ...options };
    if (Number.isInteger(Number(policyid))) {
      data.policyid = policyid;
    } else {
      data.policyname = policyid;
    }
    return this.makeRequest('PolicyUpdate', 'POST', data, requestMetadata);
  }

  async getPolicy(policyid, requestMetadata = null) {
    const data = {};
    if (Number.isInteger(Number(policyid))) {
      data.policyid = policyid;
    } else {
      data.policyname = policyid;
    }
    return this.makeRequest('PolicyGet', 'POST', data, requestMetadata);
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

  async bulkListGroupUsers(unlockuuid, groupid, offset = 0, limit = 10, requestMetadata = null) {
    const data = { unlockuuid, offset, limit };
    if (Number.isInteger(Number(groupid))) {
      data.groupid = groupid;
    } else {
      data.groupname = groupid;
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

  async bulkListTokens(unlockuuid, tokens, requestMetadata = null) {
    const data = { unlockuuid, tokens };
    return this.makeRequest('BulkListTokens', 'POST', data, requestMetadata);
  }

  async bulkDeleteTokens(unlockuuid, tokens, requestMetadata = null) {
    const data = { unlockuuid, tokens };
    return this.makeRequest('BulkDeleteTokens', 'POST', data, requestMetadata);
  }

  // System Configuration
  async getUIConf() {
    return this.makeRequest('TenantGetUIConf', 'POST');
  }

  async getTenantConf() {
    return this.makeRequest('TenantGetConf', 'POST');
  }

  async getUserHTMLReport(mode, identity, requestMetadata = null) {
    return this.makeRequest('SystemGetUserHTMLReport', 'POST', { mode, identity }, requestMetadata);
  }

  async getUserReport(mode, identity, requestMetadata = null) {
    return this.makeRequest('SystemGetUserReport', 'POST', { mode, identity }, requestMetadata);
  }

  // Session Management
  async upsertSession(sessionuuid, sessiondata, options = {}, requestMetadata = null) {
    const data = { sessionuuid, sessiondata, ...options };
    return this.makeRequest('SessionUpsert', 'POST', data, requestMetadata);
  }

  async deleteSession(sessionuuid, requestMetadata = null) {
    return this.makeRequest('SessionDelete', 'POST', { sessionuuid }, requestMetadata);
  }

  async listUserSessions(mode, identity, requestMetadata = null) {
    return this.makeRequest('SessionListUserSessions', 'POST', { mode, identity }, requestMetadata);
  }

  async getSession(sessionuuid, requestMetadata = null) {
    return this.makeRequest('SessionGet', 'POST', { sessionuuid }, requestMetadata);
  }

  /**
   * Gets system statistics
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} System statistics
   * 
   * Response format:
   * {
   *   "status": "ok",
   *   "stats": {
   *     "numusers": 123,      // Total number of users in the system
   *     "numtenants": 123,    // Total number of tenants
   *     "numtokens": 123,     // Total number of tokens
   *     "numsessions": 123    // Total number of active sessions
   *   }
   * }
   */
  async getSystemStats(requestMetadata = null) {
    return this.makeRequest('SystemGetSystemStats', 'POST', null, requestMetadata);
  }

  async parsePrometheusMetrics(metricsText) {
    const lines = metricsText.split('\n');
    const metrics = {};
    
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
  
  async getSystemMetrics(requestMetadata = null) {
    // call /metrics
    const response = await fetch(this.baseURL + '/metrics');
    const metricsText = await response.text();
    return this.parsePrometheusMetrics(metricsText);
  }

  /**
   * Creates a shared record for a user
   * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
   * @param {string} identity - User's identifier corresponding to the mode
   * @param {Object} [options={}] - Optional parameters for shared record creation
   * @param {Array<string>} [options.fields] - A string containing names of fields to share separated by commas
   * @param {string} [options.partner] - It is used as a refference to partner name. It is not enforced.
   * @param {string} [options.appname] - If defined, shows fields from the user app record instead user profile
   * @param {string} [options.finaltime] - Expiration time for the shared record
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The created shared record information
   * @example
   * // Create a shared record with specific fields
   * const sharedRecord = await api.createSharedRecord('email', 'user@example.com', {
   *   fields: 'name,email',
   *   partner: 'partner-org',
   *   appname: 'myapp',
   *   finaltime: '100d'
   * });
   */
  async createSharedRecord(mode, identity, options = {}, requestMetadata = null) {
    const data = {
      mode,
      identity,
      fields: options.fields,
      partner: options.partner,
      appname: options.appname,
      finaltime: options.finaltime
    };
    return this.makeRequest('SharedRecordCreate', 'POST', data, requestMetadata);
  }

  /**
   * Gets a shared record by its UUID
   * @param {string} recorduuid - UUID of the shared record to retrieve
   * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
   * @returns {Promise<Object>} The shared record information
   * @example
   * // Get a shared record by UUID
   * const sharedRecord = await api.getSharedRecord('123e4567-e89b-12d3-a456-426614174000');
   */
  async getSharedRecord(recorduuid, requestMetadata = null) {
    return this.makeRequest('SharedRecordGet', 'POST', { recorduuid }, requestMetadata);
  }
}

// Export for Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DatabunkerproAPI;
} else {
  window.DatabunkerAPI = DatabunkerproAPI;
}
