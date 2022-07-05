import React, {useEffect, useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';
import { useNavigate } from 'react-router-dom';
//import { GoogleLogin } from 'react-google-login';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';


import jwt_decode from 'jwt-decode';

import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit  = (e) => {
    e.preventDefault();
    console.log(formData);
    if(isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    // handleShowPassword(false);
    setShowPassword(false)
  }

  // const googleSuccess = async (res) => {
  //   console.log(res);
  // }

  // const googleFailure = (error) => {
  //   console.log(error);
  //   console.log('Google Sign In was unsuccessfull');
  // }

  const handleCallbackResponse = (res) => {
    console.log(res);
    console.log('Encoded JWT ID Token: ' + res.credential);
    const userObject = jwt_decode(res.credential);
    console.log(userObject);

    const result = userObject;
    const token = res?.credential;

    try {
      dispatch({ type: 'AUTH', data: { result, token}});
      navigate('/');
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: '476796852828-goq9daurpbmmo822itdsdat94ikcm0u4.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })

    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"), { theme: "outline", size: "large"}
    )

  },[])

  return (
    <Container component='main' maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'> {isSignup ? 'Sign Up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name='confirmPassword' label="Repeat password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}>
           { isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <Button
            id='signInDiv'
            className={classes.googleButton}
            color='primary'
            fullWidth
            startIcon={<Icon />}
            variant='contained'
          >
            Google Sign In
          </Button>

          {/* <GoogleOAuthProvider 
            clientId='476796852828-goq9daurpbmmo822itdsdat94ikcm0u4.apps.googleusercontent.com'>
              <GoogleLogin
                // clientId='476796852828-goq9daurpbmmo822itdsdat94ikcm0u4.apps.googleusercontent.com'
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color='primary'
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant='contained'
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onError={googleFailure}
                cookiePolicy="single_host_origin"
              />
          </GoogleOAuthProvider> */}
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account ? Sign In' : 'Dont have an account ? Sign Up'}
              </Button>
            </Grid>

          </Grid>

        </form>


      </Paper>
    </Container>
  )
}

export default Auth
