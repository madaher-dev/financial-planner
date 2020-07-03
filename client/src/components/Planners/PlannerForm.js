import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  addPlanner,
  clearErrors,
  clearAdd,
  setLoading,
} from '../../actions/plannerActions';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  text: {
    textAlign: 'center',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20),
  },
  textfield: {
    width: '100%',
    border: 0,
  },
  formControl: {
    minWidth: 120,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const PlannerForm = ({
  addPlanner,
  error,
  clearErrors,
  setAlert,
  open,
  handleClose,
  add,
  addLoading,
  setLoading,
}) => {
  // const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [planner, setPlanner] = useState({
    name: '',
    email: '',
    title: '10',
    company: '',
    phone: '',
    comments: '',
  });

  const { title, name, email, company, phone, comments } = planner;

  const onChange = (e) => {
    setPlanner({ ...planner, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setPlanner({
      name: '',
      email: '',
      title: '10',
      company: '',
      phone: '',
      comments: '',
    });
    clearAdd();
  };

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
      }
    } else if (add) {
      setAlert('Planner Added', 'success');
      clearForm();
    }
    clearErrors();
  }, [error, add, setAlert, clearErrors]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading();
    addPlanner(planner);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Add New Planner</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new planner insert their info and they will receive an email
          to activate their account, set a new password and login.
        </DialogContentText>
        <FormControl className={classes.formControl}>
          <InputLabel id='title-label'>Title</InputLabel>
          <Select
            labelId='title'
            name='title'
            id='title'
            value={title}
            onChange={onChange}
          >
            <MenuItem id='title' value={10}>
              Mr
            </MenuItem>
            <MenuItem id='title' value={20}>
              Mrs
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          margin='dense'
          id='name'
          name='name'
          label='Name'
          type='text'
          value={name}
          onChange={onChange}
          fullWidth
          autoComplete='name'
        />

        <TextField
          margin='dense'
          id='company'
          name='company'
          label='Company'
          type='text'
          value={company}
          onChange={onChange}
          fullWidth
          autoComplete='company'
        />
        <TextField
          margin='dense'
          id='email'
          name='email'
          label='Email Address'
          type='email'
          value={email}
          onChange={onChange}
          fullWidth
          autoComplete='email'
        />
        <TextField
          margin='dense'
          id='phone'
          name='phone'
          label='Phone Number'
          type='tel'
          value={phone}
          onChange={onChange}
          fullWidth
          autoComplete='tel'
        />
        <TextField
          placeholder='Additional Comments'
          multiline
          rows={4}
          margin='dense'
          id='comments'
          name='comments'
          value={comments}
          onChange={onChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          Add Planner
        </Button>
      </DialogActions>
      <Backdrop className={classes.backdrop} open={addLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Dialog>
  );
};

PlannerForm.propTypes = {
  addPlanner: PropTypes.func.isRequired,
  error: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  add: PropTypes.bool.isRequired,
  addLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  error: state.planners.error,
  add: state.planners.add,
  addLoading: state.planners.formLoading,
});

export default connect(mapStateToProps, {
  addPlanner,
  clearErrors,
  setAlert,
  setLoading,
})(PlannerForm);
