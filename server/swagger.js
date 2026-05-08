import swaggerJsdoc from "swagger-jsdoc";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {

  definition: {

    openapi: '3.0.0',

    info: {

      title: 'Documentación de API Sweet Medical',

      version: '1.0.0',

      description: 'Desarrollo de Software',

    },

    servers: [

      {

        url: `http://localhost:${process.env.PORT || 3000}`,

      },

    ],

  },

  apis: [path.join(__dirname, "./routes/*.js")],

};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
