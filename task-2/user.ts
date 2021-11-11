class User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;

  constructor(
    id: string,
    login: string,
    password: string,
    age: number,
    isDeleted: boolean
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
  }
}

export { User };
