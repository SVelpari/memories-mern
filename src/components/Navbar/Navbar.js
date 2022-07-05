import React, {useState, useEffect} from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/m-logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  // const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    //JWT Expiry handling
    if(token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
       logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])

  return (
    <div>
      <AppBar className = {classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer} >
          <img src={memories} className={classes.image} alt='memories' height='60' />
          <Typography component={Link} to='/' className={classes.heading} variant='h3' align='center'>emorybook</Typography>
        </div>

        <Toolbar className={classes.toolbar}>
          { user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
              <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
            </div>
            ) : (
              <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )
          }
        </Toolbar>

     </AppBar>
    </div>
  )
}

export default Navbar
