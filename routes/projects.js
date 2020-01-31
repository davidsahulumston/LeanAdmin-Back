const express = require('express');
const ProjectService = require('../services/project');

function projectApi(app) {
  const router = express.Router();
  app.use('/api/projects', router);

  const projectService = new ProjectService();

  router.get('/', async function(req, res, next) {
    try {
      const projects = await projectService.getProjects();
      res.status(200).json({
        data: projects,
        message: 'projects listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:projectId', async function(req, res, next) {
    const { projectId } = req.params;

    try {
      const project = await projectService.getProject({ projectId });
      res.status(200).json({
        data: project,
        message: 'project listed'
      });
    } catch (error) {
      next(erro);
    }
  });

  router.post('/createProject', async function(req, res, next) {
    const { body: project } = req;
    try {
      const createProject = await projectService.createProject({ project });
      res.status(200).json({
        data: createProject,
        message: 'project created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:projectId', async function(req, res, next) {
    const { projectId } = req.params;
    const { body: project } = req;

    try {
      const updateProjectId = await projectService.updateProject({
        projectId,
        project
      });
      res.status(200).json({
        data: updateProjectId,
        message: 'project updated'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:projectId', async function(req, res, next) {
      const { projectId } = req.params;
      try {
          const deleteProjectId = await projectService.deleteProject({
              projectId
          });
          res.status(200).json({
              data: deleteProjectId,
              message: 'project delete'
          })
      } catch (error) {
          next(error)
      }
  })
}

module.exports = projectApi;