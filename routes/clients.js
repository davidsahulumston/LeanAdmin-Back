const express = require('express');
const ClientService = require('../services/client');

function clientApi(app) {
  const router = express.Router();
  app.use('/api/clients', router);

  const clientService = new ClientService();

  router.get('/', async function(req, res, next) {
    try {
      const clients = await clientService.getClients();
      res.status(200).json({
        data: clients,
        message: 'clients listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:clientId', async function(req, res, next) {
    const { clientId } = req.params;
    try {
      const client = await clientService.getClient({ clientId });
      res.status(200).json({
        data: client,
        message: 'client listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/createClient', async function(req, res, next) {
    const { body: client } = req;
    try {
      const createClient = await clientService.createClient({ client });
      res.status(200).json({
        data: createClient,
        message: 'client created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:clientId', async function(req, res, next) {
    const { clientId } = req.params;
    const { body: client } = req;

    try {
      const updateClientId = await clientService.updateClient({
        clientId,
        client
      });
      res.status(200).json({
        data: updateClientId,
        message: 'client update'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:clientId/append/:attr', async function(req, res, next) {
    const { update } = req.body;
    const { attr, clientId } = req.params;

    try {
      let $push = {};
      $push[attr] = update;

      let query = {
        $push
      };

      const insertClientId = await clientService.insertClient({
        query,
        clientId
      });
      res.status(200).json({
        data: insertClientId,
        message: 'element inserted'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:clientId', async function(req, res, next) {
    const { clientId } = req.params;
    try {
      const deleteClientId = await clientService.deleteClient({
        clientId
      });
      res.status(200).json({
        data: deleteClientId,
        message: 'client deleted'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = clientApi;
