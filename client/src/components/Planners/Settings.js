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
import {
  getSettings,
  saveSettings,
  setLoading,
} from '../../actions/settingsActions';

import LearnMore from './LearnMore';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    paddingBottom: 40,
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
  },
  buttons: {
    margin: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Settings = ({
  getSettings,
  settings,
  error,
  loading,
  saveSettings,
  setLoading,
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

  const onChange = (event, newValue) => {
    setCurrent({
      ...current,
      [event.target.id]: newValue,
    });
  };

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

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading();
    current.modelYearEnd = selectedDate;
    saveSettings(current);
  };
  const onReset = (e) => {
    e.preventDefault();
    setLoading();
    getSettings();
  };

  return (
    <Grid container>
      <Grid item container direction='column'>
        <Grid item xs={false} sm={2} />

        <Grid item xs={12} sm={8} container spacing={2}>
          <Grid item xs={12} sm={4}>
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
                  onChange={onChange}
                  step={5}
                  marks
                  min={60}
                  max={100}
                  valueLabelDisplay='on'
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
                  onChange={onChange}
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
                  value={eduInflation}
                  onChange={onChange}
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
                  onChange={onChange}
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
                    onChange={handleDateChange}
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
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
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
                  onChange={onChange}
                  step={5}
                  marks
                  min={60}
                  max={100}
                  valueLabelDisplay='on'
                />
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
        <Grid item xs={false} sm={2} />
        <LearnMore
          title={title}
          open={open}
          desc={desc}
          handleClose={() => handleLearnClose()}
        />
      </Grid>
      <Grid item container direction='column' className={classes.buttonsCol}>
        <div>
          <Button
            variant='contained'
            color='secondary'
            onClick={onReset}
            className={classes.buttons}
          >
            Reset
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={onSubmit}
            className={classes.buttons}
          >
            Save
          </Button>
        </div>
      </Grid>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Grid>
  );
};

Settings.propTypes = {
  getSettings: PropTypes.func.isRequired,
  settings: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  saveSettings: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings.settings,
  error: state.settings.error,
  loading: state.settings.loading,
});

export default connect(mapStateToProps, {
  getSettings,
  saveSettings,
  setLoading,
})(Settings);
