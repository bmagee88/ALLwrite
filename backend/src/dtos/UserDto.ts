class UserDto {
  username;
  firstname;
  lastname;
  email;
  password;

  constructor(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}

export default UserDto;
