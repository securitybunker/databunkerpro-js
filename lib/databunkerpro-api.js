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
        return __awaiter(this, arguments, void 0, function (endpoint, method, data, request_metadata) {
            var headers, options, bodyData, response, result;
            if (method === void 0) { method = 'POST'; }
            if (data === void 0) { data = null; }
            if (request_metadata === void 0) { request_metadata = null; }
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
                        if (data || request_metadata) {
                            bodyData = data ? __assign({}, data) : {};
                            if (request_metadata) {
                                bodyData.request_metadata = request_metadata;
                            }
                            options.body = JSON.stringify(bodyData);
                        }
                        return [4 /*yield*/, fetch("".concat(this.baseURL, "/v2/").concat(endpoint), options)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (!response.ok) {
                            throw new Error(result.message || 'API request failed');
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    // User Management
    DatabunkerproAPI.prototype.createUser = function (profile_1) {
        return __awaiter(this, arguments, void 0, function (profile, options) {
            var data;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                data = { profile: profile };
                // Handle groupname/groupid
                if (options.groupname) {
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
                return [2 /*return*/, this.makeRequest('UserCreate', 'POST', data, options.request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getUser = function (mode, identity, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserGet', 'POST', { mode: mode, identity: identity }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.deleteUser = function (mode, identity, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserDelete', 'POST', { mode: mode, identity: identity }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.changeUser = function (mode, identity, profile, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('UserChange', 'POST', { mode: mode, identity: identity, profile: profile }, request_metadata)];
            });
        });
    };
    // App Data Management
    DatabunkerproAPI.prototype.createAppData = function (mode, identity, appname, data, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataCreate', 'POST', { mode: mode, identity: identity, appname: appname, data: data }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getAppData = function (mode, identity, appname, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataGet', 'POST', { mode: mode, identity: identity, appname: appname }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAppNames = function (request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AppdataListAppNames', 'POST', null, request_metadata)];
            });
        });
    };
    // Agreement Management
    DatabunkerproAPI.prototype.acceptAgreement = function (mode, identity, brief, agreementmethod, referencecode, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementAccept', 'POST', {
                        mode: mode,
                        identity: identity,
                        brief: brief,
                        agreementmethod: agreementmethod,
                        referencecode: referencecode
                    }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getAgreement = function (mode, identity, brief, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementGet', 'POST', { mode: mode, identity: identity, brief: brief }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listUserAgreements = function (mode, identity, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AgreementListUserAgreements', 'POST', { mode: mode, identity: identity }, request_metadata)];
            });
        });
    };
    // Group Management
    DatabunkerproAPI.prototype.createGroup = function (groupname_1) {
        return __awaiter(this, arguments, void 0, function (groupname, groupdesc, request_metadata) {
            if (groupdesc === void 0) { groupdesc = ''; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('GroupCreate', 'POST', { groupname: groupname, groupdesc: groupdesc }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getGroup = function (groupid, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('GroupGet', 'POST', { groupid: groupid }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listAllGroups = function (request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('GroupListAllGroups', 'POST', null, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.addUserToGroup = function (groupname, mode, identity, rolename, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = { mode: mode, identity: identity };
                if (Number.isInteger(Number(groupname))) {
                    data.groupid = groupname;
                }
                else {
                    data.groupname = groupname;
                }
                if (rolename) {
                    if (Number.isInteger(Number(rolename))) {
                        data.roleid = rolename;
                    }
                    else {
                        data.rolename = rolename;
                    }
                }
                return [2 /*return*/, this.makeRequest('GroupAddUser', 'POST', data, request_metadata)];
            });
        });
    };
    // Token Management
    DatabunkerproAPI.prototype.createXToken = function (mode, identity, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('XTokenCreate', 'POST', { mode: mode, identity: identity }, request_metadata)];
            });
        });
    };
    // Audit Management
    DatabunkerproAPI.prototype.listUserEvents = function (mode, identity, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AuditListUserEvents', 'POST', { mode: mode, identity: identity }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getAuditEvent = function (auditeventuuid, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('AuditGetEvent', 'POST', { auditeventuuid: auditeventuuid }, request_metadata)];
            });
        });
    };
    // Tenant Management
    DatabunkerproAPI.prototype.createTenant = function (data, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantCreate', 'POST', data, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.getTenant = function (tenantid, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantGet', 'POST', { tenantid: tenantid }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.renameTenant = function (tenantid, tenantname, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantRename', 'POST', { tenantid: tenantid, tenantname: tenantname }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listTenants = function (request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('TenantListTenants', 'POST', null, request_metadata)];
            });
        });
    };
    // Role Management
    DatabunkerproAPI.prototype.createRole = function (rolename, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('RoleCreate', 'POST', { rolename: rolename }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.linkPolicy = function (rolename, policyname, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('RoleLinkPolicy', 'POST', { rolename: rolename, policyname: policyname }, request_metadata)];
            });
        });
    };
    // Policy Management
    DatabunkerproAPI.prototype.createPolicy = function (data, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('PolicyCreate', 'POST', data, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.listPolicies = function (request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('PolicyListAllPolicies', 'POST', null, request_metadata)];
            });
        });
    };
    // Bulk Operations
    DatabunkerproAPI.prototype.bulkListUnlock = function (request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('BulkListUnlock', 'POST', null, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListUsers = function (unlockuuid, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('BulkListUsers', 'POST', { unlockuuid: unlockuuid }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListGroupUsers = function (unlockuuid, groupname, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                data = { unlockuuid: unlockuuid };
                if (Number.isInteger(Number(groupname))) {
                    data.groupid = groupname;
                }
                else {
                    data.groupname = groupname;
                }
                return [2 /*return*/, this.makeRequest('BulkListGroupUsers', 'POST', data, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListUserRequests = function (unlockuuid, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('BulkListUserRequests', 'POST', { unlockuuid: unlockuuid }, request_metadata)];
            });
        });
    };
    DatabunkerproAPI.prototype.bulkListAuditEvents = function (unlockuuid, request_metadata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeRequest('BulkListAuditEvents', 'POST', { unlockuuid: unlockuuid }, request_metadata)];
            });
        });
    };
    return DatabunkerproAPI;
}());
exports.DatabunkerproAPI = DatabunkerproAPI;
// Export for Node.js and browser environments
exports.default = DatabunkerproAPI;
