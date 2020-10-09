class User {
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

    constructor(firstname: string, lastname: string, email: string) {
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
    new User('Thomas', 'Falcone', 'thomas.falcone@mail.com'),
    new User('Philippa', 'Dupont', 'mail@mail.mail')
]

export { User, existingUsers }