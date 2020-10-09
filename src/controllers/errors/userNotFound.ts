export class UserNotFoundError extends Error {
  id: number;

  constructor(id: number, message: string){
    super(message);
    this.id = id;
  }
}