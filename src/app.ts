import express, { json } from "express";
import cors from "cors";

import "express-async-errors";

import router from "./routes/router";
import errorhandler from "./middlewares/errorHandler";

const app = express();
app.use(json());
app.use(cors());
app.use(router);

app.use(errorhandler);

export default app;
