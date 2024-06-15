import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import getConfigValue from './config/config';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crm Baza Trainee API',
      version: '0.0.1',
    },
    components: {
      securitySchemes: {
        jwtheader: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    servers: [
      {
        url: getConfigValue('BASE_URL'),
        description: 'Local server',
      },
    ],
  },
  apis: [`${__dirname}/**/*.[jt]s`],
};
const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app: Express): void {
  app.get('/api/v1/swagger/api.json', (req, res) => {
    console.log('tets');
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default setupSwagger;
