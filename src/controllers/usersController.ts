import { existingUsers, User } from "../models/usersModel";
import { UserNotFoundError } from "./errors/userNotFound";

function createUser(firstName: string, lastName: string, email: string) : User{
  const user = new User(firstName, lastName, email);
  existingUsers.push(user);
  return user;
}

function getUser(id: number): User | undefined {
  return existingUsers.find(user => user.id === id);
}

function updateUser(id: number, firstname?: string, lastname?: string, email?: string){
  const filteredUser = getUser(id);
  if(!filteredUser){
    throw new UserNotFoundError(id, "The user has not been found");
  }

  const updatedUser = {
    ...filteredUser,
    firstname: firstname || filteredUser.firstname,
    lastname: lastname || filteredUser.lastname,
    email: email || filteredUser.email
  }

  // TODO
  // ...
}

function deleteUser(){}
    

export {
  createUser,
  getUser,
  updateUser
}