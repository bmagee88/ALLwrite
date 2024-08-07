import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const CREATE_USER_ENDPOINT = `/api/users/create-user`;
  const IS_USERNAME_AVAILABLE_ENDPOINT = `/api/access/is-username-taken/`;
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [usernameIsBlank, setUsernameIsBlank] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate fields
    if (e.target.value === "" || !usernameAvailable) {
      // flash the field
      console.log("caught username unavailable");
      return;
    }

    // load pbject to send
    var form_data = {
      username: e.target.elements.inputUsername.value,
      firstname: e.target.elements.inputFirstName.value,
      lastname: e.target.elements.inputLastName.value,
      email: e.target.elements.inputEmail.value,
      password: e.target.elements.inputPassword.value,
    };

    // bcrypt.compare(
    //   e.target.elements.inputPassword.value,
    //   encrypted_password,
    //   function (err, result) {
    //     if (err) {
    //       console.log("error");
    //     } else {
    //       if (result) {
    //         console.log("Password is correct");
    //       } else {
    //         console.log("Password is incorrect");
    //       }
    //     }
    //   }
    // );

    //post to server endpoint
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
        navigate("/dashboard/browse");
      })
      .catch((err) => {
        console.log(err);
      });

    //then wait for response and notify the user accordingly
  };

  const getUsernameAvailable = debounce((username) => {
    //fetch here
    const getTaken = async (username) => {
      const result = await fetch(IS_USERNAME_AVAILABLE_ENDPOINT + `${username}`);
      const data = await result.json();
      // console.log("getusernametaken:data", data)
      if (data.data === true) setUsernameAvailable(false);
      else {
        setUsernameAvailable(true);
      }
    };

    if (username === "") {
      setUsernameIsBlank(true);
      setUsernameAvailable(false);
      return;
    } else {
      setUsernameIsBlank(false);
    }
    getTaken(username);
  });

  function debounce(cb, delay = 1000) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  const checkUsernameAvailability = (e) => {
    //use debouncing to check availablity
    getUsernameAvailable(e.target.value);
    //update state : usernameIsValid
    //fetch from db from is-username-taken:username
  };

  return (
    <div>
      <div className='row justify-content-center h1 mt-4'>
        <div className='col-1 bg-light w-auto border rounded px-2'>Register</div>
      </div>
      <Form
        className='mx-5'
        onSubmit={handleSubmit}
        action={CREATE_USER_ENDPOINT}
        method='POST'>
        <div className='form-group row'>
          {/* <div>
            usernameBlank: {String(usernameIsBlank)}, usernameAvailable:{" "}
            {String(usernameAvailable)}
          </div> */}
          <label
            htmlFor='inputUsername'
            className='col-sm-2 col-form-label'>
            Username
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='inputUsername'
              placeholder=''
              onChange={(e) => checkUsernameAvailability(e)}
              required
            />
            {usernameAvailable && <div className='text-success'>Available</div>}
            {!usernameIsBlank && !usernameAvailable && <div className='text-danger'>Taken</div>}
          </div>
        </div>
        <div className='form-group row'>
          <label
            htmlFor='inputFirstName'
            className='col-sm-2 col-form-label'>
            First Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='inputFirstName'
              placeholder=''
            />
          </div>
        </div>
        <div className='form-group row'>
          <label
            htmlFor='inputLastName'
            className='col-sm-2 col-form-label'>
            Last Name
          </label>
          <div className='col-sm-10'>
            <input
              type='text'
              className='form-control'
              id='inputLastName'
              placeholder=''
            />
          </div>
        </div>
        <div className='form-group row'>
          <label
            htmlFor='inputEmail'
            className='col-sm-2 col-form-label'>
            Email
          </label>
          <div className='col-sm-10'>
            <input
              type='email'
              className='form-control'
              id='inputEmail'
              placeholder=''
              required
            />
          </div>
        </div>
        <div className='form-group row'>
          <label
            htmlFor='inputPassword'
            className='col-sm-2 col-form-label'>
            Password
          </label>
          <div className='col-sm-10'>
            <input
              type='password'
              className='form-control'
              id='inputPassword'
              placeholder=''
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
        <div className='form-group row my-4'>
          <div className='col-sm-2'>Agree to Terms and Conditions</div>
          <div className='col-sm-10'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='gridCheck1'
                required
              />
              <label
                className='form-check-label'
                htmlFor='gridCheck1'>
                !robot
              </label>
            </div>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-sm-10'>
            <button
              type='submit'
              className='btn btn-primary'
              formAction=''>
              Join :{"]"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
