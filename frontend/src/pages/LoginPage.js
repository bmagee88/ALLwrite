import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const LOGIN_ENDPOINT = `http://localhost:8000/login`;

  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var form_data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const response = await fetch(e.target.action, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    });

    const data = await response.json();
    console.log("data = ", data);
    if (response.status === 400) {
      console.log("invalid key value pair");
      throw new Error(response.statusText);
    } else if (response.status !== 200) {
      console.log("not 200");
      throw new Error(response.statusText);
    }

    if (data.data.length !== 0) {
      sessionStorage.setItem("user_id", data.data[0].user_id);
      sessionStorage.setItem("username", data.data[0].username);
      sessionStorage.setItem("firstname", data.data[0].firstname);
      sessionStorage.setItem("lastname", data.data[0].lastname);
      sessionStorage.setItem("email", data.data[0].email);
      console.log("success");
      navigate(`/browse`);
      navigate(0);
    } else {
      console.log("login failed: user/pass key/val incorrect");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-light pt-4">
        <div className="row justify-content-center">
          <div className="col-6 w-auto h1 border border-dark rounded p-2">
            Login
          </div>
        </div>
        <form
          className="px-4"
          action={LOGIN_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="row justify-content-center">
            <div className="form-group row mt-4 p-4 border border-dark rounded w-50">
              {/* username */}
              <label
                htmlFor="inputUsername"
                className="col-sm-2 col-form-label"
              >
                Username
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  name="username"
                />
              </div>

              {/* password */}
              <label
                htmlFor="inputPassword"
                className="col-sm-2 col-form-label mt-4"
              >
                Password
              </label>
              <div className="col-sm-10 mt-4">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  name="password"
                />
              </div>
              {/* submit */}
              <div className="row justify-content-end mt-4">
                <div className="col-6 w-auto">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    formAction={LOGIN_ENDPOINT}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
