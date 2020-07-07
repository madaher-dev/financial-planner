import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlannerForm from './PlannerForm';
import {
  getPlanners,
  deletePlanner,
  setLoading,
} from '../../actions/plannerActions';
import Spinner from '../layout/Spinner';

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

const Planners = ({
  planners,
  match,
  getPlanners,
  plannerLoaded,
  deletePlanner,
  deleted,
  setLoading,
  loading,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editData, setEdit] = React.useState({
    planner: [],
    edit: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getPlanners();
  };
  const handleClickEdit = (planner) => {
    setEdit({ edit: true, planner: planner });
  };
  const handleEditClose = () => {
    setEdit({ edit: false });
    getPlanners();
  };

  const handleDelete = (planner) => {
    let confirmAction = window.confirm('You want to delete ' + planner.name);
    if (confirmAction) {
      setLoading();
      deletePlanner(planner._id);
    }
  };

  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Title',
        field: 'title',
        lookup: { 10: 'Mr.', 20: 'Mrs.' },
      },
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Company', field: 'company' },
      { title: 'Join Date', field: 'date', type: 'date' },
      { title: 'Type', field: 'type' },
    ],
    page: 1,
    count: 3,
    data: planners,
  });
  React.useEffect(() => {
    getPlanners();

    // eslint-disable-next-line
  }, [deleted]);

  // Update State when planners are loaded and then modified
  React.useEffect(() => {
    setState({ ...state, data: planners });
    // eslint-disable-next-line
  }, [planners, plannerLoaded]);

  const plannerTable = (
    <div className={classes.container}>
      <Route exact path={`${match.path}/`}>
        <Fragment>
          <MaterialTable
            title='Planners'
            page={state.page}
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add Planner',
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
              exportButton: true,
            }}
          />
          <PlannerForm open={open} handleClose={() => handleClose()} />
          <EditForm
            open={editData.edit}
            planner={editData.planner}
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

  return <Fragment>{!plannerLoaded ? spinner : plannerTable}</Fragment>;
};
Planners.propTypes = {
  planners: PropTypes.array,
  getPlanners: PropTypes.func.isRequired,
  plannerLoaded: PropTypes.bool.isRequired,
  deletePlanner: PropTypes.func.isRequired,
  deleted: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  planners: state.planners.planners,
  plannerLoaded: state.planners.plannerLoaded,
  deleted: state.planners.delete,
  loading: state.planners.formLoading,
});

export default connect(mapStateToProps, {
  setLoading,
  getPlanners,
  deletePlanner,
})(Planners);
