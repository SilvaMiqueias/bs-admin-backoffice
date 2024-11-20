export class User{
  id?: string
  name?: string
  role?: string[]
  userName?: string
  password?: string

  constructor(user: User) {
    this.id  = user.id;
    this.name = user.name;
    this.role = user.role;
    this.password = user.password;
    this.userName = user.userName;
  }
}
