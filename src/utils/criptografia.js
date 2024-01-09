import {hashSync, genSaltSync, compareSync} from "bcrypt"

export function hashear(pass){
    return hashSync(pass, genSaltSync(10));
}

export function comparePass(recibida, almacenada){
    return compareSync(recibida, almacenada)
}