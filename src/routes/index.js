import { Router } from 'express';
import { RESPONSE_MESSAGE } from 'utils/Constants';
import ServerResponses from 'utils/ServerResponses';

// import all version routes here(only v1 for now)
import v1Router from './api/v1';

const router = Router();

/**
   * @description simple welcome route
   * @returns {object} - object representing the welcome information
   */
v1Router.get('/', (req, res,next) => {
    return ServerResponses.successOk(res, RESPONSE_MESSAGE.WELCOME);
});

// use all version route here
router.use(v1Router);

export default router;

