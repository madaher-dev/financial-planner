import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlannerForm from './PlannerForm';

const Planners = ({ planners }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Title',
        field: 'title',
        lookup: { 1: 'Mr.', 2: 'Mrs.' },
      },
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Join Date', field: 'date', type: 'date' },
    ],
    page: 1,
    count: 3,
    data: planners,
  });

  return (
    <Fragment>
      <MaterialTable
        title='Planners'
        page={state.page}
        columns={state.columns}
        data={planners ? state.data : []}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add Planner',
            isFreeAction: true,
            onClick: (event) => handleClickOpen(),
            iconProps: { style: { fontSize: '25px', color: 'red' } },
          },
        ]}
      />
      <PlannerForm open={open} handleClose={() => handleClose()} />
    </Fragment>
  );
};
Planners.propTypes = {
  planners: PropTypes.array,
};

const mapStateToProps = (state) => ({
  planners: state.users.planners,
});

export default connect(mapStateToProps, {})(Planners);
