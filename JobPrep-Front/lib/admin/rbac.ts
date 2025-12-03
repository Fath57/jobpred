// Role-Based Access Control (RBAC) System

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  conditions?: PermissionCondition[];
}

export interface PermissionCondition {
  field: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'in'
    | 'not_in'
    | 'greater_than'
    | 'less_than';
  value: any;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Permission IDs
  isSystemRole: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[]; // Role IDs
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RBACContext {
  user: User;
  resource?: string;
  resourceId?: string;
  data?: Record<string, any>;
}

// Predefined system roles
export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  DOMAIN_ADMIN: 'domain_admin',
  CONTENT_MANAGER: 'content_manager',
  ANALYST: 'analyst',
  SUPPORT: 'support',
  VIEWER: 'viewer',
} as const;

// Predefined permissions
export const PERMISSIONS = {
  // User management
  USERS_CREATE: 'users:create',
  USERS_READ: 'users:read',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',
  USERS_MANAGE: 'users:manage',

  // Role management
  ROLES_CREATE: 'roles:create',
  ROLES_READ: 'roles:read',
  ROLES_UPDATE: 'roles:update',
  ROLES_DELETE: 'roles:delete',
  ROLES_MANAGE: 'roles:manage',

  // Letters domain
  LETTERS_CREATE: 'letters:create',
  LETTERS_READ: 'letters:read',
  LETTERS_UPDATE: 'letters:update',
  LETTERS_DELETE: 'letters:delete',
  LETTERS_MANAGE: 'letters:manage',
  LETTERS_ANALYTICS: 'letters:analytics',

  // Resume domain
  RESUME_CREATE: 'resume:create',
  RESUME_READ: 'resume:read',
  RESUME_UPDATE: 'resume:update',
  RESUME_DELETE: 'resume:delete',
  RESUME_MANAGE: 'resume:manage',
  RESUME_ANALYTICS: 'resume:analytics',

  // Tests domain
  TESTS_CREATE: 'tests:create',
  TESTS_READ: 'tests:read',
  TESTS_UPDATE: 'tests:update',
  TESTS_DELETE: 'tests:delete',
  TESTS_MANAGE: 'tests:manage',
  TESTS_ANALYTICS: 'tests:analytics',

  // Speech domain
  SPEECH_CREATE: 'speech:create',
  SPEECH_READ: 'speech:read',
  SPEECH_UPDATE: 'speech:update',
  SPEECH_DELETE: 'speech:delete',
  SPEECH_MANAGE: 'speech:manage',
  SPEECH_ANALYTICS: 'speech:analytics',

  // Blog management
  BLOG_CREATE: 'blog:create',
  BLOG_READ: 'blog:read',
  BLOG_UPDATE: 'blog:update',
  BLOG_DELETE: 'blog:delete',
  BLOG_PUBLISH: 'blog:publish',
  BLOG_MANAGE: 'blog:manage',

  // Analytics
  ANALYTICS_READ: 'analytics:read',
  ANALYTICS_EXPORT: 'analytics:export',
  ANALYTICS_MANAGE: 'analytics:manage',

  // System administration
  SYSTEM_READ: 'system:read',
  SYSTEM_UPDATE: 'system:update',
  SYSTEM_MANAGE: 'system:manage',
  SYSTEM_MAINTENANCE: 'system:maintenance',

  // AI management
  AI_READ: 'ai:read',
  AI_UPDATE: 'ai:update',
  AI_MANAGE: 'ai:manage',
  AI_TRAINING: 'ai:training',

  // Security
  SECURITY_READ: 'security:read',
  SECURITY_MANAGE: 'security:manage',
  SECURITY_AUDIT: 'security:audit',
} as const;

