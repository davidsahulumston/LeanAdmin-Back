const express = require('express');
const CompanyService = require('../services/company');

function companyApi(app) {
  const router = express.Router();
  app.use('/api/companies', router);

  const companyService = new CompanyService();

  router.get('/', async function(req, res, next) {
    try {
      const companies = await companyService.getCompanies();
      res.status(200).json({
        data: companies,
        message: 'companies listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:companyId', async function(req, res, next) {
    const { companyId } = req.params;
    try {
      const company = await companyService.getCompany({ companyId });
      res.status(200).json({
        data: company,
        message: 'company listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/createCompany', async function(req, res, next) {
    const { body: company } = req;
    try {
      const createCompany = await companyService.createCompany({ company });
      res.status(200).json({
        data: createCompany,
        message: 'company created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:companyId', async function(req, res, next) {
    const { companyId } = req.params;
    const { body: company } = req;

    try {
      const updateCompanyId = await companyService.updateCompany({
        companyId,
        company
      });
      res.status(200).json({
        data: updateCompanyId,
        message: 'company update'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:companyId/append/:attr', async function(req, res, next) {
    const { update } = req.body;
    const { attr, companyId } = req.params;

    try {
      let $push = {};
      $push[attr] = update;

      let query = {
        $push
      };

      const insertCompanyId = await companyService.insertCompany({
        query,
        companyId
      });
      res.status(200).json({
        data: insertCompanyId,
        message: 'element inserted'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:companyId', async function(req, res, next) {
    const { companyId } = req.params;
    try {
      const deleteCompanyId = await companyService.deleteCompany({
        companyId
      });
      res.status(200).json({
        data: deleteCompanyId,
        message: 'company deleted'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = companyApi;
