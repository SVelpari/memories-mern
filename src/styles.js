import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
  },
  heading: {
    // color: 'rgba(0,183,255, 1)',
    color: '#347bd4',
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
    }
  }
 })
);