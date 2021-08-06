export const initialState = {
    activeStep: 0,
    formError: {
        customer: {
            name: false,
            streetName: false,
            houseNumber: false,
            postalCode: false,
            city: false,
            phoneNumber: false,
        },
        pizzaSelection: {
            selectedPizzaOption: false
        },
        paymentInformation: {
            cardNumber: false,
            expiryDate: false,
            cvc: false,
        },
    },
    customer: {
        name: "",
        streetName: "",
        houseNumber: "",
        postalCode: "",
        city: "",
        phoneNumber: "",
    },
    selectedPizzaOption: "",
    selectedToppingsOption: [],
    selectedPizzaItem: [],
    selectedToppingsItems: [],
    paymentInformation: {
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        issuer: ""
    },
    totalPrice: 0
};
export const types = {
    setCustomerData: 'setCustomerData',
    setPizzaOption: 'setPizzaOption',
    setToppingsOption: 'setToppingsOption',
    setTotalPrice: 'setTotalPrice',
    setPaymentInformation: 'setPaymentInformation',
    setActiveStep: 'setActiveStep',
    setFormErrorCustomer: 'setFormErrorCustomer',
    setFormErrorPizzaSelection: 'setFormErrorPizzaSelection',
    setFormErrorPaymentInformation: 'setFormErrorPaymentInformation',
    reset: 'reset'
};
const calculatePrice = (pizzaOptions, toppingsOptions) => {
    let totalPrice = 0;

    pizzaOptions.forEach(element => {
        totalPrice += element.price;
    })
    toppingsOptions.forEach(element => {
        totalPrice += element.price;
    })

    return totalPrice;
};
export const reducer = (state, action) => {
    const {
        customer: customerFormError,
        pizzaSelection: pizzaSelectionFormError,
        paymentInformation: paymentInformationFormError
    } = state.formError;

    switch (action.type) {
        case types.setCustomerData:
            const { customer } = state;

            return {
                ...state,
                customer: {
                    ...customer,
                    [action.name]: action.value
                },
                formError: {
                    customer: {
                        ...customerFormError,
                        [action.name]: action.value === "" ? true : false
                    }
                }
            };
        case types.setPizzaOption:
            return {
                ...state,
                selectedPizzaItem: action.selectedPizzaItem,
                selectedPizzaOption: action.selectedPizzaOption,
                totalPrice: calculatePrice(action.selectedPizzaItem, state.selectedToppingsItems),
                formError: {
                    pizzaSelection: {
                        ...pizzaSelectionFormError,
                        selectedPizzaOption: false
                    }
                }
            };
        case types.setToppingsOption:
            return {
                ...state,
                selectedToppingsItems: action.selectedToppingsItems,
                selectedToppingsOption: action.selectedToppingsOption,
                totalPrice: calculatePrice(state.selectedPizzaItem, action.selectedToppingsItems)
            };
        case types.setTotalPrice:
            return {
                ...state,
                totalPrice: action.totalPrice
            };
        case types.setPaymentInformation:
            const { paymentInformation } = state;

            return {
                ...state,
                paymentInformation: {
                    ...paymentInformation,
                    [action.name]: action.value
                },
                formError: {
                    paymentInformation: {
                        ...paymentInformationFormError,
                        [action.name]: action.value === "" ? true : false
                    }
                }
            };
        case types.setActiveStep:
            return {
                ...state,
                activeStep: action.value
            };
        case types.setFormErrorCustomer:
            return {
                ...state,
                formError: {
                    customer: {
                        ...customerFormError,
                        [action.name]: action.value
                    }
                }
            };
        case types.setFormErrorPizzaSelection:
            return {
                ...state,
                formError: {
                    pizzaSelection: {
                        ...pizzaSelectionFormError,
                        [action.name]: action.value
                    }
                }
            };
        case types.setFormErrorPaymentInformation:
            return {
                ...state,
                formError: {
                    paymentInformation: {
                        ...paymentInformationFormError,
                        [action.name]: action.value
                    }
                }
            };
        case types.reset:
            return {
                ...initialState
            };
        default:
            throw new Error();
    }
};