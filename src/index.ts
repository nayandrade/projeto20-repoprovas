import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";

import router from "./routes";
import errorhandler from "./middlewares/errorHandler";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);

app.use(errorhandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
