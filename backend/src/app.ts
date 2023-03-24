import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import mainRouter from "./routes/index";

const PORT = 3000; // TODO: Cambiar por variable de entorno

const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/", mainRouter);


app.listen(PORT, () => {
  console.log('La API de gestión de turnos está escuchando en el puerto 3000');
});