// Default role definitions
export const DEFAULT_ROLES: Omit<Role, 'createdAt' | 'updatedAt'>[] = [
  {
    id: SYSTEM_ROLES.SUPER_ADMIN,
    name: 'Super Administrateur',
    description: 'Accès complet à toutes les fonctionnalités de la plateforme',
    permissions: Object.values(PERMISSIONS),
    isSystemRole: true,
  },
  {
    id: SYSTEM_ROLES.ADMIN,
    name: 'Administrateur',
    description:
      'Accès administratif avec restrictions sur la sécurité système',
    permissions: [
      PERMISSIONS.USERS_MANAGE,
      PERMISSIONS.LETTERS_MANAGE,
      PERMISSIONS.RESUME_MANAGE,
      PERMISSIONS.TESTS_MANAGE,
      PERMISSIONS.SPEECH_MANAGE,
      PERMISSIONS.BLOG_MANAGE,
      PERMISSIONS.ANALYTICS_MANAGE,
      PERMISSIONS.AI_READ,
      PERMISSIONS.SYSTEM_READ,
    ],
    isSystemRole: true,
  },
  {
    id: SYSTEM_ROLES.DOMAIN_ADMIN,
    name: 'Administrateur de Domaine',
    description:
      "Administration d'un domaine spécifique (Letters, Resume, Tests, Speech)",
    permissions: [
      PERMISSIONS.USERS_READ,
      PERMISSIONS.ANALYTICS_READ,
      PERMISSIONS.BLOG_READ,
    ],
    isSystemRole: true,
  },
  {
    id: SYSTEM_ROLES.CONTENT_MANAGER,
    name: 'Gestionnaire de Contenu',
    description: 'Gestion du blog et du contenu SEO',
    permissions: [
      PERMISSIONS.BLOG_MANAGE,
      PERMISSIONS.USERS_READ,
      PERMISSIONS.ANALYTICS_READ,
    ],
    isSystemRole: true,
  },
  {
    id: SYSTEM_ROLES.ANALYST,
    name: 'Analyste',
    description: 'Accès aux analytics et rapports',
    permissions: [
      PERMISSIONS.ANALYTICS_MANAGE,
      PERMISSIONS.USERS_READ,
      PERMISSIONS.LETTERS_READ,
      PERMISSIONS.RESUME_READ,
      PERMISSIONS.TESTS_READ,
      PERMISSIONS.SPEECH_READ,
      PERMISSIONS.BLOG_READ,
    ],
    isSystemRole: true,
  },
  {
    id: SYSTEM_ROLES.SUPPORT,
    name: 'Support Client',
    description: 'Support utilisateur et assistance',
    permissions: [
      PERMISSIONS.USERS_READ,
      PERMISSIONS.USERS_UPDATE,
      PERMISSIONS.LETTERS_READ,
      PERMISSIONS.RESUME_READ,
      PERMISSIONS.TESTS_READ,
      PERMISSIONS.SPEECH_READ,
    ],
    isSystemRole: true,
  },
  {
    id: SYSTEM_ROLES.VIEWER,
    name: 'Observateur',
    description: 'Accès en lecture seule',
    permissions: [
      PERMISSIONS.USERS_READ,
      PERMISSIONS.LETTERS_READ,
      PERMISSIONS.RESUME_READ,
      PERMISSIONS.TESTS_READ,
      PERMISSIONS.SPEECH_READ,
      PERMISSIONS.BLOG_READ,
      PERMISSIONS.ANALYTICS_READ,
    ],
    isSystemRole: true,
  },
];

// RBAC Service
export class RBACService {
  private roles: Map<string, Role> = new Map();
  private permissions: Map<string, Permission> = new Map();

  constructor() {
    this.initializeDefaultRoles();
    this.initializeDefaultPermissions();
  }

