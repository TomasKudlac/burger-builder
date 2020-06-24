import React, { Component } from 'react';

import Auxiliary from '../../hoc/Aux/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    console.log(this.props);
    axios.get('https://burger-builder-607b6.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({error: true})
      })
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map( ingreidentKey => {
        return ingredients[ingreidentKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] = newCount;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
    this.updatePurchaseState(newIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount - 1;
    const newIngredients = {
      ...this.state.ingredients
    };
    newIngredients[type] = newCount;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: newIngredients });
    this.updatePurchaseState(newIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  //nothing right now...
  purchaseContinueHandler = () => {
    //alert('Continue!');
    // this.setState({loading: true});
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Tomas',
    //     address: {
    //       street: 'street',
    //       postCode: 'PostCode',
    //       country: 'UK'
    //     },
    //     email: 'Test'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasing: false });
    //   } )
    //   .catch(error => {
    //     this.setState({ loading: false, purchasing: false });
    //   } ); // for firebase to work, need to add .json
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
        currentPrice={this.state.totalPrice}
        ingredientAdded={this.addIngredientHandler}
        ingredientRemoved={this.removeIngredientHandler}
        disabled={disabledInfo}
        purchasable={this.state.purchasable}
        ordered={this.purchaseHandler} />
        </Auxiliary>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice} />;
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    };

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
