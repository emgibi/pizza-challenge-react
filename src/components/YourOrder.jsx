import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { useStoreContext } from '../StoreContext';
import { types } from '../CustomReducer';
import { useStyles } from '../useStyles';

function YourOrder() {
    const { state, dispatch } = useStoreContext();
    const { customer, paymentInformation, selectedPizzaItem, selectedToppingsItems, totalPrice } = state;
    const classes = useStyles();
    const numbers = paymentInformation.cardNumber.split('');
    const handleNext = () => {
        // place order
        let order = {
            customer: customer,
            pizza: selectedPizzaItem,
            toppings: selectedToppingsItems,
            totalPrice: totalPrice,
            paymentInformation: paymentInformation
        }
        console.log('Order: ', JSON.stringify(order, null, 2))

        dispatch({ type: types.setActiveStep, value: 4 });
    };
    const handleBack = () => {
        dispatch({ type: types.setActiveStep, value: 2 });
    };

    return (
        <>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Your Order
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell align="right">Selected Pizza</TableCell>
                            <TableCell align="left">
                                {selectedPizzaItem.map(({ id, label, price }) => (
                                    <p key={id}>{label} (${price})</p>
                                ))}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">Selected Toppings</TableCell>
                            <TableCell align="left">
                                {selectedToppingsItems.length === 0 ? 'None' :
                                    selectedToppingsItems.map(({ id, label, price }) => (
                                        <p key={id}>{label} (${price})</p>
                                    ))}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">Customer Information</TableCell>
                            <TableCell align="left">
                                <p>Name: {customer.name}</p>
                                <p>Address: {customer.houseNumber} {customer.streetName} {customer.streetName} {customer.postalCode}</p>
                                <p>Phone number: {customer.phoneNumber}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">Payment Information</TableCell>
                            <TableCell align="left">
                                <p>Card Number: {numbers.map((e, i) => (
                                    <span key={i}>{numbers.length - i <= 4 ? e : (parseInt(e) ? '*' : ' ')}</span>
                                ))}</p>
                                <p>Expiry Date: {paymentInformation.expiryDate}</p>
                                <p className="issuer">Card Type: {paymentInformation.issuer}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">Total Price</TableCell>
                            <TableCell align="left">${totalPrice}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
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
                        Place Order
                  </Button>
                </div>
            </div>
        </>
    )
}

export default YourOrder;