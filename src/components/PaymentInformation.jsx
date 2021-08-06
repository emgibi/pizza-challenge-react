import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import { useStoreContext } from '../StoreContext';
import { types } from '../CustomReducer';
import { useStyles } from '../useStyles';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpiryDate,
} from "../utils";

function PaymentInformation() {
    const { state, dispatch } = useStoreContext();
    const { customer, paymentInformation } = state;
    const { paymentInformation: paymentInformationFormError } = state.formError;
    const classes = useStyles();
    const [focus, setFocus] = React.useState('');
    const [isValid, setIsValid] = React.useState(null);
    const handleNext = () => {
        if (paymentInformation.cardNumber === "") {
            dispatch({ type: types.setFormErrorPaymentInformation, name: "cardNumber", value: true });
            return;
        }
        if (isValid === false) {
            return;
        }
        if (paymentInformation.expiryDate === "") {
            dispatch({ type: types.setFormErrorPaymentInformation, name: "expiryDate", value: true });
            return;
        } else {
            const todayDate = new Date();
            const expDate = new Date();
            const [month, year] = paymentInformation.expiryDate.split('/');

            expDate.setFullYear(20 + year, month, 1)
            if (month > 12 || typeof year === "undefined" || todayDate > expDate) {
                dispatch({ type: types.setFormErrorPaymentInformation, name: "expiryDate", value: true });
                return;
            } else {
                dispatch({ type: types.setFormErrorPaymentInformation, name: "expiryDate", value: false });
            }
        }
        if (paymentInformation.cvc === "") {
            dispatch({ type: types.setFormErrorPaymentInformation, name: "cvc", value: true });
            return;
        }
        dispatch({ type: types.setActiveStep, value: 3 });
    };
    const handleBack = () => {
        dispatch({ type: types.setActiveStep, value: 1 });
    };
    const setPaymentInformation = (field) => {
        dispatch({ type: types.setPaymentInformation, ...field })
    };
    const handleInputFocus = (e) => {
        setFocus(e.target.name)
    };
    const handleInputChange = (e) => {
        const { name } = e.target;
        let { value } = e.target;

        if (name === "cardNumber") {
            value = formatCreditCardNumber(value);
        } else if (name === "expiryDate") {
            value = formatExpiryDate(value);
        } else if (name === "cvc") {
            value = formatCVC(value);
        }
        setPaymentInformation({ name: name, value: value })
    };
    const handleCallback = ({ issuer }, isValid) => {
        setIsValid(isValid);
        if (isValid) {
            setPaymentInformation({ name: "issuer", value: issuer })
        } else {
            dispatch({ type: types.setFormErrorPaymentInformation, name: "cardNumber", value: true });
        }
    };

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <Cards
                    cvc={paymentInformation.cvc}
                    expiry={paymentInformation.expiryDate}
                    focused={focus}
                    name={customer.name}
                    number={paymentInformation.cardNumber}
                    callback={handleCallback}
                    className={classes.marginTop}
                />
                <div>
                    <TextField
                        required
                        error={paymentInformationFormError?.cardNumber === true}
                        helperText={paymentInformationFormError?.cardNumber === true ? 'Please enter a valid card number.' : ''}
                        id="cardNumber"
                        name="cardNumber"
                        label="Card Number"
                        value={paymentInformation.cardNumber}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        variant="outlined"
                        className={classes.marginTop}
                    /></div>
                <div>
                    <TextField
                        required
                        error={paymentInformationFormError?.expiryDate === true}
                        helperText={paymentInformationFormError?.expiryDate === true ? 'Please enter a valid expiry date.' : ''}
                        id="expiryDate"
                        name="expiryDate"
                        label="Expiry Date"
                        onChange={handleInputChange}
                        value={paymentInformation.expiryDate}
                        onFocus={handleInputFocus}
                        variant="outlined"
                        className={classes.marginTop}
                    /></div>
                <div>
                    <TextField
                        required
                        error={paymentInformationFormError?.cvc === true}
                        helperText={paymentInformationFormError?.cvc === true ? 'Please enter a valid CVC number.' : ''}
                        id="cvc"
                        name="cvc"
                        label="CVC"
                        value={paymentInformation.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        variant="outlined"
                        className={classes.marginTop}
                    />
                </div>
            </form>
            <div className={classes.actionsContainer}>
                <div className={classes.formControl}>
                    <Button
                        onClick={handleBack}
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

export default PaymentInformation;