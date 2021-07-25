import rateLimit from 'express-rate-limit';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';

import APIException from 'utils/APIException';
import { ERROR_NAMES } from 'utils/Constants'
import GeneralHelper from 'helpers/GeneralHelper';
import EnvData from 'config/EnvData';
import appRouter from 'routes';
import ErrorDisplay from 'utils/ErrorDisplay';


const app = express();

const { PORT, MAX_REQUEST_SIZE } = EnvData;

// define only methods allowed in requests
const corsOptions = {
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
};

// log information
app.use(GeneralHelper.httpLogger());

// allows cors request with cors settings
app.use(cors(corsOptions));

// limit the size of the request
app.use(express.json({
    limit: MAX_REQUEST_SIZE,
}));

// connect to the routes
app.use(appRouter);

// set helmet security
app.use(helmet());

// Limit request from the same API to 200 per hour
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour',
    max: 200
});
app.use(limiter);

// prevent query parameter pollution
app.use(hpp());


// / catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIException('Route not found',
    ERROR_NAMES.NotFoundError)
    next(err, req, res, next);
});

// handle all app errors 
app.use((err, req, res, next) => {
    return ErrorDisplay(res, err);
});

// start and listen on the port
app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));

export default app;