class UserDto {
  username;
  firstname;
  lastname;
  email;
  password;

  constructor(username, firstname, lastname, email, password) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}

export default UserDto;
