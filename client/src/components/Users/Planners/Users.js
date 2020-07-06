import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import { getUsers, deleteUser, setLoading } from '../../../actions/userActions';
import Spinner from '../../layout/Spinner';

import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EditForm from './EditForm';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(10),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Users = ({
  users,
  match,

  getUsers,
  userLoaded,
  deleteUser,
  deleted,
  setLoading,
  loading,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editData, setEdit] = React.useState({
    user: [],
    edit: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getUsers();
  };
  const handleClickEdit = (user) => {
    setEdit({ edit: true, user: user });
  };
  const handleEditClose = () => {
    setEdit({ edit: false });
    getUsers();
  };

  const handleDelete = (user) => {
    let confirmAction = window.confirm('You want to delete ' + user.firstName);
    if (confirmAction) {
      setLoading();

      deleteUser(user);
    }
  };

  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Title',
        field: 'title',
        lookup: { 10: 'Mr.', 20: 'Mrs.' },
      },
      { title: 'Name', field: 'fullName' },
      // { title: 'Last Name', field: 'lastName' },
      { title: 'Email', field: 'email' },
      { title: 'Occupation', field: 'occupation' },
      { title: 'Join Date', field: 'date', type: 'date' },
      { title: 'Partner', field: 'partner', type: 'boolean' },
    ],
    page: 1,
    count: 3,
    data: users,
  });
  React.useEffect(() => {
    getUsers();

    // eslint-disable-next-line
  }, [deleted]);

  // Update State when Users are loaded and then modified
  React.useEffect(() => {
    setState({ ...state, data: users });
    // eslint-disable-next-line
  }, [users, userLoaded]);

  const userTable = (
    <div className={classes.container}>
      <Route exact path={`${match.path}/`}>
        <Fragment>
          <MaterialTable
            title='Users'
            page={state.page}
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) => handleClickOpen(),
                iconProps: { style: { fontSize: '25px', color: 'red' } },
              },
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => handleClickEdit(rowData),
                iconProps: { style: { fontSize: '25px', color: '#666666' } },
              },
              (rowData) => ({
                icon: 'delete',
                tooltip: 'Delete User',
                iconProps: { style: { fontSize: '25px', color: '#f50057' } },
                onClick: (event, rowData) => handleDelete(rowData),
              }),
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />
          <UserForm open={open} handleClose={() => handleClose()} />
          <EditForm
            open={editData.edit}
            user={editData.user}
            handleClose={() => handleEditClose()}
          />
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
        </Fragment>
      </Route>
    </div>
  );
  const spinner = <Spinner />;

  return <Fragment>{!userLoaded ? spinner : userTable}</Fragment>;
};
Users.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func.isRequired,

  userLoaded: PropTypes.bool.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleted: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userLoaded: state.users.userLoaded,
  deleted: state.users.delete,
  loading: state.users.formLoading,
  users: state.users.users,
});

export default connect(mapStateToProps, {
  setLoading,

  getUsers,
  deleteUser,
})(Users);
