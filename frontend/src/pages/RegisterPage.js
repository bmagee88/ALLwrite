import React from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const CREATE_USER_ENDPOINT = `http://localhost:8000/create-user`;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //validate fields

    //post to server endpoint

    var form_data = {
      username: e.target.elements.inputUsername.value,
      firstname: e.target.elements.inputFirstName.value,
      lastname: e.target.elements.inputLastName.value,
      email: e.target.elements.inputEmail.value,
      password: e.target.elements.inputPassword.value,
    };

    fetch(e.target.action, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log("status code not 200");
          throw new Error(response.statusText);
        }
        console.log("success");
        // return response.json();
        navigate("/browse");
      })
      .catch((err) => {
        console.log(err);
      });

    //then wait for response and notify the user accordingly
  };

  return (
    <div>
      <div className="row justify-content-center h1 mt-4">
        <div className="col-1 bg-light w-auto border rounded px-2">
          Register
        </div>
      </div>
      <Form
        className="mx-5"
        onSubmit={handleSubmit}
        action={CREATE_USER_ENDPOINT}
        method="POST"
      >
        <div className="form-group row">
          <label htmlFor="inputUsername" className="col-sm-2 col-form-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              placeholder="Username"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">
            First Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              placeholder="First Name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputLastName" className="col-sm-2 col-form-label">
            Last Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              required
            />
          </div>
        </div>
        {/* <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="option1"
                  checked
                />
                <label class="form-check-label" for="gridRadios1">
                  First radio
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="option2"
                />
                <label class="form-check-label" for="gridRadios2">
                  Second radio
                </label>
              </div>
              <div class="form-check disabled">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios3"
                  value="option3"
                  disabled
                />
                <label class="form-check-label" for="gridRadios3">
                  Third disabled radio
                </label>
              </div>
            </div>
          </div>
        </fieldset> */}
        <div className="form-group row my-4">
          <div className="col-sm-2">Agree to Terms and Conditions</div>
          <div className="col-sm-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck1"
                required
              />
              <label className="form-check-label" htmlFor="gridCheck1">
                !robot
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary" formAction="">
              Join :{"]"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
