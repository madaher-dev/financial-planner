import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  chart: {
    maxHeight: 350,
  },
});

const data = [
  { metric: 'Income', value: 230000 },
  { metric: 'Expenses', value: 120000 },
  { metric: 'Total Networth', value: 500000 },
  { metric: 'Total Goals', value: 320000 },
];

class Charts extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    const { classes } = this.props;
    return (
      <Paper>
        <Grid container>
          <Grid item container direction='column' />
          <Grid item container>
            <Grid item xs={2} />
            <Grid item xs={4}>
              <Chart data={chartData} className={classes.chart}>
                <ArgumentAxis />
                <ValueAxis max={600000} />

                <BarSeries valueField='value' argumentField='metric' />
                <Title text='General Info' />
                <Animation />
              </Chart>
            </Grid>
            <Grid item xs={6} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
export default withStyles(useStyles)(Charts);
