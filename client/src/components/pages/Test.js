onst onChangeGoals = (e) => {
  let prevValue = current[e.target.name];
  setPreviousGoals({ ...previousGoals, [e.target.name]: prevValue });
  setCurrent({ ...current, [e.target.name]: e.target.value });
};
const [previousGoals, setPreviousGoals] = useState({
  goalOne: 10,
  goalTwo: 10,
  goalThree: 10,
});

useEffect(() => {
  
  if (current.goalOne === current.goalTwo) {
    setCurrent({ goalTwo: previousGoals.goalOne });
  } else if (current.goalOne == current.goalThree) {
    setCurrent({ goalThree: previousGoals.goalOne });

  }
}, [current.goalOne]);

useEffect(() => {
  if (current.goalTwo === current.goalOne) {
    setCurrent({ goalOne: previousGoals.goalTwo });
  } else if (current.goalTwo === current.goalThree) {
    setCurrent({ goalThree: previousGoals.goalTwo });
  }
}, [current.goalTwo]);

useEffect(() => {
  if (current.goalThree === current.goalOne) {
    setCurrent({ goalOne: previousGoals.goalThree });
  } else if (current.goalThree === current.goalTwo) {
    setCurrent({ goalTwo: previousGoals.goalThree });
  }
}, [current.goalThree]);