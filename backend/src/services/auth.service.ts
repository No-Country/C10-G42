import { Auth } from "../interfaces/Auth";
import { Patient } from "../interfaces/Patient";
import PatientModel from "../models/Patient";
import { tokenSign } from "../utils/handleJwt";
import { encrypt, verifyHash } from "../utils/handlePassword";

const login = async ({ email, password }: Auth) => {

  const user = await PatientModel.findOne({ email }).select("password email"); // <- traemos solo la password del user (oculta como undefined)
  if (!user) throw new Error("Error! No se ha encontrado el usuario");

  const hashPass = user.get("password"); // <- obtenemos la password encriptada
  const check = await verifyHash(password, hashPass);

  if (!check) throw new Error("Error! Email o password incorrecta");

  user.set("password", undefined, { strict: false }) // <- volvemos a "ocultar" la password

  const response = {
    message: "Logueado",
    token: tokenSign(user.id, user.firstname),
    user
  }

  return response;
}

const register = async (data: Patient) => {
  const checkIs = await PatientModel.findOne({ email: data.email });
  if (checkIs) throw new Error("Error! El email ya se encuentra registrado");

  const hashPassword = await encrypt(data.password);
  const dataUser = { ...data, password: hashPassword };

  const user = await PatientModel.create(dataUser);

  const response = {
    message: "Registrado correctamente",
    token: await tokenSign(user.id, user.firstname),
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
    }
  }

  return response;
}

export {
  register,
  login
}