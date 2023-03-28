import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mainRouter from "./routes/index";
import { PORT } from "./config/config";
import db from "./config/database";

const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/", mainRouter);

db.connect();

app.listen(PORT, () => {
  console.log(`La API de gestión de turnos está escuchando en el puerto ${PORT}`);
});