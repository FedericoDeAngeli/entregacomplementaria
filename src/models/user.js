import { Schema, model } from "mongoose";
import {randomUUID} from "crypto"
import {dbCart} from "./carts.js"
import { hashear, comparePass } from "../utils/criptografia.js";

export const UserSchema = new Schema({
    _id: { type: String, default: randomUUID()},
    first_name: { type: String},
    last_name: { type: String},
    email:{type: String, unique: true, required: true},
    age: {type: Number},
    password: {type:String, required: true},
    cart: [ {type: String, ref: "carrito"}],
    role: {type:String, default: "user"}
},{
    strict: "throw",
    statics:{
        registrar: async function (reqBody) {
          
            reqBody.password = hashear(reqBody.password)
            const creado = await model("Users").create(reqBody)
      
            const datosUsuario = {
              email: creado.email,
              first_name: creado.first_name,
              last_name: creado.last_name,
              role: creado.role,
              cart: creado.cart
            }
      
            return datosUsuario
          },

          autenticar: async function (username, password) {

            let datosUsuario
      
            if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
              datosUsuario = {
                email: 'admin',
                first_name: 'admin',
                last_name: 'admin',
                role: 'admin'
              }
            } else {
              const usuario = await model("Users").findOne({ email: username }).lean()
      
              if (!usuario) {
                throw new Error('usuario no encontrado')
              }
      
              if (!comparePass(password, usuario['password'])) {
                throw new Error('las contraseñas no coinciden')
              }
      
              datosUsuario = {
                email: usuario['email'],
                first_name: usuario['first_name'],
                last_name: usuario['last_name'],
                cart: usuario['cart'],
                role: usuario['role'],
              }
            }
      
            if (!datosUsuario) {
              throw new Error('usuario no encontrado')
            }
      
            return datosUsuario
          },
         
        }
      
    })
    
export const UserManager = model("Users", UserSchema)