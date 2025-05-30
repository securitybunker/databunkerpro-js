"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabunkerproAPI = void 0;
var DatabunkerproAPI = /** @class */ (function () {
    function DatabunkerproAPI(baseURL, xBunkerToken, xBunkerTenant) {
        if (xBunkerToken === void 0) { xBunkerToken = ''; }
        if (xBunkerTenant === void 0) { xBunkerTenant = ''; }
        this.baseURL = baseURL;
        this.xBunkerToken = xBunkerToken;
        this.xBunkerTenant = xBunkerTenant;
    }
    DatabunkerproAPI.prototype.makeRequest = function (endpoint_1) {
        return __awaiter(this, arguments, void 0, function (endpoint, method, data, requestMetadata) {
            var headers, options, bodyData, url, response, result, error_1;
            if (method === void 0) { method = 'POST'; }
            if (data === void 0) { data = null; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'Content-Type': 'application/json',
                        };
                        if (this.xBunkerToken) {
                            headers['X-Bunker-Token'] = this.xBunkerToken;
                        }
                        if (this.xBunkerTenant) {
                            headers['X-Bunker-Tenant'] = this.xBunkerTenant;
                        }
                        options = {
                            method: method,
                            headers: headers,
                        };
                        if (data || requestMetadata) {
                            bodyData = data ? __assign({}, data) : {};
                            if (requestMetadata) {
                                bodyData.request_metadata = requestMetadata;
                            }
                            options.body = JSON.stringify(bodyData);
                        }
                        url = "".concat(this.baseURL, "/v2/").concat(endpoint);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(url, options)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        result = _a.sent();
                        if (!response.ok) {
                            if (result.status) {
                                return [2 /*return*/, result];
                            }
                            else {
                                throw new Error(result.message || 'API request failed');
                            }
                        }
                        return [2 /*return*/, result];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error making request:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DatabunkerproAPI.prototype.rawRequest = function (endpoint_1) {
        return __awaiter(this, arguments, void 0, function (endpoint, method, data, requestMetadata) {
            var headers, options, bodyData, response, result;
            if (method === void 0) { method = 'POST'; }
            if (data === void 0) { data = null; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'Content-Type': 'application/json',
                        };
                        if (this.xBunkerToken) {
                            headers['X-Bunker-Token'] = this.xBunkerToken;
                        }
                        options = {
                            method: method,
                            headers: headers,
                        };
                        if (data || requestMetadata) {
                            bodyData = data ? __assign({}, data) : {};
                            if (requestMetadata) {
                                bodyData.request_metadata = requestMetadata;
                            }
                            options.body = JSON.stringify(bodyData);
                        }
                        return [4 /*yield*/, fetch("".concat(this.baseURL, "/v2/").concat(endpoint), options)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.blob()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // User Management
    DatabunkerproAPI.prototype.createUser = function (profile_1) {
        return __awaiter(this, arguments, void 0, function (profile, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { profile: profile };
                // Handle groupname/groupid
                if (options.groupname) {
                    // Check if groupname is actually a numeric id
                    if (Number.isInteger(Number(options.groupname))) {
                        data.groupid = options.groupname;
                    }
                    else {
                        data.groupname = options.groupname;
                    }
                }
                else if (options.groupid) {
                    data.groupid = options.groupid;
                }
                // Handle rolename/roleid
                if (options.rolename) {
                    // Check if rolename is actually a numeric id
                    if (Number.isInteger(Number(options.rolename))) {
                        data.roleid = options.rolename;
                    }
                    else {
                        data.rolename = options.rolename;
                    }
                }
                else if (options.roleid) {
                    data.roleid = options.roleid;
                }
                // Handle time parameters
                if (options.slidingtime) {
                    data.slidingtime = options.slidingtime;
                }
                if (options.finaltime) {
                    data.finaltime = options.finaltime;
                }
                return [2 /*return*/, this.makeRequest('UserCreate', 'POST', data, requestMetadata)];
            });
        });
    };
    /**
     * Creates multiple users in bulk with their profiles and group information
     * @param records - Array of user records to create
     * @param options - Global options for all users
     * @param options.finaltime - Global expiration time for all users
     * @param options.slidingtime - Global sliding time period for all users
     * @param requestMetadata - Additional metadata to include with the request
     * @returns {Promise<any>} The created users information
     * @example
     * // Create multiple users with global time settings
     * const users = await api.createUsersBulk([
     *   {
     *     profile: { email: 'user1@example.com', name: 'User One' },
     *     groupname: 'premium',
     *     rolename: 'admin'
     *   },
     *   {
     *     profile: { email: 'user2@example.com', name: 'User Two' },
     *     groupid: 123,
     *     rolename: 'team-member'
     *   }
     * ], {
     *   finaltime: '2024-12-31',
     *   slidingtime: '30d'
     * });
     */
    DatabunkerproAPI.prototype.createUsersBulk = function (records_1) {
        return __awaiter(this, arguments, void 0, function (records, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    records: records.map(function (record) {
                        var userData = { profile: record.profile };
                        // Handle groupname/groupid
                        if (record.groupname) {
                            if (Number.isInteger(Number(record.groupname))) {
                                userData.groupid = record.groupname;
                            }
                            else {
                                userData.groupname = record.groupname;
                            }
                        }
                        else if (record.groupid) {
                            userData.groupid = record.groupid;
                        }
                        // Handle rolename/roleid
                        if (record.rolename) {
                            if (Number.isInteger(Number(record.rolename))) {
                                userData.roleid = record.rolename;
                            }
                            else {
                                userData.rolename = record.rolename;
                            }
                        }
                        else if (record.roleid) {
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
                return [2 /*return*/, this.makeRequest('UserCreateBulk', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getUser = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserGet', 'POST', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteUser = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserDelete', 'POST', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestUserDeletion = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserDeleteRequest', 'POST', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateUser = function (mode_1, identity_1, profile_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, profile, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserUpdate', 'POST', { mode: mode, identity: identity, profile: profile }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestUserUpdate = function (mode_1, identity_1, profile_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, profile, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserUpdateRequest', 'POST', { mode: mode, identity: identity, profile: profile }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.preloginUser = function (mode_1, identity_1, code_1, captchacode_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, code, captchacode, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserPrelogin', 'POST', { mode: mode, identity: identity, code: code, captchacode: captchacode }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.loginUser = function (mode_1, identity_1, smscode_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, smscode, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserLogin', 'POST', { mode: mode, identity: identity, smscode: smscode }, requestMetadata)];
            });
        });
    };
    // App Data Management
    DatabunkerproAPI.prototype.createAppData = function (mode_1, identity_1, appname_1, data_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, appname, data, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataCreate', 'POST', { mode: mode, identity: identity, appname: appname, data: data }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getAppData = function (mode_1, identity_1, appname_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, appname, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataGet', 'POST', { mode: mode, identity: identity, appname: appname }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateAppData = function (mode_1, identity_1, appname_1, data_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, appname, data, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataUpdate', 'POST', { mode: mode, identity: identity, appname: appname, data: data }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestAppDataUpdate = function (mode_1, identity_1, appname_1, data_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, appname, data, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataUpdateRequest', 'POST', { mode: mode, identity: identity, appname: appname, data: data }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAppDataRecords = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataListUserAppNames', 'POST', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAppNames = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataListAppNames', 'POST', null, requestMetadata)];
            });
        });
    };
    // Agreement Management
    DatabunkerproAPI.prototype.createLegalBasis = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('LegalBasisCreate', 'POST', options, requestMetadata)];
            });
        });
    };
    /**
     * Records user's acceptance of a legal basis/agreement
     * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
     * @param {string} identity - User's identifier corresponding to the mode (e.g., email address, phone number)
     * @param {AgreementAcceptOptions} options - Agreement acceptance options
     * @param {string} options.brief - Unique identifier of the legal basis/agreement being accepted
     * @param {string} [options.agreementmethod] - Method of agreement (e.g., 'web-form', 'checkbox', 'signature')
     * @param {string} [options.referencecode] - External reference code or identifier for this acceptance
     * @param {string} [options.starttime] - Start time of the agreement validity (ISO 8601 format)
     * @param {string} [options.finaltime] - End time of the agreement validity (ISO 8601 format)
     * @param {string} [options.status] - Status of the agreement (e.g., 'pending', 'active', 'expired')
     * @param {string} [options.lastmodifiedby] - Identifier of the person/system that last modified this agreement
     * @param {RequestMetadata} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<any>} The recorded agreement acceptance
     * @example
     * // Record user's acceptance of marketing consent with additional details
     * const acceptance = await api.acceptAgreement(
     *   'email',
     *   'user@example.com',
     *   {
     *     brief: 'marketing-consent',
     *     agreementmethod: 'web-form',
     *     referencecode: 'REF123',
     *     starttime: '2024-01-01T00:00:00Z',
     *     finaltime: '2025-01-01T00:00:00Z',
     *     status: 'active',
     *     lastmodifiedby: 'admin@company.com'
     *   }
     * );
     */
    DatabunkerproAPI.prototype.acceptAgreement = function (mode_1, identity_1, options_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    mode: mode,
                    identity: identity,
                    brief: options.brief,
                    agreementmethod: options.agreementmethod,
                    referencecode: options.referencecode,
                    starttime: options.starttime,
                    finaltime: options.finaltime,
                    status: options.status,
                    lastmodifiedby: options.lastmodifiedby
                };
                return [2 /*return*/, this.makeRequest('AgreementAccept', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.cancelAgreement = function (mode_1, identity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, brief, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementCancel', 'POST', { mode: mode, identity: identity, brief: brief }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestAgreementCancellation = function (mode_1, identity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, brief, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementCancelRequest', 'POST', { mode: mode, identity: identity, brief: brief }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getUserAgreement = function (mode_1, identity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, brief, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementGet', 'POST', { mode: mode, identity: identity, brief: brief }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listUserAgreements = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementListUserAgreements', 'POST', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAgreements = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('LegalBasisListAgreements', 'POST', null, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listProcessingActivities = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ProcessingActivityListActivities', 'POST', null, requestMetadata)];
            });
        });
    };
    // Group Management
    DatabunkerproAPI.prototype.createGroup = function (groupname_1) {
        return __awaiter(this, arguments, void 0, function (groupname, groupdesc, requestMetadata) {
            if (groupdesc === void 0) { groupdesc = ''; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('GroupCreate', 'POST', { groupname: groupname, groupdesc: groupdesc }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getGroup = function (groupid_1) {
        return __awaiter(this, arguments, void 0, function (groupid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('GroupGet', 'POST', { groupid: groupid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAllGroups = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('GroupListAllGroups', 'POST', null, requestMetadata)];
            });
        });
    };
    /**
     * Adds a user to a group with an optional role
     * @param mode User identification mode (e.g., 'email', 'phone', 'token')
     * @param identity User's identifier corresponding to the mode
     * @param groupname Group name or ID to add the user to
     * @param rolename Optional role name or ID to assign to the user in the group
     * @param requestMetadata Additional metadata to include with the request
     */
    DatabunkerproAPI.prototype.addUserToGroup = function (mode_1, identity_1, groupname_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, groupname, rolename, requestMetadata) {
            var data;
            if (rolename === void 0) { rolename = null; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity };
                // Check if groupname is an integer (group ID) or string (group name)
                if (Number.isInteger(Number(groupname))) {
                    data.groupid = groupname;
                }
                else {
                    data.groupname = groupname;
                }
                if (rolename) {
                    // Check if rolename is an integer (role ID) or string (role name)
                    if (Number.isInteger(Number(rolename))) {
                        data.roleid = rolename;
                    }
                    else {
                        data.rolename = rolename;
                    }
                }
                return [2 /*return*/, this.makeRequest('GroupAddUser', 'POST', data, requestMetadata)];
            });
        });
    };
    // Token Management
    DatabunkerproAPI.prototype.createXToken = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('XTokenCreate', 'POST', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    // Token Management (for example for credit cards)
    /**
     * Creates a token for sensitive data like credit card numbers
     * @param tokentype - Type of token (e.g., 'creditcard')
     * @param record - The sensitive data to tokenize
     * @param options - Optional parameters for token creation
     * @param options.slidingtime - Time period for token validity (e.g., '1d', '1h')
     * @param options.finaltime - Absolute expiration time for the token
     * @param options.unique - Whether to create a unique token for each request
     * @param requestMetadata - Optional request metadata
     */
    DatabunkerproAPI.prototype.createToken = function (tokentype_1, record_1) {
        return __awaiter(this, arguments, void 0, function (tokentype, record, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ tokentype: tokentype, record: record }, options);
                return [2 /*return*/, this.makeRequest('TokenCreate', 'POST', data, requestMetadata)];
            });
        });
    };
    /**
     * Creates multiple tokens in bulk for sensitive data
     * @param records - Array of records to tokenize, each containing tokentype and record
     * @param options - Optional parameters for token creation
     * @param options.slidingtime - Time period for token validity (e.g., '1d', '1h')
     * @param options.finaltime - Absolute expiration time for the token
     * @param options.unique - Whether to create unique tokens for each request
     * @param requestMetadata - Optional request metadata
     */
    DatabunkerproAPI.prototype.createTokensBulk = function (records_1) {
        return __awaiter(this, arguments, void 0, function (records, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ records: records }, options);
                return [2 /*return*/, this.makeRequest('TokenCreateBulk', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getToken = function (token_1) {
        return __awaiter(this, arguments, void 0, function (token, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TokenGet', 'POST', { token: token }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteToken = function (token_1) {
        return __awaiter(this, arguments, void 0, function (token, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TokenDelete', 'POST', { token: token }, requestMetadata)];
            });
        });
    };
    // Audit Management
    DatabunkerproAPI.prototype.listUserAuditEvents = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, offset: offset, limit: limit };
                return [2 /*return*/, this.makeRequest('AuditListUserEvents', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getAuditEvent = function (auditeventuuid_1) {
        return __awaiter(this, arguments, void 0, function (auditeventuuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid: auditeventuuid }, requestMetadata)];
            });
        });
    };
    // Tenant Management
    DatabunkerproAPI.prototype.createTenant = function (data_1) {
        return __awaiter(this, arguments, void 0, function (data, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantCreate', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getTenant = function (tenantid_1) {
        return __awaiter(this, arguments, void 0, function (tenantid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantGet', 'POST', { tenantid: tenantid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateTenant = function (tenantid_1, tenantname_1, tenantorg_1, email_1) {
        return __awaiter(this, arguments, void 0, function (tenantid, tenantname, tenantorg, email, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { tenantid: tenantid, tenantname: tenantname, tenantorg: tenantorg, email: email };
                return [2 /*return*/, this.makeRequest('TenantUpdate', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteTenant = function (tenantid_1) {
        return __awaiter(this, arguments, void 0, function (tenantid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantDelete', 'POST', { tenantid: tenantid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listTenants = function () {
        return __awaiter(this, arguments, void 0, function (offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { offset: offset, limit: limit };
                return [2 /*return*/, this.makeRequest('TenantListTenants', 'POST', data, requestMetadata)];
            });
        });
    };
    // Role Management
    DatabunkerproAPI.prototype.createRole = function (rolename_1) {
        return __awaiter(this, arguments, void 0, function (rolename, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('RoleCreate', 'POST', { rolename: rolename }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.linkPolicy = function (rolename_1, policyname_1) {
        return __awaiter(this, arguments, void 0, function (rolename, policyname, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('RoleLinkPolicy', 'POST', { rolename: rolename, policyname: policyname }, requestMetadata)];
            });
        });
    };
    // Policy Management
    DatabunkerproAPI.prototype.createPolicy = function (data_1) {
        return __awaiter(this, arguments, void 0, function (data, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('PolicyCreate', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updatePolicy = function (policyid_1, data_1) {
        return __awaiter(this, arguments, void 0, function (policyid, data, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('PolicyUpdate', 'POST', __assign({ policyid: policyid }, data), requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getPolicy = function (policyname_1) {
        return __awaiter(this, arguments, void 0, function (policyname, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {};
                if (policyname) {
                    if (Number.isInteger(Number(policyname))) {
                        data.policyid = policyname;
                    }
                    else {
                        data.policyname = policyname;
                    }
                }
                return [2 /*return*/, this.makeRequest('PolicyGet', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listPolicies = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('PolicyListAllPolicies', 'POST', null, requestMetadata)];
            });
        });
    };
    // Bulk Operations
    DatabunkerproAPI.prototype.bulkListUnlock = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('BulkListUnlock', 'POST', null, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListUsers = function (unlockuuid_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, offset: offset, limit: limit };
                return [2 /*return*/, this.makeRequest('BulkListUsers', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListGroupUsers = function (unlockuuid_1, groupname_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, groupname, offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, offset: offset, limit: limit };
                if (Number.isInteger(Number(groupname))) {
                    data.groupid = groupname;
                }
                else {
                    data.groupname = groupname;
                }
                return [2 /*return*/, this.makeRequest('BulkListGroupUsers', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListUserRequests = function (unlockuuid_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, offset: offset, limit: limit };
                return [2 /*return*/, this.makeRequest('BulkListUserRequests', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListAuditEvents = function (unlockuuid_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, offset: offset, limit: limit };
                return [2 /*return*/, this.makeRequest('BulkListAuditEvents', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListTokens = function (unlockuuid_1, tokens_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, tokens, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, tokens: tokens };
                return [2 /*return*/, this.makeRequest('BulkListTokens', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkDeleteTokens = function (unlockuuid_1, tokens_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, tokens, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, tokens: tokens };
                return [2 /*return*/, this.makeRequest('BulkDeleteTokens', 'POST', data, requestMetadata)];
            });
        });
    };
    // System Configuration
    DatabunkerproAPI.prototype.getUIConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantGetUIConf', 'POST')];
            });
        });
    };
    DatabunkerproAPI.prototype.getTenantConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantGetConf', 'POST')];
            });
        });
    };
    DatabunkerproAPI.prototype.getUserHTMLReport = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SystemGetUserHTMLReport', 'POST', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getUserReport = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SystemGetUserReport', 'POST', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    // User Request Management
    DatabunkerproAPI.prototype.getUserRequest = function (requestuuid_1) {
        return __awaiter(this, arguments, void 0, function (requestuuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserRequestGet', 'POST', { requestuuid: requestuuid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listUserRequests = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, offset: offset, limit: limit };
                return [2 /*return*/, this.makeRequest('UserRequestListUserRequests', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.cancelUserRequest = function (requestuuid_1) {
        return __awaiter(this, arguments, void 0, function (requestuuid, reason, requestMetadata) {
            if (reason === void 0) { reason = null; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserRequestCancel', 'POST', { requestuuid: requestuuid, reason: reason }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.approveUserRequest = function (requestuuid_1) {
        return __awaiter(this, arguments, void 0, function (requestuuid, reason, requestMetadata) {
            if (reason === void 0) { reason = null; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserRequestApprove', 'POST', { requestuuid: requestuuid, reason: reason }, requestMetadata)];
            });
        });
    };
    // Connector Management
    DatabunkerproAPI.prototype.listSupportedConnectors = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ConnectorListSupportedConnectors', 'POST', null, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listConnectors = function () {
        return __awaiter(this, arguments, void 0, function (offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { offset: offset, limit: limit };
                return [2 /*return*/, this.makeRequest('ConnectorListConnectors', 'POST', data, requestMetadata)];
            });
        });
    };
    /**
     * Creates a new database connector with the specified configuration
     * @param {ConnectorOptions} options - The connector configuration options
     * @param {string} [options.connectorname] - Name of the connector (e.g., "MySQL Production")
     * @param {string} [options.connectortype] - Type of the connector (e.g., 'mysql', 'postgresql', 'mongodb')
     * @param {string} [options.connectordesc] - Description of the connector's purpose
     * @param {string} [options.username] - Username for database connection
     * @param {string} [options.apikey] - API key for authentication with the database
     * @param {string} [options.dbhost] - Database host address (e.g., "db.example.com")
     * @param {number} [options.dbport] - Database port number (e.g., 3306 for MySQL)
     * @param {string} [options.dbname] - Name of the database to connect to
     * @param {string} [options.tablename] - Specific table name if applicable
     * @param {string} [options.status] - Status of the connector (e.g., 'active', 'inactive')
     * @param {RequestMetadata} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<any>} The created connector details
     */
    DatabunkerproAPI.prototype.createConnector = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
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
                return [2 /*return*/, this.makeRequest('ConnectorCreate', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateConnector = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    connectorid: options.connectorid,
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
                return [2 /*return*/, this.makeRequest('ConnectorUpdate', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.validateConnectorConnectivity = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    connectorid: options.connectorid,
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
                return [2 /*return*/, this.makeRequest('ConnectorValidateConnectivity', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteConnector = function (connectorid_1) {
        return __awaiter(this, arguments, void 0, function (connectorid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ConnectorDelete', 'POST', { connectorid: connectorid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getTableMetadata = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    connectorid: options.connectorid,
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
                return [2 /*return*/, this.makeRequest('ConnectorGetTableMetaData', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.connectorGetUserData = function (mode_1, identity_1, connectorid_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, connectorid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ConnectorGetUserData', 'POST', { mode: mode, identity: identity, connectorid: connectorid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.connectorGetUserExtraData = function (mode_1, identity_1, connectorid_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, connectorid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ConnectorGetUserExtraData', 'POST', { mode: mode, identity: identity, connectorid: connectorid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.connectorDeleteUser = function (mode_1, identity_1, connectorid_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, connectorid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ConnectorDeleteUser', 'POST', { mode: mode, identity: identity, connectorid: connectorid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.upsertSession = function (sessionuuid_1, sessiondata_1) {
        return __awaiter(this, arguments, void 0, function (sessionuuid, sessiondata, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ sessionuuid: sessionuuid, sessiondata: sessiondata }, options);
                return [2 /*return*/, this.makeRequest('SessionUpsert', 'POST', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteSession = function (sessionuuid_1) {
        return __awaiter(this, arguments, void 0, function (sessionuuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SessionDelete', 'POST', { sessionuuid: sessionuuid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getSession = function (sessionuuid_1) {
        return __awaiter(this, arguments, void 0, function (sessionuuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SessionGet', 'POST', { sessionuuid: sessionuuid }, requestMetadata)];
            });
        });
    };
    /**
     * Gets system statistics
     * @param {RequestMetadata} [requestMetadata=null] - Additional metadata to include with the request
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
    DatabunkerproAPI.prototype.getSystemStats = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SystemGetSystemStats', 'POST', null, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.parsePrometheusMetrics = function (metricsText) {
        return __awaiter(this, void 0, void 0, function () {
            var lines, metrics, _i, lines_1, line, match, name_1, labels, value, metricKey;
            return __generator(this, function (_a) {
                lines = metricsText.split('\n');
                metrics = {};
                for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    line = lines_1[_i];
                    // Skip comments and empty lines
                    if (line.startsWith('#') || !line.trim())
                        continue;
                    match = line.match(/^([a-zA-Z0-9_]+)(?:{([^}]+)})?\s+([0-9.]+)$/);
                    if (match) {
                        name_1 = match[1], labels = match[2], value = match[3];
                        metricKey = labels ? "".concat(name_1, "{").concat(labels, "}") : name_1;
                        metrics[metricKey] = parseFloat(value);
                    }
                }
                return [2 /*return*/, metrics];
            });
        });
    };
    DatabunkerproAPI.prototype.getSystemMetrics = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            var response, metricsText;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.baseURL + '/metrics')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        metricsText = _a.sent();
                        return [2 /*return*/, this.parsePrometheusMetrics(metricsText)];
                }
            });
        });
    };
    /**
     * Creates a shared record for a user
     * @param mode - User identification mode (e.g., 'email', 'phone', 'token')
     * @param identity - User's identifier corresponding to the mode
     * @param options - Optional parameters for shared record creation
     * @param requestMetadata - Additional metadata to include with the request
     * @returns {Promise<any>} The created shared record information
     * @example
     * // Create a shared record with specific fields
     * const sharedRecord = await api.createSharedRecord('email', 'user@example.com', {
     *   fields: 'name,email',
     *   partner: 'partner-org',
     *   appname: 'myapp',
     *   finaltime: '1d'
     * });
     */
    DatabunkerproAPI.prototype.createSharedRecord = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    mode: mode,
                    identity: identity,
                    fields: options.fields,
                    partner: options.partner,
                    appname: options.appname,
                    finaltime: options.finaltime
                };
                return [2 /*return*/, this.makeRequest('SharedRecordCreate', 'POST', data, requestMetadata)];
            });
        });
    };
    /**
     * Gets a shared record by its UUID
     * @param recorduuid - UUID of the shared record to retrieve
     * @param requestMetadata - Additional metadata to include with the request
     * @returns {Promise<any>} The shared record information
     * @example
     * // Get a shared record by UUID
     * const sharedRecord = await api.getSharedRecord('123e4567-e89b-12d3-a456-426614174000');
     */
    DatabunkerproAPI.prototype.getSharedRecord = function (recorduuid_1) {
        return __awaiter(this, arguments, void 0, function (recorduuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SharedRecordGet', 'POST', { recorduuid: recorduuid }, requestMetadata)];
            });
        });
    };
    return DatabunkerproAPI;
}());
exports.DatabunkerproAPI = DatabunkerproAPI;
exports.default = DatabunkerproAPI;
