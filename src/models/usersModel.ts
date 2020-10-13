import { SHA256 } from 'crypto-js';
// class User {
//   id: number;
//   firstname: string;
//   lastname: string;
//   email: string;
//   static last_id = 0;

//   constructor(firstname: string, lastname: string, email: string){
//     User.last_id += 1;
//     this.id = User.last_id;
//     this.firstname = firstname;
//     this.lastname = lastname;
//     this.email = email;
//   }

//   status(){
//     return `Je m'appelle ${this.firstname} ${this.lastname} et suis joignable sur ${this.email}`;
//   }

//   changeLastname(newName: string){
//     this.lastname = newName
//   }

//   changeFirstname(newFirstname: string){
//     this.firstname = newFirstname;
//   }
// }

// const existingUsers = [
//   new User('Thomas', 'Falcone', 'thomas.falcone@mail.com'),
//   new User('Philippa', 'Dupont', 'mail@mail.mail')
// ]

// export { User, existingUsers }

import {
  Document, Schema, model, Model,
} from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  status: () => string;
  verifyPassword: (password: string) => boolean;
  setPassword: (password: string) => void;
  getSafeUser: () => ISafeUser;
}

type ISafeUser = Pick<IUser, "firstname" | "lastname" | "email" | "_id">

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.getSafeUser = function() {
  const { _id, firstname, lastname, email } = this;
  return { _id, firstname, lastname, email };
}

userSchema.methods.status = function() {
  return `User : ${this.firstname} ${this.lastname}`;
};

userSchema.methods.setPassword = function (password: string) {
  this.password = SHA256(password).toString();
}

userSchema.methods.verifyPassword = function (password: string) {
  return this.password === SHA256(password).toString();
}

export const User = model<IUser, Model<IUser>>('User', userSchema);
