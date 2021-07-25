import { Router } from 'express';
import { RESPONSE_MESSAGE } from 'utils/Constants';
import ServerResponses from 'utils/ServerResponses';


const v1Router = Router();

/**
   * @description simple welcome route for api v1
   * @returns {object} - object representing the api v1 welcome information
   */
v1Router.get('/api/v1', (req, res,next) => {
    return ServerResponses.successOk(res, `${RESPONSE_MESSAGE.WELCOME} version 1`);
});

export default v1Router;
