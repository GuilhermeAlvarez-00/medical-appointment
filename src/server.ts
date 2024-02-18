import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerDocument from "../swagger.json";
import { routes } from "./routes";

const PORT = 3333;

const app = express();

// CONFIGS
app.use(express.json());

// SWAGGER
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// ROUTES
app.use(routes);

// SERVER
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
