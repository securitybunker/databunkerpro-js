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
    function DatabunkerproAPI(baseURL, xBunkerToken) {
        if (xBunkerToken === void 0) { xBunkerToken = ''; }
        this.baseURL = baseURL;
        this.xBunkerToken = xBunkerToken;
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
    DatabunkerproAPI.prototype.getUserAppData = function (mode_1, identity_1, appname_1) {
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
    DatabunkerproAPI.prototype.listUserAppDataRecords = function (mode_1, identity_1) {
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
    DatabunkerproAPI.prototype.acceptAgreement = function (mode_1, identity_1, brief_1) {
        return __awaiter(this, arguments, void 0, function (mode, identity, brief, agreementmethod, referencecode, requestMetadata) {
            if (agreementmethod === void 0) { agreementmethod = null; }
            if (referencecode === void 0) { referencecode = null; }
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementAccept', 'POST', {
                        mode: mode,
                        identity: identity,
                        brief: brief,
                        agreementmethod: agreementmethod,
                        referencecode: referencecode
                    }, requestMetadata)];
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
    DatabunkerproAPI.prototype.addUserToGroup = function (groupname_1, mode_1, identity_1) {
        return __awaiter(this, arguments, void 0, function (groupname, mode, identity, rolename, requestMetadata) {
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
    DatabunkerproAPI.prototype.updateTenant = function (tenantid_1, tenantname_1) {
        return __awaiter(this, arguments, void 0, function (tenantid, tenantname, requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantUpdate', 'POST', { tenantid: tenantid, tenantname: tenantname }, requestMetadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listTenants = function () {
        return __awaiter(this, arguments, void 0, function (requestMetadata) {
            if (requestMetadata === void 0) { requestMetadata = null; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantListTenants', 'POST', null, requestMetadata)];
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
    return DatabunkerproAPI;
}());
exports.DatabunkerproAPI = DatabunkerproAPI;
// Export for Node.js and browser environments
exports.default = DatabunkerproAPI;
