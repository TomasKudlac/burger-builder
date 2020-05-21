import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // Object.keys() returns an array of keys, [cheese, salad, meat...]
  let ingredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map( (_, index) => {
        return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
