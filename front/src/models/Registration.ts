export class Registration {
  user_name: string;
  password: string;
  constructor(user_name: string, password: string) {
    this.user_name = user_name;
    this.password = password;
  }
  static init(): Registration {
    return new Registration("", "");
  }
}
