const MongoLib = require('../lib/mongo');

class CompanyService {
  constructor() {
    (this.collection = 'company'), (this.mongoDB = new MongoLib());
  }

  async getCompanies() {
    const companies = await this.mongoDB.getAll(this.collection);
    return companies || [];
  }

  async createCompany({ company }) {
    const createCompanyId = await this.mongoDB.create(this.collection, company);
    return createCompanyId || {};
  }

  async getCompany({ companyId }) {
    const company = await this.mongoDB.get(this.collection, companyId);
    return company || {};
  }

  async updateCompany({ companyId, company } = {}) {
    const updateCompanyId = await this.mongoDB.update(
      this.collection,
      companyId,
      company
    );
    return updateCompanyId || {};
  }

  async insertCompany({ companyId, query } = {}) {
    const insertCompanyId = await this.mongoDB.append(
      this.collection,
      companyId,
      query
    );
    return insertCompanyId || {};
  }

  async deleteCompany({ companyId } = {}) {
    const deleteCompanyId = await this.mongoDB.delete(
      this.collection,
      companyId
    );
    return deleteCompanyId;
  }
}

module.exports = CompanyService;
