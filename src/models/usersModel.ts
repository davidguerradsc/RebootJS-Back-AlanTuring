import { SHA256 } from 'crypto-js';
import {
  Document, Schema, model, Model,
} from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  conversationsSeen: { [convId: string]: Date };
  socket?: string;
  status: IUserStatus;
  verifyPassword: (password: string) => boolean;
  setPassword: (password: string) => void;
  getSafeUser: () => ISafeUser;
}

type IUserStatus = 'online' | 'offline';

type ISafeUser = Pick<IUser, 'firstname' | 'lastname' | 'email' | '_id' | 'conversationsSeen' | 'status'>

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  status: { type: String, required: true, default: 'offline' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socket: { type: String },
  conversationsSeen: {}
});

userSchema.methods.getSafeUser = function () {
  const {
    _id, firstname, lastname, email, conversationsSeen, status
  } = this;
  return {
    _id, firstname, lastname, email, conversationsSeen, status
  };
};

userSchema.methods.setPassword = function (password: string) {
  this.password = SHA256(password).toString();
};

userSchema.methods.verifyPassword = function (password: string) {
  return this.password === SHA256(password).toString();
};

export const User = model<IUser, Model<IUser>>('User', userSchema);
