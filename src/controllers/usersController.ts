import { existingUsers, User } from "../models/usersModel";

function createUser(firstname: string, lastname: string, email: string) : User {
  const newUser = new User(firstname, lastname, email);
  existingUsers.push(newUser);
  return newUser;
}

function getUser(id: number): User | undefined {
    return existingUsers.find(user => user.id === id);
}

function deleteUser(){}

function updateUser(){}

export {
  createUser,
  getUser
}