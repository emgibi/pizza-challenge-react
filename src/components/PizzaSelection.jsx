import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import { useStoreContext } from '../StoreContext';
import { types } from '../CustomReducer';
import { useStyles } from '../useStyles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(value, selectedToppingsOption, theme) {
  return {
    fontWeight:
      selectedToppingsOption.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function PizzaSelection() {
  const { state, dispatch } = useStoreContext();
  const { selectedPizzaOption, selectedToppingsOption, totalPrice } = state;
  const { pizzaSelection: pizzaSelectionFormError } = state.formError;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const pizzaOptions = [
    { id: '1', label: 'Small', price: 15 },
    { id: '2', label: 'Medium', price: 20 },
    { id: '3', label: 'Large', price: 25 },
  ];
  const toppingsOptions = [
    { id: '1', label: 'Olives', price: 3 },
    { id: '2', label: 'Pepperoni', price: 4 },
    { id: '3', label: 'Mushrooms', price: 2 },
    { id: '4', label: 'Pepper', price: 2 },
  ];
  const handleNext = () => {
    if (selectedPizzaOption === "") {
      dispatch({ type: types.setFormErrorPizzaSelection, name: "selectedPizzaOption", value: true });
      return;
    }
    dispatch({ type: types.setActiveStep, value: 2 });
  };
  const handleBack = () => {
    dispatch({ type: types.setActiveStep, value: 0 });
  };
  const handleChangePizza = (event) => {
    const selectedPizzaItem = pizzaOptions.filter(option => option.id === event.target.value)

    dispatch({ type: types.setPizzaOption, selectedPizzaItem: selectedPizzaItem, selectedPizzaOption: event.target.value })
  };
  const handleChangeToppings = (event) => {
    let selectedToppingsItems = [];

    event.target.value.forEach(element => {
      const toppingSelected = toppingsOptions.find(option => option.label + ' (+$' + option.price + ')' === element)

      if (toppingSelected !== undefined) {
        selectedToppingsItems.push(toppingSelected)
      }
    })
    dispatch({ type: types.setToppingsOption, selectedToppingsItems: selectedToppingsItems, selectedToppingsOption: event.target.value })
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Typography className={classes.formControl}>Choose one of the 3 pizza sizes:</Typography>
      <FormControl variant="outlined" className={classes.formControl} error={pizzaSelectionFormError?.selectedPizzaOption === true}>
        <InputLabel id="select-pizza-label">Kind of pizza</InputLabel>
        <Select
          required
          label={'Kind of pizza'}
          labelId="select-pizza-label"
          id="pizzaSelection"
          value={selectedPizzaOption}
          onChange={handleChangePizza}
          name={'select-pizza'}
        >
          {pizzaOptions.map(({ id, label, price }) => (
            <MenuItem key={id} value={id}>
              {label} (${price})
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{pizzaSelectionFormError?.selectedPizzaOption === true ? 'Please select a pizza' : ''}</FormHelperText>
      </FormControl>
      <Typography className={classes.formControl}>Please choose any combination of the following toppings:</Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="select-toppings-label">Toppings</InputLabel>
        <Select
          labelId="select-toppings-label"
          id="toppingsSelection"
          multiple
          value={selectedToppingsOption}
          onChange={handleChangeToppings}
          input={<Input id="select-multiple-toppings" />}
          renderValue={(selectedToppings) => (
            <div className={classes.chips}>
              {selectedToppings.map((topping) => (
                <Chip key={topping} label={topping} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          {toppingsOptions.map(({ id, label, price }) => {
            const name = label + ' (+$' + price + ')';
            return (
              <MenuItem key={id} value={name}
                style={getStyles(name, selectedToppingsOption, theme)}>
                {name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Typography className={classes.formControl}>Total Price: ${totalPrice}</Typography>
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

export default PizzaSelection;