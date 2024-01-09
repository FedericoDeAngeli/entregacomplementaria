import express from 'express';
import mongoose from 'mongoose';
import {engine} from "express-handlebars"
import { webRouter } from './routers/web/webRouter.js';
import { apiRouter } from './routers/api/apiRouter.js';
import{MONGODB_CNX_STRING, SESSION_SECRET, PORT} from "./config.js";

import { sesiones } from './middlewares/sesiones.js';
import { autenticacion } from './middlewares/passport.js';

 
 await mongoose.connect(MONGODB_CNX_STRING)
 console.log("Conectado a base de datos")

const app = express();

app.use(sesiones)
app.use(autenticacion)

app.engine("handlebars", engine())
app.set("views", "./views");
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }))




app.use("/static", express.static("./static"))
app.use("/", webRouter)
app.use("/api", apiRouter)



const server = app.listen(PORT, ()=>{
    console.log("Conectado al puerto 8080")
})

