const MongoLib = require('../lib/mongo');

class ClientService {
  constructor() {
    (this.collection = 'clients'), (this.mongoDB = new MongoLib());
  }

  async getClients() {
    const clients = await this.mongoDB.getAll(this.collection);
    return clients || [];
  }

  async getClient({ clientId }) {
    const client = await this.mongoDB.get(this.collection, clientId);
    return client || {};
  }

  async createClient({ client }) {
    const clientId = await this.mongoDB.create(this.collection, client);
    return clientId || {};
  }


  async updateClient({ clientId, client } = {}) {
    const updateClientId = await this.mongoDB.update(
      this.collection,
      clientId,
      client
    );
    return updateClientId || {};
  }

  async insertClient({ clientId, query } = {}) {
    const insertClientId = await this.mongoDB.append(
      this.collection,
      clientId,
      query
    );
    return insertClientId || {};
  }

  async deleteClient({ clientId } = {}) {
    const deleteClient = await this.mongoDB.delete(this.collection, clientId);
    return deleteClient;
  }
}

module.exports = ClientService;
