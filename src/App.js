import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

import CustomerInformation from './components/CustomerInformation';
import PizzaSelection from './components/PizzaSelection';
import PaymentInformation from './components/PaymentInformation';
import YourOrder from './components/YourOrder'

import { StoreContext } from './StoreContext';
import { reducer, initialState, types } from './CustomReducer';
import { useStyles } from './useStyles';

function UnknownStep() {
  return (
    <Typography>Unknown step.</Typography>
  )
}
function DynamicComponent({ step }) {
  switch (step) {
    case 0:
      return <CustomerInformation />;
    case 1:
      return <PizzaSelection />;
    case 2:
      return <PaymentInformation />;
    case 3:
      return <YourOrder />;
    default:
      return <UnknownStep />;
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { activeStep } = state;
  const classes = useStyles();
  const steps = [
    'Customer information',
    'Pizza selection',
    'Payment information',
    'Place Order'
  ];
  const stateProvider = {
    state,
    dispatch
  };
  const handleReset = () => {
    dispatch({ type: types.reset })
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Order a pizza</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <StoreContext.Provider value={stateProvider} >
                <DynamicComponent step={index} />
              </StoreContext.Provider>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Order Completed. Thank you!</Typography>
          <Button onClick={handleReset}
            variant="contained"
            size="large"
            className={classes.button}>
            Home
          </Button>
        </Paper>
      )}
    </div>
  );
}
