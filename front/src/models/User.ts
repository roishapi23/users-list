export class User {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  id?: number;
  constructor(first_name: string, last_name: string, email: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
  static init(): User {
    return new User("", "", "");
  }
}
