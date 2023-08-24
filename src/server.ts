import express from "express";
import { userRouter } from "./routes/user.routes";

const PORT = 3333;

const app = express();

app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
