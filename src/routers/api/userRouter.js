import { Router } from 'express'
import passport from 'passport'

export const userRouter = Router()

userRouter.post('/',
  
    passport.authenticate("register", {
      failWithError: true,
     }),
    
      (req, res) => {
        res.status(201).json({ status: 'success', payload: req.user })
      },
      (error, req, res, next) => {
        res
          .status(401)
          .json({
            status: 'error',
            message: 'login failed'
          })
        })