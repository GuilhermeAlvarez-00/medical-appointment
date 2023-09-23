import express from "express";
import { userRouter } from "./routes/user.routes";
import swaggerUI from "swagger-ui-express";

import swaggerDocument from "../swagger.json";
import { specialityRouter } from "./routes/speciality.routes";

const PORT = 3333;

const app = express();

// CONFIGS
app.use(express.json());

// DOCS
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// ROUTES
app.use(userRouter);
app.use(specialityRouter);

// SERVER
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
