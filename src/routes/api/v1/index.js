import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';

import EnvData from 'config/EnvData';
import { RESPONSE_MESSAGE, VSERSION_URL } from 'utils/Constants';
import ServerResponses from 'utils/ServerResponses';
import clinicRouter from './clinicRouter';
import swaggerConfig from '../../../../docs/config/swaggerConfig';


const v1Router = Router();


/**
   * @description simple welcome route for api v1
   * @returns {object} - object representing the api v1 welcome information
   */
v1Router.get(VSERSION_URL.V1, (req, res,next) => {
    return ServerResponses.successOk(res, `${RESPONSE_MESSAGE.WELCOME} version 1`);
});

v1Router.use('/docs',
  swaggerUi.serve, swaggerUi.setup(swaggerConfig));
v1Router.use(VSERSION_URL.V1, clinicRouter);

export default v1Router;
