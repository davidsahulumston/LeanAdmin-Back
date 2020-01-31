const MongoLib = require('../lib/mongo');

class RoleServices {
    constructor() {
        (this.collection = 'roles'), (this.mongoDB = new MongoLib());

    }

    async getRoles() {
        const roles = await this.mongoDB.getAll(this.collection);
        return roles || [];
    }

    async createRole({role}) {
        const createRolId = await this.mongoDB.create(this.collection, role)
        return createRolId || {};
    }

    async updateRole({roleId, role} = {}) {
        const updateRoleId = await this.mongoDB.update(
            this.collection,
            roleId,
            role
        );
        return updateRoleId;
    }

    async deleteRole({roleId} = {}) {
        const deleteRoleId = await this.mongoDB.delete(
            this.collection,
            roleId
        )
        return deleteRoleId;
    }
} 

module.exports = RoleServices;