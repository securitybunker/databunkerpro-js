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
        return __awaiter(this, arguments, void 0, function (endpoint, data, requestMetadata) {
            var headers, options, bodyData, url, response, result, error_1;
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
                            method: 'POST',
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
        return __awaiter(this, arguments, void 0, function (endpoint, data, requestMetadata) {
            var headers, options, bodyData, response, result;
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
                            method: 'POST',
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
                return [2 /*return*/, this.makeRequest('UserCreate', data, requestMetadata)];
            });
        });
    };
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
                return [2 /*return*/, this.makeRequest('UserCreateBulk', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getUser = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserGet', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateUser = function (mode_1, identity_1, profile_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, profile, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserUpdate', { mode: mode, identity: identity, profile: profile }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestUserUpdate = function (mode_1, identity_1, profile_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, profile, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserUpdateRequest', { mode: mode, identity: identity, profile: profile }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.patchUser = function (mode_1, identity_1, patch_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, patch, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserPatch', { mode: mode, identity: identity, patch: patch }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestUserPatch = function (mode_1, identity_1, patch_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, patch, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserPatchRequest', { mode: mode, identity: identity, patch: patch }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteUser = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserDelete', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestUserDeletion = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserDeleteRequest', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    // User Authentication
    DatabunkerproAPI.prototype.preloginUser = function (mode_1, identity_1, code_1, captchacode_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, code, captchacode, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserPrelogin', { mode: mode, identity: identity, code: code, captchacode: captchacode }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.loginUser = function (mode_1, identity_1, smscode_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, smscode, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserLogin', { mode: mode, identity: identity, smscode: smscode }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.createCaptcha = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('CaptchaCreate', null, requestMetadata)];
            });
        });
    };
    // Create user API Access Token
    /**
     * Creates an access token for a user
     * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
     * @param {string} identity - User's identifier corresponding to the mode
     * @param {Object} [options={}] - Optional parameters for token creation
     * @param {string} [options.finaltime] - Absolute expiration time for the token
     * @param {string} [options.slidingtime] - Sliding time period for the token
     * @param {Object} [requestMetadata=null] - Optional request metadata
     * @returns {Promise<Object>} The created token information
     */
    DatabunkerproAPI.prototype.createUserXToken = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ mode: mode, identity: identity }, options);
                return [2 /*return*/, this.makeRequest('XTokenCreateForUser', data, requestMetadata)];
            });
        });
    };
    /**
     * Creates an access token for a role
     * @param {string|number} roleid - Role ID
     * @param {Object} [options={}] - Optional parameters for token creation
     * @param {string} [options.finaltime] - Absolute expiration time for the token
     * @param {string} [options.slidingtime] - Sliding time period for the token
     * @param {Object} [requestMetadata=null] - Optional request metadata
     * @returns {Promise<Object>} The created token information
     */
    DatabunkerproAPI.prototype.createRoleXToken = function (roleref_1) {
        return __awaiter(this, arguments, void 0, function (roleref, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({}, options);
                if (Number.isInteger(Number(roleref))) {
                    data.roleid = roleref;
                }
                else {
                    data.rolename = roleref;
                }
                return [2 /*return*/, this.makeRequest('XTokenCreateForRole', data, requestMetadata)];
            });
        });
    };
    // User Request Management
    DatabunkerproAPI.prototype.getUserRequest = function (requestuuid_1) {
        return __awaiter(this, arguments, void 0, function (requestuuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserRequestGet', { requestuuid: requestuuid }, requestMetadata)];
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
                return [2 /*return*/, this.makeRequest('UserRequestListUserRequests', data, requestMetadata)];
            });
        });
    };
    /**
     * Cancels a user request
     * @param {string} requestuuid - UUID of the request to cancel
     * @param {Object} [options={}] - Optional parameters for cancellation
     * @param {string} [options.reason] - Reason for cancellation
     * @param {Object} [requestMetadata=null] - Optional request metadata
     * @returns {Promise<Object>} The cancellation result
     */
    DatabunkerproAPI.prototype.cancelUserRequest = function (requestuuid_1) {
        return __awaiter(this, arguments, void 0, function (requestuuid, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { requestuuid: requestuuid };
                if (options.reason) {
                    data.reason = options.reason;
                }
                return [2 /*return*/, this.makeRequest('UserRequestCancel', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.approveUserRequest = function (requestuuid_1) {
        return __awaiter(this, arguments, void 0, function (requestuuid, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { requestuuid: requestuuid };
                if (options.reason) {
                    data.reason = options.reason;
                }
                return [2 /*return*/, this.makeRequest('UserRequestApprove', data, requestMetadata)];
            });
        });
    };
    // App Data Management
    DatabunkerproAPI.prototype.createAppData = function (mode_1, identity_1, appname_1, appdata_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, appname, appdata, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, appname: appname, appdata: appdata };
                return [2 /*return*/, this.makeRequest('AppdataCreate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getAppData = function (mode_1, identity_1, appname_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, appname, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, appname: appname };
                return [2 /*return*/, this.makeRequest('AppdataGet', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateAppData = function (mode_1, identity_1, appname_1, appdata_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, appname, appdata, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, appname: appname, appdata: appdata };
                return [2 /*return*/, this.makeRequest('AppdataUpdate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestAppDataUpdate = function (mode_1, identity_1, appname_1, appdata_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, appname, appdata, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, appname: appname, appdata: appdata };
                return [2 /*return*/, this.makeRequest('AppdataUpdateRequest', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAppDataNames = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataListUserAppNames', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAppNames = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataListAppNames', null, requestMetadata)];
            });
        });
    };
    // Legal Basis Management
    DatabunkerproAPI.prototype.createLegalBasis = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    brief: options.brief,
                    status: options.status,
                    module: options.module,
                    fulldesc: options.fulldesc,
                    shortdesc: options.shortdesc,
                    basistype: options.basistype,
                    requiredmsg: options.requiredmsg,
                    requiredflag: options.requiredflag
                };
                return [2 /*return*/, this.makeRequest('LegalBasisCreate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateLegalBasis = function (brief_1, options_1) {
        return __awaiter(this, arguments, void 0, function (brief, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ brief: brief }, options);
                return [2 /*return*/, this.makeRequest('LegalBasisUpdate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteLegalBasis = function (brief_1) {
        return __awaiter(this, arguments, void 0, function (brief, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('LegalBasisDelete', { brief: brief }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAgreements = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('LegalBasisListAgreements', null, requestMetadata)];
            });
        });
    };
    // Agreement Management
    /**
     * Records user's acceptance of a legal basis/agreement
     * @param {string} mode - User identification mode (e.g., 'email', 'phone', 'token')
     * @param {string} identity - User's identifier corresponding to the mode (e.g., email address, phone number)
     * @param {string} brief - Unique identifier of the legal basis/agreement being accepted
     * @param {Object} [options={}] - Optional parameters for agreement acceptance
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
     *   'marketing-consent',
     *   {
     *     agreementmethod: 'web-form',
     *     referencecode: 'REF123',
     *     starttime: '10d',
     *     finaltime: '100d',
     *     status: 'active',
     *     lastmodifiedby: 'admin@company.com'
     *   }
     * );
     */
    DatabunkerproAPI.prototype.acceptAgreement = function (mode_1, identity_1, brief_1, options_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, brief, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, brief: brief };
                if (options.agreementmethod) {
                    data.agreementmethod = options.agreementmethod;
                }
                if (options.lastmodifiedby) {
                    data.lastmodifiedby = options.lastmodifiedby;
                }
                if (options.referencecode) {
                    data.referencecode = options.referencecode;
                }
                if (options.starttime) {
                    data.starttime = options.starttime;
                }
                if (options.finaltime) {
                    data.finaltime = options.finaltime;
                }
                if (options.status) {
                    data.status = options.status;
                }
                return [2 /*return*/, this.makeRequest('AgreementAccept', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getUserAgreement = function (mode_1, identity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, brief, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, brief: brief };
                return [2 /*return*/, this.makeRequest('AgreementGet', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listUserAgreements = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity };
                return [2 /*return*/, this.makeRequest('AgreementListUserAgreements', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.cancelAgreement = function (mode_1, identity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, brief, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, brief: brief };
                return [2 /*return*/, this.makeRequest('AgreementCancel', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.requestAgreementCancellation = function (mode_1, identity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, brief, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity, brief: brief };
                return [2 /*return*/, this.makeRequest('AgreementCancelRequest', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.revokeAllAgreements = function (brief_1) {
        return __awaiter(this, arguments, void 0, function (brief, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementRevokeAll', { brief: brief }, requestMetadata)];
            });
        });
    };
    // Processing Activity Management
    DatabunkerproAPI.prototype.listProcessingActivities = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ProcessingActivityListActivities', null, requestMetadata)];
            });
        });
    };
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
    DatabunkerproAPI.prototype.createProcessingActivity = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    activity: options.activity,
                    title: options.title,
                    script: options.script,
                    fulldesc: options.fulldesc,
                    applicableto: options.applicableto
                };
                return [2 /*return*/, this.makeRequest('ProcessingActivityCreate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateProcessingActivity = function (activity_1, options_1) {
        return __awaiter(this, arguments, void 0, function (activity, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ activity: activity }, options);
                return [2 /*return*/, this.makeRequest('ProcessingActivityUpdate', data, requestMetadata)];
            });
        });
    };
    /**
     * Deletes a processing activity
     * @param {string} activity - Activity identifier to delete
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The deletion result
     */
    DatabunkerproAPI.prototype.deleteProcessingActivity = function (activity_1) {
        return __awaiter(this, arguments, void 0, function (activity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ProcessingActivityDelete', { activity: activity }, requestMetadata)];
            });
        });
    };
    /**
     * Links a processing activity to a legal basis
     * @param {string} activity - Activity identifier
     * @param {string} brief - Legal basis brief identifier
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The linking result
     */
    DatabunkerproAPI.prototype.linkProcessingActivityToLegalBasis = function (activity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (activity, brief, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { activity: activity, brief: brief };
                return [2 /*return*/, this.makeRequest('ProcessingActivityLinkLegalBasis', data, requestMetadata)];
            });
        });
    };
    /**
     * Unlinks a processing activity from a legal basis
     * @param {string} activity - Activity identifier
     * @param {string} brief - Legal basis brief identifier
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The unlinking result
     */
    DatabunkerproAPI.prototype.unlinkProcessingActivityFromLegalBasis = function (activity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (activity, brief, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { activity: activity, brief: brief };
                return [2 /*return*/, this.makeRequest('ProcessingActivityUnlinkLegalBasis', data, requestMetadata)];
            });
        });
    };
    // Connector Management
    DatabunkerproAPI.prototype.listSupportedConnectors = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('ConnectorListSupportedConnectors', null, requestMetadata)];
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
                return [2 /*return*/, this.makeRequest('ConnectorListConnectors', data, requestMetadata)];
            });
        });
    };
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
                return [2 /*return*/, this.makeRequest('ConnectorCreate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateConnector = function (connectorid_1, options_1) {
        return __awaiter(this, arguments, void 0, function (connectorid, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ connectorid: connectorid }, options);
                return [2 /*return*/, this.makeRequest('ConnectorUpdate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.validateConnectorConnectivity = function (connectorref_1) {
        return __awaiter(this, arguments, void 0, function (connectorref, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({}, options);
                if (Number.isInteger(Number(connectorref))) {
                    data.connectorid = connectorref;
                }
                else {
                    data.connectorname = connectorref;
                }
                return [2 /*return*/, this.makeRequest('ConnectorValidateConnectivity', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteConnector = function (connectorref_1) {
        return __awaiter(this, arguments, void 0, function (connectorref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {};
                if (Number.isInteger(Number(connectorref))) {
                    data.connectorid = connectorref;
                }
                else {
                    data.connectorname = connectorref;
                }
                return [2 /*return*/, this.makeRequest('ConnectorDelete', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getTableMetadata = function (connectorref_1) {
        return __awaiter(this, arguments, void 0, function (connectorref, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({}, options);
                if (Number.isInteger(Number(connectorref))) {
                    data.connectorid = connectorref;
                }
                else {
                    data.connectorname = connectorref;
                }
                return [2 /*return*/, this.makeRequest('ConnectorGetTableMetaData', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.connectorGetUserData = function (mode_1, identity_1, connectorref_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, connectorref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity };
                if (Number.isInteger(Number(connectorref))) {
                    data.connectorid = connectorref;
                }
                else {
                    data.connectorname = connectorref;
                }
                return [2 /*return*/, this.makeRequest('ConnectorGetUserData', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.connectorGetUserExtraData = function (mode_1, identity_1, connectorref_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, connectorref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity };
                if (Number.isInteger(Number(connectorref))) {
                    data.connectorid = connectorref;
                }
                else {
                    data.connectorname = connectorref;
                }
                return [2 /*return*/, this.makeRequest('ConnectorGetUserExtraData', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.connectorDeleteUser = function (mode_1, identity_1, connectorref_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, connectorref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity };
                if (Number.isInteger(Number(connectorref))) {
                    data.connectorid = connectorref;
                }
                else {
                    data.connectorname = connectorref;
                }
                return [2 /*return*/, this.makeRequest('ConnectorDeleteUser', data, requestMetadata)];
            });
        });
    };
    // Group Management
    DatabunkerproAPI.prototype.createGroup = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    groupname: options.groupname,
                    groupdesc: options.groupdesc,
                    grouptype: options.grouptype,
                };
                return [2 /*return*/, this.makeRequest('GroupCreate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getGroup = function (groupref_1) {
        return __awaiter(this, arguments, void 0, function (groupref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {};
                if (Number.isInteger(Number(groupref))) {
                    data.groupid = groupref;
                }
                else {
                    data.groupname = groupref;
                }
                return [2 /*return*/, this.makeRequest('GroupGet', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAllGroups = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('GroupListAllGroups', null, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listUserGroups = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('GroupListUserGroups', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateGroup = function (groupid_1, options_1) {
        return __awaiter(this, arguments, void 0, function (groupid, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ groupid: groupid }, options);
                return [2 /*return*/, this.makeRequest('GroupUpdate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteGroup = function (groupref_1) {
        return __awaiter(this, arguments, void 0, function (groupref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {};
                if (Number.isInteger(Number(groupref))) {
                    data.groupid = groupref;
                }
                else {
                    data.groupname = groupref;
                }
                return [2 /*return*/, this.makeRequest('GroupDelete', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.removeUserFromGroup = function (mode_1, identity_1, groupref_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, groupref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity };
                if (Number.isInteger(Number(groupref))) {
                    data.groupid = groupref;
                }
                else {
                    data.groupname = groupref;
                }
                return [2 /*return*/, this.makeRequest('GroupDeleteUser', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.addUserToGroup = function (mode_1, identity_1, groupref_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, groupref, roleref, requestMetadata) {
            var data;
            if (roleref === void 0) { roleref = null; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity };
                // Check if groupref is an integer (group ID) or string (group name)
                if (Number.isInteger(Number(groupref))) {
                    data.groupid = groupref;
                }
                else {
                    data.groupname = groupref;
                }
                if (roleref) {
                    // Check if roleref is an integer (role ID) or string (role name)
                    if (Number.isInteger(Number(roleref))) {
                        data.roleid = roleref;
                    }
                    else {
                        data.rolename = roleref;
                    }
                }
                return [2 /*return*/, this.makeRequest('GroupAddUser', data, requestMetadata)];
            });
        });
    };
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
    DatabunkerproAPI.prototype.createToken = function (tokentype_1, record_1) {
        return __awaiter(this, arguments, void 0, function (tokentype, record, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ tokentype: tokentype, record: record }, options);
                return [2 /*return*/, this.makeRequest('TokenCreate', data, requestMetadata)];
            });
        });
    };
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
    DatabunkerproAPI.prototype.createTokensBulk = function (records_1) {
        return __awaiter(this, arguments, void 0, function (records, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ records: records }, options);
                return [2 /*return*/, this.makeRequest('TokenCreateBulk', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getToken = function (token_1) {
        return __awaiter(this, arguments, void 0, function (token, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TokenGet', { token: token }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteToken = function (token_1) {
        return __awaiter(this, arguments, void 0, function (token, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TokenDelete', { token: token }, requestMetadata)];
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
                return [2 /*return*/, this.makeRequest('AuditListUserEvents', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getAuditEvent = function (auditeventuuid_1) {
        return __awaiter(this, arguments, void 0, function (auditeventuuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AuditGetEvent', { auditeventuuid: auditeventuuid }, requestMetadata)];
            });
        });
    };
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
    DatabunkerproAPI.prototype.createTenant = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    tenantname: options.tenantname,
                    tenantorg: options.tenantorg,
                    email: options.email
                };
                return [2 /*return*/, this.makeRequest('TenantCreate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getTenant = function (tenantid_1) {
        return __awaiter(this, arguments, void 0, function (tenantid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantGet', { tenantid: tenantid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateTenant = function (tenantid_1, options_1) {
        return __awaiter(this, arguments, void 0, function (tenantid, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ tenantid: tenantid }, options);
                return [2 /*return*/, this.makeRequest('TenantUpdate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteTenant = function (tenantid_1) {
        return __awaiter(this, arguments, void 0, function (tenantid, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { tenantid: tenantid };
                return [2 /*return*/, this.makeRequest('TenantDelete', data, requestMetadata)];
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
                return [2 /*return*/, this.makeRequest('TenantListTenants', data, requestMetadata)];
            });
        });
    };
    // Role Management
    DatabunkerproAPI.prototype.createRole = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    rolename: options.rolename,
                    roledesc: options.roledesc,
                };
                return [2 /*return*/, this.makeRequest('RoleCreate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updateRole = function (roleid_1, options_1) {
        return __awaiter(this, arguments, void 0, function (roleid, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ roleid: roleid }, options);
                return [2 /*return*/, this.makeRequest('RoleUpdate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.linkPolicy = function (roleref_1, policyref_1) {
        return __awaiter(this, arguments, void 0, function (roleref, policyref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {};
                if (Number.isInteger(Number(roleref))) {
                    data.roleid = roleref;
                }
                else {
                    data.rolename = roleref;
                }
                if (Number.isInteger(Number(policyref))) {
                    data.policyid = policyref;
                }
                else {
                    data.policyname = policyref;
                }
                return [2 /*return*/, this.makeRequest('RoleLinkPolicy', data, requestMetadata)];
            });
        });
    };
    // Policy Management
    DatabunkerproAPI.prototype.createPolicy = function (options_1) {
        return __awaiter(this, arguments, void 0, function (options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {
                    policyname: options.policyname,
                    policydesc: options.policydesc,
                    policy: options.policy
                };
                return [2 /*return*/, this.makeRequest('PolicyCreate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.updatePolicy = function (policyid_1, options_1) {
        return __awaiter(this, arguments, void 0, function (policyid, options, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ policyid: policyid }, options);
                return [2 /*return*/, this.makeRequest('PolicyUpdate', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getPolicy = function (policyref_1) {
        return __awaiter(this, arguments, void 0, function (policyref, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = {};
                if (Number.isInteger(Number(policyref))) {
                    data.policyid = policyref;
                }
                else {
                    data.policyname = policyref;
                }
                return [2 /*return*/, this.makeRequest('PolicyGet', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listPolicies = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('PolicyListAllPolicies', null, requestMetadata)];
            });
        });
    };
    // Bulk Operations
    DatabunkerproAPI.prototype.bulkListUnlock = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('BulkListUnlock', null, requestMetadata)];
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
                return [2 /*return*/, this.makeRequest('BulkListUsers', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListGroupUsers = function (unlockuuid_1, groupref_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, groupref, offset, limit, requestMetadata) {
            var data;
            if (offset === void 0) { offset = 0; }
            if (limit === void 0) { limit = 10; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, offset: offset, limit: limit };
                if (Number.isInteger(Number(groupref))) {
                    data.groupid = groupref;
                }
                else {
                    data.groupname = groupref;
                }
                return [2 /*return*/, this.makeRequest('BulkListGroupUsers', data, requestMetadata)];
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
                return [2 /*return*/, this.makeRequest('BulkListUserRequests', data, requestMetadata)];
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
                return [2 /*return*/, this.makeRequest('BulkListAuditEvents', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListTokens = function (unlockuuid_1, tokens_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, tokens, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, tokens: tokens };
                return [2 /*return*/, this.makeRequest('BulkListTokens', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkDeleteTokens = function (unlockuuid_1, tokens_1) {
        return __awaiter(this, arguments, void 0, function (unlockuuid, tokens, requestMetadata) {
            var data;
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid, tokens: tokens };
                return [2 /*return*/, this.makeRequest('BulkDeleteTokens', data, requestMetadata)];
            });
        });
    };
    // System Configuration
    DatabunkerproAPI.prototype.getUIConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantGetUIConf')];
            });
        });
    };
    DatabunkerproAPI.prototype.getTenantConf = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantGetUIConf')];
            });
        });
    };
    DatabunkerproAPI.prototype.getUserHTMLReport = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SystemGetUserHTMLReport', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getUserReport = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SystemGetUserReport', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    // Session Management
    DatabunkerproAPI.prototype.upsertSession = function (sessionuuid_1, sessiondata_1) {
        return __awaiter(this, arguments, void 0, function (sessionuuid, sessiondata, options, requestMetadata) {
            var data;
            if (options === void 0) { options = {}; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                data = __assign({ sessionuuid: sessionuuid, sessiondata: sessiondata }, options);
                return [2 /*return*/, this.makeRequest('SessionUpsert', data, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteSession = function (sessionuuid_1) {
        return __awaiter(this, arguments, void 0, function (sessionuuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SessionDelete', { sessionuuid: sessionuuid }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listUserSessions = function (mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SessionListUserSessions', { mode: mode, identity: identity }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getSession = function (sessionuuid_1) {
        return __awaiter(this, arguments, void 0, function (sessionuuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SessionGet', { sessionuuid: sessionuuid }, requestMetadata)];
            });
        });
    };
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
    DatabunkerproAPI.prototype.getSystemStats = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SystemGetSystemStats', null, requestMetadata)];
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
                return [2 /*return*/, this.makeRequest('SharedRecordCreate', data, requestMetadata)];
            });
        });
    };
    /**
     * Gets a shared record by its UUID
     * @param {string} recorduuid - UUID of the shared record to retrieve
     * @param {Object} [requestMetadata=null] - Additional metadata to include with the request
     * @returns {Promise<Object>} The shared record information
     * @example
     * // Get a shared record by UUID
     * const sharedRecord = await api.getSharedRecord('123e4567-e89b-12d3-a456-426614174000');
     */
    DatabunkerproAPI.prototype.getSharedRecord = function (recorduuid_1) {
        return __awaiter(this, arguments, void 0, function (recorduuid, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('SharedRecordGet', { recorduuid: recorduuid }, requestMetadata)];
            });
        });
    };
    return DatabunkerproAPI;
}());
exports.DatabunkerproAPI = DatabunkerproAPI;
exports.default = DatabunkerproAPI;
