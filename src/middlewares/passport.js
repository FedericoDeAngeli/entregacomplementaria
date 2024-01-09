import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserManager } from "../models/user.js";

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  },
  async (req, _u, _p, done) => {
    try {
      const datosUsuario = await UserManager.registrar(req.body)
      done(null, datosUsuario)
    } catch (error) {
      done(null, false, error.message)
    }
  }))

  passport.use('login', new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      const datosUsuario = await UserManager.autenticar(email, password)
      done(null, datosUsuario)
    } catch (error) {
      return done(null, false, error.message)
    }
  }))

  

passport.serializeUser((user, next)=>{next(null, user)});
passport.deserializeUser((user, next)=>{next(null, user)});

const passportInitialize = passport.initialize()
const passportSession = passport.session();

export function autenticacion(req, res, next) {
    passportInitialize(req, res, ()=> {
        passportSession(req, res, next);
    })
}