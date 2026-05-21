import express from 'express';
import {
  getMyFollowsHandler,
  getListWithFollowHandler,
  getTeamsWithFollowHandler,
  putFollowsBatchHandler,
  deleteFollowHandler,
} from './handlers.js';

const router = express.Router();

router.get('/my', async (req, res, next) => {
  try {
    await getMyFollowsHandler(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/list', async (req, res, next) => {
  try {
    await getListWithFollowHandler(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/list/teams', async (req, res, next) => {
  try {
    await getTeamsWithFollowHandler(req, res);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    await putFollowsBatchHandler(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/:followType/:targetId', async (req, res, next) => {
  try {
    await deleteFollowHandler(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
