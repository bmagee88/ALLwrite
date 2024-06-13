import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { User, loginUser } from "../../../common/store/user/userSlice";
import { useDispatch } from "react-redux";
import NoAccount from "./NoAccount/NoAccount";
import Box from "@mui/material/Box";
import { Input, Typography } from "@mui/material";

const LoginPage = () => {
  const LOGIN_ENDPOINT = `http://localhost:8000/login`;
  const dispatch = useDispatch();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const form_data = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    console.log("form_data(handleSumbit):", form_data);

    console.log("form_data(handleSumbit) stringifyd:", JSON.stringify(form_data));
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form_data),
    });
    console.log(response);

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
      dispatch(loginUser(data.data[0] as User));
      console.log("success");
      navigate(`/dashboard/browse`);
    } else {
      console.log("login failed: user/pass key/val incorrect");
      navigate("/dashboard/login");
    }
  };

  return (
    <>
      <div className='bg-light pt-4'>
        <div className='row justify-content-center'>
          <div className='col-6 w-auto h1 border border-dark rounded p-2'>Login</div>
        </div>
        <div className='row justify-content-center'>
          <div className='form-group row mt-4 p-4 border border-dark rounded w-50'>
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
                name='username'
                ref={usernameRef}
              />
            </div>

            <label
              htmlFor='inputPassword'
              className='col-sm-2 col-form-label mt-4'>
              Password
            </label>
            <div className='col-sm-10 mt-4'>
              <input
                type='password'
                className='form-control'
                id='inputPassword'
                name='password'
                ref={passwordRef}
              />
            </div>
            <div className='row justify-content-end mt-4'>
              <div className='col-6 w-auto'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={() => handleSubmit()}>
                  Login
                </button>
              </div>
            </div>
            <NoAccount />
          </div>
        </div>
      </div>
      {/* <Box className='container'>
        <Box>
          <Typography>Login</Typography>
        </Box>
        <Box>
          <FormField props={}/>
        </Box>
        <Box>
          <FormField props={}/>
        </Box>
        <Box>Forgot Password</Box>
        <Box>
          <NoAccount />
        </Box>
      </Box> */}
    </>
  );
};

export default LoginPage;
