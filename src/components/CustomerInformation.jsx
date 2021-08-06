
import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useStoreContext } from '../StoreContext';
import { types } from '../CustomReducer';
import { useStyles } from '../useStyles';

function CustomerInformation() {
    const { state, dispatch } = useStoreContext();
    const { customer } = state;
    const { customer: customerFormError } = state.formError;
    const classes = useStyles();
    const setCustomerData = (e) => {
        const { name, value } = e.target;
        dispatch({ type: types.setCustomerData, name: name, value: value })
    };
    const handleNext = () => {
        if (customer.name === "") {
            dispatch({ type: types.setFormErrorCustomer, name: "name", value: true });
            return;
        }
        if (customer.streetName === "") {
            dispatch({ type: types.setFormErrorCustomer, name: "streetName", value: true });
            return;
        }
        if (customer.houseNumber === "") {
            dispatch({ type: types.setFormErrorCustomer, name: "houseNumber", value: true });
            return;
        }
        if (customer.postalCode === "") {
            dispatch({ type: types.setFormErrorCustomer, name: "postalCode", value: true });
            return;
        }
        if (customer.city === "") {
            dispatch({ type: types.setFormErrorCustomer, name: "city", value: true });
            return;
        }
        if (customer.phoneNumber === "") {
            dispatch({ type: types.setFormErrorCustomer, name: "phoneNumber", value: true });
            return;
        }
        dispatch({ type: types.setActiveStep, value: 1 });
    };

    return (
        <>
            <Typography>Please enter the following information:</Typography>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField name="name"
                        required
                        error={customerFormError?.name === true}
                        helperText={customerFormError?.name === true ? 'Please enter your name.' : ''}
                        value={customer?.name}
                        label="Name"
                        variant="outlined"
                        className={classes.marginTop}
                        onChange={setCustomerData}
                        inputProps={{ "data-testid": "name-input" }}
                    /></div>
                <div>
                    <TextField name="streetName"
                        required
                        error={customerFormError?.streetName === true}
                        helperText={customerFormError?.streetName === true ? 'Please enter street name.' : ''}
                        value={customer?.streetName}
                        label="Street name"
                        variant="outlined"
                        className={classes.marginTop}
                        onChange={setCustomerData}
                        inputProps={{ "data-testid": "streetName-input" }}
                    /></div>
                <div>
                    <TextField name="houseNumber"
                        required
                        error={customerFormError?.houseNumber === true}
                        helperText={customerFormError?.houseNumber === true ? 'Please enter house number.' : ''}
                        value={customer?.houseNumber}
                        label="House number" variant="outlined"
                        className={classes.marginTop}
                        onChange={setCustomerData}
                        inputProps={{ "data-testid": "houseNumber-input" }}
                    /></div>
                <div>
                    <TextField name="postalCode"
                        required
                        error={customerFormError?.postalCode === true}
                        helperText={customerFormError?.postalCode === true ? 'Please enter postal code.' : ''}
                        value={customer?.postalCode}
                        label="Postal code" variant="outlined"
                        className={classes.marginTop}
                        onChange={setCustomerData}
                        inputProps={{ "data-testid": "postalCode-input" }}
                    /></div>
                <div>
                    <TextField name="city"
                        required
                        error={customerFormError?.city === true}
                        helperText={customerFormError?.city === true ? 'Please enter city.' : ''}
                        value={customer?.city}
                        label="City" variant="outlined"
                        className={classes.marginTop}
                        onChange={setCustomerData}
                        inputProps={{ "data-testid": "city-input" }}
                    /></div>
                <div>
                    <TextField name="phoneNumber"
                        required
                        error={customerFormError?.phoneNumber === true}
                        helperText={customerFormError?.phoneNumber === true ? 'Please enter phone number.' : ''}
                        value={customer?.phoneNumber}
                        label="Phone number" variant="outlined"
                        className={classes.marginTop}
                        onChange={setCustomerData}
                        inputProps={{ "data-testid": "phoneNumber-input" }}
                    /></div>
            </form>
            <div className={classes.actionsContainer}>
                <div className={classes.formControl}>
                    <Button
                        disabled={true}
                        className={classes.button}
                        variant="contained"
                        size="large"
                    >
                        Back
                  </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                        size="large"
                    >
                        Next
                  </Button>
                </div>
            </div>
        </>
    )
}

export default CustomerInformation;