import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts'

import memories from '../src/images/m-logo.png';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import useStyles from './styles';

const App = () =>  {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  },[dispatch])

  return (
   <Container maxWidth='lg'>
     
     <AppBar className = {classes.appBar} position='static' color='inherit'>
       <img src={memories} className={classes.image} alt='memories' height='60' />
       <Typography className={classes.heading} variant='h3' align='center'>emorybook</Typography>
     </AppBar>

     <Grow in>
       <Container>
         <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
           <Grid item xs={12} sm={7}>
            <Posts  setCurrentId={setCurrentId}/>
           </Grid>
           <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
           </Grid>
         </Grid>
       </Container>
     </Grow>

   </Container>
  )
}

export default App;
