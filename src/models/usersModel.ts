/* class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  static last_id = 0;

  constructor(firstname: string, lastname: string, email: string){
    User.last_id += 1;
    this.id = User.last_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }

  changeLastname(newName: string){
    this.lastname = newName
  }

  changeFirstname(newFirstname: string){
    this.firstname = newFirstname;
  }
}

const existingUsers = [
    new User('David', 'Guerra', 'david.guerra@mail.com'),
    new User('Sandrine', 'Guerra', 'sandrine@mail.mail')
]

export { User, existingUsers } */

import { Document, Schema, model, Model } from "mongoose";

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    email: string;
    status(): () => string;
}


const userSchema = new Schema ({
    firstname: { type: String, required:true},
    lastname: { type: String, required:true},
    email: { type: String, required:true, unique: true}
})

userSchema.methods.status = function(){
    return `User : ${this.firstname} ${this.lastname}`;
}

export const User = model<IUser, Model<IUser>>("User", userSchema);