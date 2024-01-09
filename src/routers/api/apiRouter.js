import { Router } from "express";
import { sessionRouter } from "./sessionRouter.js";
import { userRouter } from "./userRouter.js";
import { cartRouter } from "./cartRouter.js";

 
export const apiRouter = Router()

apiRouter.use("/cart", cartRouter)
apiRouter.use("/sesiones",sessionRouter)
apiRouter.use("/usuarios", userRouter)