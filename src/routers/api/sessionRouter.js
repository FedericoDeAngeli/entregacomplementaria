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

sessionRouter.get("/current", (req, res) => {
           if (req.isAuthenticated()) {
          return res.send("Bienvenido " + req.user.first_name)
        }
        res.status(400).json({ status: 'error', message: 'no hay una sesion iniciada' })
      })

sessionRouter.delete('/current', (req, res) => {
        req.logout(err => {
          if (err) {
            return res.status(500).json({ status: 'logout error', body: err })
          }
          res.json({ status: 'success', message: 'logout OK' })
        })
      })
