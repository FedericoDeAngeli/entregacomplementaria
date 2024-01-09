import Router from "express";
import { dbCart } from "../../models/carts.js";
import { randomUUID } from "crypto"

export const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
    const carritos = await dbCart.find().lean()
    res.json({ carritos })
})

cartRouter.post("/", async (req, res) => {
    const datosCart = req.body
   datosCart._id = randomUUID()

    try {
        const cartAgregado = await dbCart.create(datosCart)
        res.json(cartAgregado.toObject())
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})