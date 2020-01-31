const MongoLib = require('../lib/mongo');

class ProjectService {
  constructor() {
    (this.collection = 'projects'), (this.mongoDB = new MongoLib());
  }

  async getProjects() {
    const projects = await this.mongoDB.getAll(this.collection);
    return projects || [];
  }

  async createProject({ project }) {
    const createProjectId = await this.mongoDB.create(this.collection, project);
    return createProjectId || {};
  }

  async getProject({ projectId }) {
    const project = await this.mongoDB.get(this.collection, projectId);
    return project || {};
  }

  async updateProject({ projectId, project } = {}) {
    const updateProjectId = await this.mongoDB.update(
      this.collection,
      projectId,
      project
    );
    return updateProjectId;
  }

  async deleteProject({ projectId } = {}) {
    const deleteProjectId = await this.mongoDB.delete(
      this.collection,
      projectId
    );
    return deleteProjectId;
  }
}

module.exports = ProjectService;
