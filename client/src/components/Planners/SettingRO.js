import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSettings } from '../../actions/settingsActions';

import LearnMore from './LearnMore';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    paddingBottom: 40,
    minHeight: 100,
  },
  title2: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  slider: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  mainTitle: {
    fontSize: 24,
    paddingBottom: 10,
    minHeight: 80,
  },
  date: {
    width: '100%',
    color: 'primary',
    borderColor: '#2EFF22',
  },
  input: {
    color: 'blue',
  },
  card: {
    padding: 10,
  },

  buttonsCol: {
    padding: 10,
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 40,
  },
  buttons: {
    margin: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  grids: {
    backgroundColor: 'red',
  },

  goals: {
    paddingBottom: 130,
  },
}));

const SettingsRO = ({
  getSettings,
  settings,

  loading,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getSettings();

    // eslint-disable-next-line
  }, []);

  const [current, setCurrent] = useState({
    ageAtDeath: 50,
    costInflation: 0,
    eduInflation: 0,
    timeHorizon: 0,
    modelYearEnd: 0,
    mpaCashSTD: 0,
    mpaLTD: 0,
    mpaEquities: 0,
    cmeCashSTD: 0,
    cmeLTD: 0,
    cmeEquities: 0,
    expectedReturn: 0,
    childrenAgeStart: 0,
    childrenNumYearsSchool: 0,
    childrenSchoolEnd: 0,
    childrenNumYearsUni: 0,
    childrenUniEnd: 0,
    goalOne: '',
    goalTwo: '',
    goalThree: '',
  });

  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    if (settings) {
      setCurrent({
        ageAtDeath: settings.ageAtDeath,
        costInflation: settings.costInflation,
        eduInflation: settings.eduInflation,
        timeHorizon: settings.timeHorizon,
        mpaCashSTD: settings.mpaCashSTD,
        mpaLTD: settings.mpaLTD,
        mpaEquities: settings.mpaEquities,
        cmeCashSTD: settings.cmeCashSTD,
        cmeLTD: settings.cmeLTD,
        cmeEquities: settings.cmeEquities,
        expectedReturn: settings.expectedReturn,
        childrenAgeStart: settings.childrenAgeStart,
        childrenNumYearsSchool: settings.childrenNumYearsSchool,
        childrenSchoolEnd: settings.childrenSchoolEnd,
        childrenNumYearsUni: settings.childrenNumYearsUni,
        childrenUniEnd: settings.childrenUniEnd,
        goalOne: settings.goalOne,
        goalTwo: settings.goalTwo,
        goalThree: settings.goalThree,
      });
      handleDateChange(settings.modelYearEnd);
    }

    // eslint-disable-next-line
  }, [settings]);
  const {
    ageAtDeath,
    costInflation,
    eduInflation,
    timeHorizon,
    mpaCashSTD,
    mpaLTD,
    mpaEquities,
    cmeCashSTD,
    cmeLTD,
    cmeEquities,
    expectedReturn,
    childrenAgeStart,
    childrenNumYearsSchool,
    childrenSchoolEnd,
    childrenNumYearsUni,
    childrenUniEnd,
    goalOne,
    goalTwo,
    goalThree,
  } = current;

  const [learn, setLearn] = useState({
    title: '',
    desc: '',
    open: false,
  });

  const { desc, open, title } = learn;
  const handleClickLearn = (titleText, descText) => {
    setLearn({ open: true, title: titleText, desc: descText });
  };
  const handleLearnClose = () => {
    setLearn({ open: false, title: '', desc: '' });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h4' gutterBottom>
          Global Settings
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Grid item container>
          <Grid item xs={false} sm={1} />

          <Grid item xs={12} sm={10} container spacing={2}>
            <Grid item container spacing={2} xs={12} md={4}>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.mainTitle}
                      color='textPrimary'
                      gutterBottom
                    >
                      General Settings:
                    </Typography>

                    <Typography
                      className={classes.title}
                      color='textSecondary'
                      gutterBottom
                    >
                      Age at death:
                    </Typography>

                    <Slider
                      id='ageAtDeath'
                      name='ageAtDeath'
                      value={ageAtDeath}
                      step={5}
                      marks
                      min={60}
                      max={100}
                      valueLabelDisplay='on'
                      color='secondary'
                    />
                    <Typography
                      className={classes.title}
                      color='textSecondary'
                      gutterBottom
                    >
                      Inflation of Costs:
                    </Typography>
                    <Slider
                      id='costInflation'
                      name='costInflation'
                      value={costInflation}
                      min={0}
                      max={50}
                      valueLabelDisplay='on'
                    />
                    <Typography
                      className={classes.title}
                      color='textSecondary'
                      gutterBottom
                    >
                      Education Inflation:
                    </Typography>
                    <Slider
                      id='eduInflation'
                      name='eduInflation'
                      type='number'
                      value={eduInflation}
                      min={0}
                      max={50}
                      valueLabelDisplay='on'
                    />
                    <Typography
                      className={classes.title}
                      color='textSecondary'
                      gutterBottom
                    >
                      Time Horizon:
                    </Typography>
                    <Slider
                      id='timeHorizon'
                      name='timeHorizon'
                      value={timeHorizon}
                      min={0}
                      max={50}
                      valueLabelDisplay='on'
                    />
                    <Typography
                      className={classes.title2}
                      color='textSecondary'
                      gutterBottom
                    >
                      Model Year End:
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        className={classes.date}
                        value={selectedDate}
                        views={['year']}
                        autoOk
                        minDate='01.01.2050'
                        InputProps={{
                          className: classes.input,
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      onClick={() =>
                        handleClickLearn(
                          'Age at Death',
                          'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.'
                        )
                      }
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <Grid item container xs={12} md={8}>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.mainTitle}
                        color='textPrimary'
                        gutterBottom
                      >
                        Model Portfolio Allocations:
                      </Typography>

                      <Typography
                        className={classes.title}
                        color='textSecondary'
                        gutterBottom
                      >
                        Cash Short Term Deposits:
                      </Typography>

                      <Slider
                        id='mpaCashSTD'
                        name='mpaCashSTD'
                        value={mpaCashSTD}
                        step={5}
                        marks
                        min={60}
                        max={100}
                        valueLabelDisplay='on'
                      />
                      <Tooltip
                        title='Fixed Income Securities'
                        placement='top-start'
                      >
                        <Typography
                          className={classes.title}
                          color='textSecondary'
                          gutterBottom
                        >
                          Long Term Deposits:
                        </Typography>
                      </Tooltip>
                      <Slider
                        id='mpaLTD'
                        name='mpaLTD'
                        value={mpaLTD}
                        min={0}
                        max={50}
                        valueLabelDisplay='on'
                      />
                      <Typography
                        className={classes.title}
                        color='textSecondary'
                        gutterBottom
                      >
                        Equities:
                      </Typography>
                      <Slider
                        id='mpaEquities'
                        name='mpaEquities'
                        value={mpaEquities}
                        min={0}
                        max={50}
                        valueLabelDisplay='on'
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        size='small'
                        onClick={() =>
                          handleClickLearn(
                            'Model Portfolio Allocations',
                            'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.'
                          )
                        }
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.mainTitle}
                        color='textPrimary'
                        gutterBottom
                      >
                        Capital Market Expectations:
                      </Typography>

                      <Typography
                        className={classes.title}
                        color='textSecondary'
                        gutterBottom
                      >
                        Cash Short Term Deposits:
                      </Typography>

                      <Slider
                        id='cmeCashSTD'
                        name='cmeCashSTD'
                        value={cmeCashSTD}
                        step={5}
                        marks
                        min={60}
                        max={100}
                        valueLabelDisplay='on'
                      />
                      <Tooltip
                        title='Fixed Income Securities'
                        placement='top-start'
                      >
                        <Typography
                          className={classes.title}
                          color='textSecondary'
                          gutterBottom
                        >
                          Long Term Deposits:
                        </Typography>
                      </Tooltip>
                      <Slider
                        id='cmeLTD'
                        name='cmeLTD'
                        value={cmeLTD}
                        min={0}
                        max={50}
                        valueLabelDisplay='on'
                      />
                      <Typography
                        className={classes.title}
                        color='textSecondary'
                        gutterBottom
                      >
                        Equities:
                      </Typography>
                      <Slider
                        id='cmeEquities'
                        name='cmeEquities'
                        value={cmeEquities}
                        min={0}
                        max={50}
                        valueLabelDisplay='on'
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        size='small'
                        onClick={() =>
                          handleClickLearn(
                            'Model Portfolio Allocations',
                            'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.'
                          )
                        }
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color='textSecondary'
                      >
                        Expected Return:
                      </Typography>

                      <Slider
                        id='expectedReturn'
                        name='expectedReturn'
                        value={expectedReturn}
                        min={0}
                        max={50}
                        valueLabelDisplay='on'
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={4}>
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography
                      className={classes.mainTitle}
                      color='textPrimary'
                      gutterBottom
                    >
                      Children:
                    </Typography>

                    <TextField
                      margin='dense'
                      id='childrenAgeStart'
                      name='childrenAgeStart'
                      label='Age of Start Schooling'
                      type='number'
                      value={childrenAgeStart}
                      inputProps={{ min: 0, max: 10 }}
                      fullWidth
                    />

                    <TextField
                      margin='dense'
                      id='childrenNumYearsSchool'
                      name='childrenNumYearsSchool'
                      label='Number of years at school'
                      value={childrenNumYearsSchool}
                      type='number'
                      inputProps={{ min: 0, max: 20 }}
                      fullWidth
                    />
                    <TextField
                      margin='dense'
                      id='childrenSchoolEnd'
                      name='childrenSchoolEnd'
                      label='End of School Age '
                      value={childrenSchoolEnd}
                      type='number'
                      inputProps={{ min: 0, max: 20 }}
                      fullWidth
                    />
                    <TextField
                      margin='dense'
                      id='childrenNumYearsUni'
                      name='childrenNumYearsUni'
                      label='Number of years at University'
                      value={childrenNumYearsUni}
                      type='number'
                      inputProps={{ min: 0, max: 20 }}
                      fullWidth
                    />
                    <TextField
                      margin='dense'
                      id='childrenUniEnd'
                      name='childrenUniEnd'
                      label='End of University Age'
                      value={childrenUniEnd}
                      type='number'
                      inputProps={{ min: 16, max: 40 }}
                      fullWidth
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      onClick={() =>
                        handleClickLearn(
                          'Children',
                          'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.'
                        )
                      }
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.goals}>
                    <Typography
                      className={classes.mainTitle}
                      color='textPrimary'
                      gutterBottom
                    >
                      Goals:
                    </Typography>

                    <TextField
                      margin='dense'
                      id='goalOne'
                      name='goalOne'
                      label='Primary Goal'
                      value={goalOne}
                      inputProps={{ min: 16, max: 40 }}
                      fullWidth
                    />

                    <TextField
                      margin='dense'
                      id='goalTwo'
                      name='goalTwo'
                      label='Secondary Goal'
                      value={goalTwo}
                      inputProps={{ min: 16, max: 40 }}
                      fullWidth
                    />

                    <TextField
                      margin='dense'
                      id='goalThree'
                      name='goalThree'
                      label='Teritary Goal'
                      value={goalThree}
                      inputProps={{ min: 16, max: 40 }}
                      fullWidth
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size='small'
                      onClick={() =>
                        handleClickLearn(
                          'Goals',
                          'Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.'
                        )
                      }
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>

        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <LearnMore
          title={title}
          open={open}
          desc={desc}
          handleClose={() => handleLearnClose()}
        />
      </Grid>
    </Grid>
  );
};

SettingsRO.propTypes = {
  getSettings: PropTypes.func.isRequired,
  settings: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings.settings,

  loading: state.settings.loading,
});

export default connect(mapStateToProps, {
  getSettings,
})(SettingsRO);
