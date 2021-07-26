import { Router } from 'express';
import { RESPONSE_MESSAGE, VSERSION_URL } from 'utils/Constants';
import ServerResponses from 'utils/ServerResponses';
import clinicRouter from './clinicRouter';


const v1Router = Router();


/**
   * @description simple welcome route for api v1
   * @returns {object} - object representing the api v1 welcome information
   */
v1Router.get(VSERSION_URL.V1, (req, res,next) => {
    return ServerResponses.successOk(res, `${RESPONSE_MESSAGE.WELCOME} version 1`);
});

v1Router.use(VSERSION_URL.V1, clinicRouter);

export default v1Router;