  private initializeDefaultRoles() {
    DEFAULT_ROLES.forEach(role => {
      this.roles.set(role.id, {
        ...role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }

  private initializeDefaultPermissions() {
    Object.entries(PERMISSIONS).forEach(([key, permissionId]) => {
      const [resource, action] = permissionId.split(':');
      this.permissions.set(permissionId, {
        id: permissionId,
        name: key,
        description: `${action} access to ${resource}`,
        resource,
        action: action as any,
      });
    });
  }

  // Check if user has permission
  hasPermission(
    user: User,
    permissionId: string,
    context?: RBACContext
  ): boolean {
    const userRoles = user.roles
      .map(roleId => this.roles.get(roleId))
      .filter(Boolean) as Role[];

    for (const role of userRoles) {
      if (role.permissions.includes(permissionId)) {
        const permission = this.permissions.get(permissionId);
        if (permission && permission.conditions) {
          return this.evaluateConditions(permission.conditions, context);
        }
        return true;
      }
    }

    return false;
  }

  // Check if user has any of the permissions
  hasAnyPermission(
    user: User,
    permissionIds: string[],
    context?: RBACContext
  ): boolean {
    return permissionIds.some(permissionId =>
      this.hasPermission(user, permissionId, context)
    );
  }

  // Check if user has all permissions
  hasAllPermissions(
    user: User,
    permissionIds: string[],
    context?: RBACContext
  ): boolean {
    return permissionIds.every(permissionId =>
      this.hasPermission(user, permissionId, context)
    );
  }

  // Check if user has role
  hasRole(user: User, roleId: string): boolean {
    return user.roles.includes(roleId);
  }

  // Check if user has any of the roles
  hasAnyRole(user: User, roleIds: string[]): boolean {
    return roleIds.some(roleId => user.roles.includes(roleId));
  }

  // Get user permissions
  getUserPermissions(user: User): Permission[] {
    const userRoles = user.roles
      .map(roleId => this.roles.get(roleId))
      .filter(Boolean) as Role[];
    const permissionIds = new Set<string>();

    userRoles.forEach(role => {
      role.permissions.forEach(permissionId => {
        permissionIds.add(permissionId);
      });
    });

    return Array.from(permissionIds)
      .map(permissionId => this.permissions.get(permissionId))
      .filter(Boolean) as Permission[];
  }

  // Evaluate permission conditions
  private evaluateConditions(
    conditions: PermissionCondition[],
    context?: RBACContext
  ): boolean {
    if (!context) return true;

    return conditions.every(condition => {
      const contextValue = context.data?.[condition.field];

      switch (condition.operator) {
        case 'equals':
          return contextValue === condition.value;
        case 'not_equals':
          return contextValue !== condition.value;
        case 'in':
          return (
            Array.isArray(condition.value) &&
            condition.value.includes(contextValue)
          );
        case 'not_in':
          return (
            Array.isArray(condition.value) &&
            !condition.value.includes(contextValue)
          );
        case 'greater_than':
          return contextValue > condition.value;
        case 'less_than':
          return contextValue < condition.value;
        default:
          return false;
      }
    });
  }

  // Role management
  createRole(roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Role {
    const role: Role = {
      ...roleData,
      id: `role_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.roles.set(role.id, role);
    return role;
  }

  updateRole(roleId: string, updates: Partial<Role>): Role | null {
    const role = this.roles.get(roleId);
    if (!role) return null;

    const updatedRole = {
      ...role,
      ...updates,
      updatedAt: new Date(),
    };

    this.roles.set(roleId, updatedRole);
    return updatedRole;
  }

  deleteRole(roleId: string): boolean {
    const role = this.roles.get(roleId);
    if (!role || role.isSystemRole) return false;

    return this.roles.delete(roleId);
  }

  getRoles(): Role[] {
    return Array.from(this.roles.values());
  }

  getRole(roleId: string): Role | null {
    return this.roles.get(roleId) || null;
  }

  // Permission management
  createPermission(permissionData: Permission): Permission {
    this.permissions.set(permissionData.id, permissionData);
    return permissionData;
  }

  getPermissions(): Permission[] {
    return Array.from(this.permissions.values());
  }

  getPermission(permissionId: string): Permission | null {
    return this.permissions.get(permissionId) || null;
  }
}

// Singleton instance
export const rbacService = new RBACService();

// React hooks for RBAC
export function useRBAC() {
  return {
    hasPermission: (user: User, permission: string, context?: RBACContext) =>
      rbacService.hasPermission(user, permission, context),
    hasRole: (user: User, role: string) => rbacService.hasRole(user, role),
    getUserPermissions: (user: User) => rbacService.getUserPermissions(user),
  };
}

// Higher-order component for route protection
export function withRBAC(
  Component: React.ComponentType<any>,
  requiredPermissions: string[],
  requiredRoles?: string[]
) {
  return function ProtectedComponent(props: any) {
    // This would get the current user from your auth context
    const user = getCurrentUser(); // Implement this based on your auth system

    if (!user) {
      return <div>Accès non autorisé</div>;
    }

    const hasRequiredPermissions = requiredPermissions.every(permission =>
      rbacService.hasPermission(user, permission)
    );

    const hasRequiredRoles =
      !requiredRoles ||
      requiredRoles.some(role => rbacService.hasRole(user, role));

    if (!hasRequiredPermissions || !hasRequiredRoles) {
      return <div>Permissions insuffisantes</div>;
    }

    return <Component {...props} />;
  };
}

// Mock function - replace with your actual auth implementation
function getCurrentUser(): User | null {
  // This would typically come from your authentication context/store
  return {
    id: 'admin_1',
    email: 'admin@jobprep.com',
    firstName: 'Admin',
    lastName: 'User',
    roles: [SYSTEM_ROLES.SUPER_ADMIN],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
