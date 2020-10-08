class User {

    id : number;
    firstname : string;
    lastname : string;
    email : string;
    static last_id = 0;

    constructor(firstname: string, lastname: string, email: string) {
        User.last_id += 1;
        this.id = User.last_id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    status() {
        return `Je m'appelle ${this.firstname} ${this.lastname} et suis joignable sur ${this.email}`;
    }

    changeLastname(newlastname : string) {
        this.lastname = newlastname ;
    }

    changeFirstname(newFirstname : string) {
        this.firstname = newFirstname;
    }
}

const existingUsers = [
    new User('Thomas', 'Falcone', 'thomas.falcone@mail.com'),
    new User('Philippa', 'Dupont', 'mail@mail.mail')
]

export { User, existingUsers }