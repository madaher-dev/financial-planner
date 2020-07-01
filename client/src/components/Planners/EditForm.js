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
  editPlanner,
  clearErrors,
  setLoading,
} from '../../actions/plannerActions';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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
const EditForm = ({
  editPlanner,
  error,
  clearErrors,
  setAlert,
  open,
  handleClose,
  edit,
  planner,
  deleted,
  setLoading,
  editLoading,
}) => {
  const classes = useStyles();
  //Setting form data on form open
  React.useEffect(() => {
    setAdmin(false);
    if (planner) {
      if (planner.type === 'Admin') {
        setAdmin(true);
      }

      setPlanner({
        name: planner.name,
        email: planner.email,
        title: planner.title,
        company: planner.company,
        phone: planner.phone,
        comments: planner.comments,
        id: planner._id,
        type: planner.type,
      });
    }

    // eslint-disable-next-line
  }, [planner]);

  const [plannerData, setPlanner] = useState({
    name: '',
    email: '',
    title: '10',
    company: '',
    phone: '',
    comments: '',
    id: '',
    type: '',
  });

  const [admin, setAdmin] = useState(false);

  const { title, name, email, company, phone, comments } = plannerData;

  const onChange = (e) => {
    setPlanner({ ...plannerData, [e.target.name]: e.target.value });
  };
  const onAdminChange = (e) => {
    if (e.target.checked) {
      setPlanner({ ...plannerData, type: 'Admin' });
      setAdmin(true);
    } else {
      setPlanner({ ...plannerData, type: 'Planner' });
      setAdmin(false);
    }
  };

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
      }
    } else if (edit) {
      setAlert('Planner successfully edited', 'success');
    } else if (deleted) {
      setAlert('Planner Deleted', 'warning');
    }
    clearErrors();
  }, [error, edit, setAlert, clearErrors, deleted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading();
    editPlanner(plannerData);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Edit Planner</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit Planner Data</DialogContentText>
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

        <FormControlLabel
          control={
            <Switch checked={admin} onChange={onAdminChange} name='admin' />
          }
          label='Is Admin'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
        <Button onClick={onSubmit} color='primary'>
          Edit Planner
        </Button>
      </DialogActions>
      <Backdrop className={classes.backdrop} open={editLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Dialog>
  );
};

EditForm.propTypes = {
  editPlanner: PropTypes.func.isRequired,
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
  isAuthenticated: state.planners.isAuthenticated,
  error: state.planners.error,
  edit: state.planners.edit,
  deleted: state.planners.delete,
  editLoading: state.planners.formLoading,
});

export default connect(mapStateToProps, {
  editPlanner,
  clearErrors,
  setAlert,
  setLoading,
})(EditForm);
