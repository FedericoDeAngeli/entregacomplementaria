import { Router } from "express"
import passport from "passport"

export const sessionRouter = Router()

sessionRouter.post('/',
    passport.authenticate('login', {
        failWithError: true
    }),
    function (req, res) {
        res.status(201).json({ status: 'success', payload: req.user })
    },
    function (error, req, res, next) {
        res
            .status(401)
            .json({
                status: 'error',
                message: 'login failed'
            })
    })