import { Router } from 'express'

export const sessionRouter = Router()

sessionRouter.get('/login',  (req, res) =>{
    try {
     res.status("ok")
    } catch (error) {
     res.json(error.message)
    }
     
   })