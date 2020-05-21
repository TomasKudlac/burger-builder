import React from 'react';

import Auxiliary from '../../../hoc/Aux/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingreidentKey => {
      return (
        <li key={ingreidentKey}>
          <span style={{textTransform: 'capitalize'}}>{ingreidentKey}</span>:
          {props.ingredients[ingreidentKey]}
        </li> );
    });

  return (
    <Auxiliary>
      <h3>Your order</h3>
      <p>Delicious burger with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)} £</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Auxiliary>
  );
};

export default orderSummary;
