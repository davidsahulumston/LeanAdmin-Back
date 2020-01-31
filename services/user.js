const MongoLib = require('../lib/mongo');

class UserService {
  constructor() {
    (this.collection = 'users'), (this.mongoDB = new MongoLib());
  }

  async getUsers() {
    const users = await this.mongoDB.getAll(this.collection);
    return users || [];
  }

  async createUser({ user }) {
    const createUserId = await this.mongoDB.create(this.collection, user);
    return createUserId || {};
  }

  async getUser({ userId }) {
    const user = await this.mongoDB.get(this.collection, userId);
    return user || {};
  }

  async updateUser({ userId, user } = {}) {
    const updateUserId = await this.mongoDB.update(
      this.collection,
      userId,
      user
    );
    return updateUserId;
  }
  
  async insertUser({userId, query} = {}) {
    const insertUserId = await this.mongoDB.append(
      this.collection,
      userId,
      query
    );
    return insertUserId || {};
  } 

  async editUrl({userId, query} = {}) {
    const editUrlId = await this.mongoDB.aggregate(
      this.collection,
      userId,
      query
    );
    return editUrlId || {};
  } 
  
  async deleteUser({ userId } = {}) {
    const deleteUserId = await this.mongoDB.delete(
      this.collection,
      userId
    );
    return deleteUserId;
  }
}

module.exports = UserService;
