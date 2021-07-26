import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;
const swaggerDefinition = {
  info: {
    title: 'Clinic Api',
    version: '1.0.0',
    description: 'clinic api',
    contact: {
      name: 'Clinic Api',
      url: ''
    }
  },
  host: `localhost:${PORT}`,
  basePath: '/api/v1',
  consumes: 'application/json',
  produces: 'application/json',
  schemes: { HTTP: 'HTTP', HTTPS: 'HTTPS' },
  securityDefinitions:
    {
      Bearer:
      { type: 'apiKey', name: 'Authorization', in: 'header' }
    },
  security: { Bearer: [] }
};


const options = { swaggerDefinition, apis: ['./docs/**/*.yaml'] };
const swaggerConfig = swaggerJSDoc(options);

export default swaggerConfig;