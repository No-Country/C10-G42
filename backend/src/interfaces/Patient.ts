import { User } from "./User";

export interface Patient extends User {
  birthdate: Date,
  phone: string,
  gender: string,
  dni: string
}