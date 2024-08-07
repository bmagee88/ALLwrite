import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { User, loginUser } from "../../../common/store/user/userSlice";
import { useDispatch } from "react-redux";
import NoAccount from "./NoAccount/NoAccount";
import { Alert } from "@mui/material";

const LOGIN_ENDPOINT = `/api/access/login`;

interface LoginError {
  isError: boolean;
  message: string;
}
const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loginError, setLoginError] = useState<LoginError>({ isError: false, message: "" });

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
      console.log("error 400:", data.data);
      setLoginError({ isError: true, message: data.data });
      return;
    } else if (response.status !== 200) {
      console.log("not 200:", data.data);
      setLoginError({ isError: true, message: data.data });
      return;
    }

    console.log("status code 200");
    console.log("data.data", data.data);

    dispatch(loginUser(data.data as User));
    console.log("success");
    navigate(`/dashboard/browse`);
  };

  return (
    <>
      <div className='bg-light pt-4'>
        <div className='row justify-content-center'>
          <div className='col-6 w-auto h1 border border-dark rounded p-2'>Login</div>
        </div>
        <div className='row justify-content-center'>
          {loginError.isError && <Alert severity='warning'>{loginError.message}</Alert>}

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
