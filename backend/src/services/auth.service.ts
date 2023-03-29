import { Request } from "express"
import { matchedData } from "express-validator";
import PatientModel from "../models/Patient";
import { tokenSign } from "../utils/handleJwt";
import { encrypt, verifyHash } from "../utils/handlePassword";

const register = async (req: Request) => {
  try {
    const data = matchedData(req);

    const hashPassword = await encrypt(data.password);
    const dataUser = { ...data, password: hashPassword };

    const user = await PatientModel.create(dataUser);

    const response = {
      message: "User created successfully",
      token: await tokenSign(user.id, user.firstname),
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
      }
    }

    return response;

  } catch (error) {
    throw new Error("Error! Could'nt create account");
  }
}

const login = async (req: Request) => {
  try {
    const data = matchedData(req) // curar la data
    const user = await PatientModel.findOne({email: data.email}).select("password email"); // <- traemos solo la password del user (oculta como undefined)
    if(!user) {
      throw new Error("Error! Email or password incorrect!")
    }
    
    const plainPass = data.password;
    const hashPass = user.get("password"); // <- obtenemos la password encriptada
    const check = await verifyHash(plainPass, hashPass);
    if(!check){
      throw new Error("Error! Email or password incorrect!")
    }
    
    user.set("password", undefined, { strict: false }) // <- volvemos a "ocultar" la password
    
    const response = {
      message: "Successfully logged",
      token: tokenSign(user.id, user.firstname),
    }

    return response;
  } catch (error) {
    throw new Error("Error! Could not log in");
  }
}

export {
  register,
  login
}