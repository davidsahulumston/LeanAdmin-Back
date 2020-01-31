const MongoLib = require('../lib/mongo');

class PositionService {
  constructor() {
    (this.collection = 'positions'), (this.mongoDB = new MongoLib());
  }

  async getPositions() {
    const positions = await this.mongoDB.getAll(this.collection);
    return positions || [];
  }

  async createPosition({ position }) {
    const createPositionId = await this.mongoDB.create(
      this.collection,
      position
    );
    return createPositionId || {};
  }

  async getPosition({ positionId }) {
    const position = await this.mongoDB.get(this.collection, positionId);
    return position || {};
  }

  async updatePosition({ positionId, position } = {}) {
    const updatePositionId = await this.mongoDB.update(
      this.collection,
      positionId,
      position
    );
    return updatePositionId;
  }

  async deletePosition({ positionId } = {}) {
    const deletePositionId = await this.mongoDB.delete(
      this.collection,
      positionId
    );
    return deletePositionId;
  }
}

module.exports = PositionService;
