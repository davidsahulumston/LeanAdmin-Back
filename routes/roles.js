const express = require('express');
const RoleService = require('../services/role');

function roleApi(app) {
  const router = express.Router();
  app.use('/api/leanroles', router);

  const roleService = new RoleService();

  router.get('/', async function(req, res, next) {
    try {
      const roles = await roleService.getRoles();
      res.status(200).json({
        data: roles,
        message: 'roles listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/createRole', async function(req, res, next) {
    const { body: role } = req;
    try {
      const createRole = await roleService.createRole({ role });
      //console.log('Creando rol')
      res.status(200).json({
        data: createRole,
        message: 'role created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:roleId', async function(req, res, next) {
      const {roleId} = req.params;
      const {body: role} = req;

      try {
        const updateRoleId = await roleService.updateRole({
          roleId,
          role
        });
        res.status(200).json({
            data: updateRoleId,
            message: 'role updated'
        })  
      } catch (error) {
          next(error);
      }
  })


  router.delete('/:roleId', async function(req, res, next) {
      const {roleId} = req.params;

      try {
          const deleteRoleId = await roleService.deleteRole({roleId});
          res.status(200).json({
              data: deleteRoleId,
              message: 'role deleted'
          })
      } catch (error) {
          next(error);
      }
  })

}

module.exports = roleApi;
