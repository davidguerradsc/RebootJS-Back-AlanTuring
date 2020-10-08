import { existingUsers, User } from "../models/usersModel";

function createUser(firstName: string, lastName: string, email: string) : User{
  const user = new User(firstName, lastName, email);
  existingUsers.push(user);
  return user;
}

function getUser(id: number): User | undefined {
  return existingUsers.find(user => user.id === id);
}

export {
  createUser,
  getUser
}