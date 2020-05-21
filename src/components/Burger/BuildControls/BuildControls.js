import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' }
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>{props.currentPrice.toFixed(2)}</strong></p>
    {controls.map( el => (
      <BuildControl
        key={el.label}
        label={el.label}
        more={() => props.ingredientAdded(el.type)}
        less={() => props.ingredientRemoved(el.type)}
        disabled={props.disabled[el.type]} />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered} >
      PLACE ORDER
    </button>
  </div>
);

export default buildControls;
