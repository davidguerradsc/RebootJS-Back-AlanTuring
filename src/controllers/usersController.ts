import { IUser, User } from "../models/usersModel";
import { DatabaseError } from "./errors/databaseError";
import { UserNotFoundError } from "./errors/userNotFound";

function createUser(firstname: string, lastname: string, email: string) : IUser{
  const user = new User({firstname, lastname, email});
  user.save();
  return user;
}

function getUser(id: string, callback: (user: IUser | null) => void) : void{
  // return existingUsers.find(user => user.id === id);
  User.findById(
    id,
    (err, res) => {
      if(err) { throw new DatabaseError(err) }

      callback(res);
    }
  );
}

function updateUser(id: string, firstname?: string, lastname?: string, email?: string, callback?: (user: IUser) => void){
  User.findById(id, (err, user) => {
    if(err) { throw new DatabaseError(err) }
    if(!user) { throw new UserNotFoundError(id, 'User Not Found')}

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;

    user.save();

    if(callback) callback(user);
  });
}

export {
  createUser,
  getUser,
  updateUser
}