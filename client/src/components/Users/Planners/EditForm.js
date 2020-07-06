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
  editUser,
  clearErrors,
  setLoading,
} from '../../../actions/userActions';
import { setAlert } from '../../../actions/alertActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
const EditForm = ({
  editUser,
  error,
  clearErrors,
  setAlert,
  open,
  handleClose,
  edit,
  user,
  deleted,
  setLoading,
  editLoading,
}) => {
  const classes = useStyles();
  //Setting form data on form open
  React.useEffect(() => {
    setPartner(false);
    if (user) {
      if (user.partner) setPartner(true);
      setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        title: user.title,
        occupation: user.occupation,
        phone: user.phone,
        comments: user.comments,
        partner: user.partner,
        id: user._id,
        planner: user.planner,
      });
    }
  }, [user]);

  const [userData, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '10',
    occupation: '',
    phone: '',
    comments: '',
    id: '',
    partner: false,
    planner: '',
  });

  const {
    title,
    firstName,
    lastName,
    email,
    occupation,
    phone,
    comments,
  } = userData;

  const onChange = (e) => {
    setUser({ ...userData, [e.target.name]: e.target.value });
  };
  const [partnercheck, setPartner] = useState(false);
  const onPartnerChange = (e) => {
    if (e.target.checked) {
      setUser({ ...userData, partner: true });
      setPartner(true);
    } else {
      setUser({ ...userData, partner: false });
      setPartner(false);
    }
  };

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    } else if (edit) {
      setAlert('User successfully edited', 'success');
      clearErrors();
    } else if (deleted) {
      setAlert('User Deleted', 'warning');
      clearErrors();
    }
  }, [error, edit, setAlert, clearErrors, deleted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading();

    editUser(userData);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Edit User</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit User Data</DialogContentText>
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
          id='firstName'
          name='firstName'
          label='First Name'
          type='text'
          value={firstName}
          onChange={onChange}
          fullWidth
          autoComplete='first name'
        />
        <TextField
          margin='dense'
          id='lastName'
          name='lastName'
          label='Last Name'
          type='text'
          value={lastName}
          onChange={onChange}
          fullWidth
          autoComplete='last name'
        />

        <TextField
          margin='dense'
          id='occupation'
          name='occupation'
          label='Occupation'
          type='text'
          value={occupation}
          onChange={onChange}
          fullWidth
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
        <FormControlLabel
          control={
            <Switch
              checked={partnercheck}
              onChange={onPartnerChange}
              name='partner'
            />
          }
          label='Has partner?'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
        <Button onClick={onSubmit} color='primary'>
          Edit User
        </Button>
      </DialogActions>
      <Backdrop className={classes.backdrop} open={editLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Dialog>
  );
};

EditForm.propTypes = {
  editUser: PropTypes.func.isRequired,
  error: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  deleted: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  editLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.users.error,
  edit: state.users.edit,
  deleted: state.users.delete,
  editLoading: state.users.formLoading,
});

export default connect(mapStateToProps, {
  editUser,
  clearErrors,
  setAlert,
  setLoading,
})(EditForm);
