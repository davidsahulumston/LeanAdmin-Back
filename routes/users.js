const express = require('express');
const UserService = require('../services/user');

function userApi(app) {
  const router = express.Router();
  app.use('/api/leanusers', router);

  const userService = new UserService();

  router.get('/', async function(req, res, next) {
    try {
      const users = await userService.getUsers();
      res.status(200).json({
        data: users,
        message: 'users listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:userId', async function(req, res, next) {
    const { userId } = req.params;
    try {
      const user = await userService.getUser({ userId });
      res.status(200).json({
        data: user,
        message: 'user listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/createUser', async function(req, res, next) {
    const { body: user } = req;
    try {
      const createUser = await userService.createUser({ user });
      console.log('creando usuario..');
      res.status(200).json({
        data: createUser,
        message: 'user created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:userId', async function(req, res, next) {
    const { userId } = req.params;
    const { body: user } = req;

    try {
      const updateUserId = await userService.updateUser({
        userId,
        user
      });
      res.status(200).json({
        data: updateUserId,
        message: 'user updated'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:userId/append/:attr', async function(req, res, next) {
    const { update } = req.body;
    const { attr, userId } = req.params;

    console.log(update);
    try {
      let $push = {};
      $push[attr] = update;

      let query = {
        $push
      };

      console.log('query push', query);
      const insertUserId = await userService.insertUser({
        query,
        userId
      });
      res.status(200).json({
        data: insertUserId,
        message: 'document inserted'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:userId/editUrl/:attr', async function(req, res, next) {
    const { objectUrl } = req.body;
    const { attr, userId } = req.params;
    //console.log('agregar', Object.getOwnPropertyNames(objectUrl)[0]);
    let compare = Object.getOwnPropertyNames(objectUrl)[0];
    try {
      
      let user = await userService.getUser({ userId });

      // console.log(user)

      user.personalData.documents.map(element => {
        Object.getOwnPropertyNames(element).map(val => {
          if(val.includes(compare)) {
            console.log('elementos',element)
            
            let key = Object.keys(element)[0]
            let val = Object.values(element)[0]
           // console.log(key)

            let $set = {};
          //  let keys = `documents.${key}`;
            let select = {};

            select[`documents.${key}`] = `${val}` ;
            

            console.log('select',select)
            //console.log('value',value)
            //let atributo = `${attr}.${key}`

            $set[`${attr}.$.${key}`] = objectUrl;
            // $setOnInsert[objectUrl] = objectUrl;
            let query = [{ $set }];
            //console.log('objectUrl', objectUrl);
            console.log(query)

            const editUrlId = userService.editUrl({
              select,
              query,
              userId
            });
            res.status(200).json({
              data: editUrlId,
              message: 'url edited'
            });
          }
        })
      })
    }catch(err) {
      next(err)
    }
    
  });

  router.delete('/:userId', async function(req, res, next) {
    const { userId } = req.params;
    try {
      const deleteUserId = await userService.deleteUser({
        userId
      });
      res.status(200).json({
        data: deleteUserId,
        message: 'user deleted'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = userApi;
