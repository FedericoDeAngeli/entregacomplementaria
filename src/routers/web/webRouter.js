import { Router } from "express";
import {dbCart} from "../../models/carts.js";
import { sessionRouter } from "./webSessionRouter.js";
import { userRouter } from "./webUserRouter.js";


export const webRouter = Router();






webRouter.get("/cart/:cid", async (req, res) => {
  const cid = req.params.cid;
  const carrito = await dbCart.findById(cid).populate("product.pid", "title").lean();
   res.render("carts", {carrito})
})

 webRouter.use(sessionRouter)
 webRouter.use(userRouter)