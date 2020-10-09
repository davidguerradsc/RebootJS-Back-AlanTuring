import { IUser, User } from "../models/usersModel";
import { DatabaseError } from "./errors/databaseError";
import { UserNotFoundError } from "./errors/userNotFound";
import { DatabaseError } from "./errors/databaseError";

function createUser(firstname: string, lastname: string, email: string) : IUser{
  const user = new User({firstname, lastname, email});
  // existingUsers.push(user);
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

function updateUser(id: string, firstname?: string, lastname?: string, email?: string){
  // const filteredUser = getUser(id);
  // if(!filteredUser){
  //   throw new UserNotFoundError(id, "The user has not been found");
  // }

  // const updatedUser = {
  //   ...filteredUser,
  //   firstname: firstname || filteredUser.firstname,
  //   lastname: lastname || filteredUser.lastname,
  //   email: email || filteredUser.email
  // }

  // TODO
  // ...
}

function deleteUser() { }


export {
    createUser,
    getUser,
    updateUser
}