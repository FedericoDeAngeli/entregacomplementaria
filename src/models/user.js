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
    cartId: {type: String, ref: "cart"},
    role: {type:String, default: "user"}
},{
    strict: "throw",
    statics:{
        registrar: async function (reqBody) {
          
            reqBody.password = hashear(reqBody.password)
            reqBody.cartId = await UserManager.findById(_id).populate("cartId").lean()
            const creado = await model("Users").create(reqBody)
      
            const datosUsuario = {
              email: creado.email,
              first_name: creado.first_name,
              last_name: creado.last_name,
              role: creado.role,
              cartId: creado.cartId
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
              const usuario = await model("usuarios").findOne({ email: username }).lean()
      
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
                cartId: usuario['cartId'],
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