export enum Role{
    USER = "USER",
    ADMIN = "ADMIN"
}

export const ROLE_VALUES: Role[] = [
  Role.USER,
  Role.ADMIN
];

export enum Permission{
    READ_SELF = "READ_SELF",
    READ_USERS = "READ_USERS",
    WRITE_USERS = "WRITE_USERS"
}

// Role -> permissions mapping
export const RolePermissions: Record<Role, Permission[]> = {
    [Role.USER]: [
        Permission.READ_SELF
    ],
    [Role.ADMIN]: [
        Permission.READ_SELF,
        Permission.READ_USERS,
        Permission.WRITE_USERS
    ]
};