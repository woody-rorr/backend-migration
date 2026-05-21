import express from 'express';
import {
  getMyFollowsHandler,
  getListWithFollowHandler,
  getTeamsWithFollowHandler,
  putFollowsBatchHandler,
  deleteFollowHandler,
} from './handlers.js';

const router = express.Router();

router.get('/my', getMyFollowsHandler);
router.get('/list', getListWithFollowHandler);
router.get('/list/teams', getTeamsWithFollowHandler);
router.put('/', putFollowsBatchHandler);
router.delete('/:followType/:targetId', deleteFollowHandler);

export default router;
