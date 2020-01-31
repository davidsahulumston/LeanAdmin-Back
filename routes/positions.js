const express = require('express');
const PositionService = require('../services/position');

function positionApi(app) {
  const router = express.Router();
  app.use('/api/positions', router);

  const positionService = new PositionService();

  router.get('/', async function(req, res, next) {
    try {
      const positions = await positionService.getPositions();
      res.status(200).json({
        data: positions,
        message: 'positions listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:positionId', async function(req, res, next) {
    const { positionId } = req.params;
    try {
      const position = await positionService.getPosition({ positionId });
      res.status(200).json({
        data: position,
        message: 'position listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/createPosition', async function(req, res, next) {
    const { body: position } = req;
    try {
      const createPosition = await positionService.createPosition({ position });
      res.status(200).json({
        data: createPosition,
        message: 'position created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:positionId', async function(req, res, next) {
    const { positionId } = req.params;
    const { body: position } = req;

    try {
      const updatePositionId = await positionService.updatePosition({
        positionId,
        position
      });
      res.status(200).json({
        data: updatePositionId,
        message: 'position updated'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:positionId', async function(req, res, next) {
    const { positionId } = req.params;
    try {
      const deletePositionId = await positionService.deletePosition({
        positionId
      });
      res.status(200).json({
        data: deletePositionId,
        message: 'position deleted'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = positionApi;
