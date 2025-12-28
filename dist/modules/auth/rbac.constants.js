"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions = exports.Permission = exports.ROLE_VALUES = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
exports.ROLE_VALUES = [
    Role.USER,
    Role.ADMIN
];
var Permission;
(function (Permission) {
    Permission["READ_SELF"] = "READ_SELF";
    Permission["READ_USERS"] = "READ_USERS";
    Permission["WRITE_USERS"] = "WRITE_USERS";
})(Permission || (exports.Permission = Permission = {}));
// Role -> permissions mapping
exports.RolePermissions = {
    [Role.USER]: [
        Permission.READ_SELF
    ],
    [Role.ADMIN]: [
        Permission.READ_SELF,
        Permission.READ_USERS,
        Permission.WRITE_USERS
    ]
};
